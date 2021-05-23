class WorkHour:
    def __init__(self, date, start_time, end_time, isHoliday):
        self.date = date
        self.start_time = start_time
        self.end_time = end_time
        self.is_holiday = isHoliday

    def __repr__(self):
        return str({
            'date': str(self.date),
            'start_time': str(self.start_time),
            'end_time': str(self.end_time),
            'is_holiday': str(self.is_holiday)
        })

    # methods __eq__ and __hash__ are needed to matching
    def __eq__(self, other):
        if self.date == other.date and \
            self.start_time == other.start_time and \
            self.end_time == other.end_time and \
            self.is_holiday == other.is_holiday:
            return True
        else:
            return False

    def __hash__(self):
        return hash(tuple([self.date, self.start_time, self.end_time, self.is_holiday]))
