from models.WorkHour import WorkHour
from datetime import date, datetime, timedelta, time, timezone
from database.model import Holiday


class WorkDay:
    def __init__(self, year, month, day, start_dt, end_dt):
        self.year = year
        self.month = month
        self.day = day
        self.start_dt = datetime(
            year=start_dt.year,
            month=start_dt.month,
            day=start_dt.day,
            hour=start_dt.hour,
            minute=start_dt.minute
        )
        self.end_dt = datetime(
            year=end_dt.year,
            month=end_dt.month,
            day=end_dt.day,
            hour=end_dt.hour,
            minute=end_dt.minute
        )
        self.__day_hours = list()  # 24 or 48
        self.__daytime_hours = list()
        self.__night_hours = list()
        self.__create_hours_of_day()
        self.__hours = list()  # worked hours
        self.__create_hours()
        self.__segmented_hours = dict()
        self.__segmentation()

    # property
    @property
    def total_hours(self):
        return len(self.__hours)

    @property
    def segmeted_hours(self):
        return self.__segmented_hours

    # @hours.setter
    # def hours(self, value):
        # date = datetime.now().date()
        # dt_start = datetime.now()
        #dt_end = datetime.now()
        # wh = WorkHour(date, dt_start, dt_end)
        # wh2 = WorkHour(date, dt_start, dt_end)
        # self._hours = tuple([wh, wh2])
        # self._hours = value

    def __check_holiday(self, d):
        holidays = list()
        data = Holiday.objects()  # get data from db
        for item in data:
            holidays.append(
                date(year=item.year, month=item.month, day=item.day)
            )
        return d in holidays

    def __create_hours_of_day(self):
        ds = self.start_dt
        de = self.end_dt

        # create 24 hrs (1 day)
        if ds.date() == de.date():
            holiday = self.__check_holiday(ds.date())
            for hour in range(0, 24):
                start = datetime(
                    ds.year,
                    ds.month,
                    ds.day,
                    hour=hour,
                    minute=0
                )
                end = start + timedelta(minutes=59)
                self.__day_hours.append(
                    WorkHour(ds.date(), start, end, holiday)
                )

            for wh in self.__day_hours:
                hour = wh.start_time.hour
                if 0 <= hour <= 5 or 21 <= hour <= 23:
                    self.__night_hours.append(wh)
                else:
                    self.__daytime_hours.append(wh)

        # create 48 hrs (2 days)
        else:
            # day 1
            holiday = self.__check_holiday(ds.date())
            for hour in range(0, 24):
                start = datetime(
                    ds.year,
                    ds.month,
                    ds.day,
                    hour=hour,
                    minute=0
                )
                end = start + timedelta(minutes=59)
                self.__day_hours.append(
                    WorkHour(ds.date(), start, end, holiday)
                )

            # day 2
            holiday = self.__check_holiday(de.date())
            for hour in range(0, 24):
                start = datetime(
                    de.year,
                    de.month,
                    de.day,
                    hour=hour,
                    minute=0
                )
                end = start + timedelta(minutes=59)
                self.__day_hours.append(
                    WorkHour(de.date(), start, end, holiday)
                )

            for wh in self.__day_hours:
                hour = wh.start_time.hour
                if 0 <= hour <= 5 or 21 <= hour <= 23:
                    self.__night_hours.append(wh)
                else:
                    self.__daytime_hours.append(wh)

    def __create_hours(self):
        ds = self.start_dt
        de = self.end_dt

        while (ds < de):
            start = ds
            end = start + timedelta(minutes=59)
            holiday = self.__check_holiday(start.date())
            self.__hours.append(WorkHour(start.date(), start, end, holiday))
            ds = ds + timedelta(hours=1)

    def __segmentation(self):
        # ordinary hours
        ordinary = set(self.__hours[0:8])
        # extras hours
        extra = set(self.__hours[8:])

        # matching againt these
        daytime_hours = set(self.__daytime_hours)
        night_hours = set(self.__night_hours)

        seg = dict(
            {
                "ord": {"day": [], "night": [], "day-holyday": [], "night-holyday": []},
                "ext": {"day": [], "night": [], "day-holyday": [], "night-holyday": []}
            }
        )

        # ordinary
        ord_day = list(ordinary.intersection(daytime_hours))
        ord_night = list(ordinary.intersection(night_hours))
        # extra
        ext_day = list(extra.intersection(daytime_hours))
        ext_night = list(extra.intersection(night_hours))

        # ordinary
        seg["ord"]["day"] = [wh for wh in ord_day if not wh.is_holiday]
        seg["ord"]["night"] = [wh for wh in ord_night if not wh.is_holiday]
        seg["ord"]["day-holyday"] = [wh for wh in ord_day if wh.is_holiday]
        seg["ord"]["night-holyday"] = [wh for wh in ord_night if wh.is_holiday]

        # extra
        seg["ext"]["day"] = [wh for wh in ext_day if not wh.is_holiday]
        seg["ext"]["night"] = [wh for wh in ext_night if not wh.is_holiday]
        seg["ext"]["day-holyday"] = [wh for wh in ext_day if wh.is_holiday]
        seg["ext"]["night-holyday"] = [wh for wh in ext_night if wh.is_holiday]

        self.__segmented_hours = seg
