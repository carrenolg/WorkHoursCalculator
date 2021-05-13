class WorkHour:
    def __init__(self, date, start_time, end_time):
        self.date = date
        self.start_time = start_time
        self.end_time = end_time

    def __repr__(self):
        return str({
            'date': str(self.date),
            'start_time': str(self.start_time),
            'end_time': str(self.end_time)
        })

    # methods __eq__ and __hash__ are needed to matching
    def __eq__(self, other):
        if self.date == other.date and \
            self.start_time == other.start_time and \
            self.end_time == other.end_time:
            return True
        else:
            return False

    def __hash__(self):
        return hash(tuple([self.date, self.start_time, self.end_time]))
