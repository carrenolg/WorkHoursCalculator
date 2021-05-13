from models.WorkHour import WorkHour
from datetime import datetime, timedelta, time, timezone


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

    def __create_hours_of_day(self):
        ds = self.start_dt
        de = self.end_dt

        # create 24 hrs (1 day)
        if ds.date() == de.date():
            for hour in range(0, 24):
                start = datetime(
                    ds.year,
                    ds.month,
                    ds.day,
                    hour=hour,
                    minute=0
                )
                end = start + timedelta(minutes=59)
                self.__day_hours.append(WorkHour(ds.date(), start, end))

            # create daytime and nigth hours
            for item in self.__day_hours[6:21]:
                self.__daytime_hours.append(item)
            hours = self.__day_hours[0:6] + self.__day_hours[21:24]
            for item in hours:
                self.__night_hours.append(item)

        # create 48 hrs (2 days)
        else:
            for hour in range(0, 24):
                start = datetime(
                    ds.year,
                    ds.month,
                    ds.day,
                    hour=hour,
                    minute=0
                )
                end = start + timedelta(minutes=59)
                self.__day_hours.append(WorkHour(ds.date(), start, end))

            # create daytime and nigth hours
            for item in self.__day_hours[6:21]:
                self.__daytime_hours.append(item)
            hours = self.__day_hours[0:6] + self.__day_hours[21:24]
            for item in hours:
                self.__night_hours.append(item)

            for hour in range(0, 24):
                start = datetime(
                    de.year,
                    de.month,
                    de.day,
                    hour=hour,
                    minute=0
                )
                end = start + timedelta(minutes=59)
                self.__day_hours.append(WorkHour(de.date(), start, end))

            # create daytime and nigth hours
            for item in self.__day_hours[6:21]:
                self.__daytime_hours.append(item)
            hours = self.__day_hours[0:6] + self.__day_hours[21:24]
            for item in hours:
                self.__night_hours.append(item)

    def __create_hours(self):
        ds = self.start_dt
        de = self.end_dt

        while (ds < de):
            start = ds
            end = start + timedelta(minutes=59)
            self.__hours.append(WorkHour(start.date(), start, end))
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
                "ord": {"day": [], "night": [], "dayholiday": [], "nightholiday": []},
                "ext": {"day": [], "night": [], "dayholiday": [], "nightholiday": []}
            }
        )

        holiday = True

        if holiday:
            seg["ord"]["dayholiday"] = list(ordinary.intersection(daytime_hours))
            seg["ord"]["nightholiday"] = list(ordinary.intersection(night_hours))
            seg["ext"]["dayholiday"] = list(extra.intersection(daytime_hours))
            seg["ext"]["nightholiday"] = list(extra.intersection(night_hours))
        else:
            seg["ord"]["day"] = list(ordinary.intersection(daytime_hours))
            seg["ord"]["night"] = list(ordinary.intersection(night_hours))
            seg["ext"]["day"] = list(extra.intersection(daytime_hours))
            seg["ext"]["night"] = list(extra.intersection(night_hours))

        self.__segmented_hours = seg
