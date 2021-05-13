from typing import NamedTuple
from models.WorkHour import WorkHour
from models.WorkDay import WorkDay
from datetime import datetime, timedelta, time, timezone
from collections import namedtuple 

def main():
    print("main func")
    
    # start_dt = datetime(2021, 5, 13, 12, 0)
    # end_dt = datetime(2021, 5, 13, 23, 0)

    DTINPUT = namedtuple('DTINPUT',['year','month','day', 'hour', 'minute'])

    start_dt = DTINPUT(2021, 5, 13, 8, 0)
    end_dt = DTINPUT(2021, 5, 13, 18, 0)

    wd = WorkDay(2021, 1, 5, start_dt, end_dt)

    print(wd.segmeted_hours)

    print("ord-day", len(wd.segmeted_hours["ord"]["day"]))
    print("ord-night", len(wd.segmeted_hours["ord"]["night"]))
    print("ord-dayholiday", len(wd.segmeted_hours["ord"]["dayholiday"]))
    print("ord-nightholiday", len(wd.segmeted_hours["ord"]["nightholiday"]))

    print("ext-day", len(wd.segmeted_hours["ext"]["day"]))
    print("ext-night", len(wd.segmeted_hours["ext"]["night"]))
    print("ext-dayholiday", len(wd.segmeted_hours["ext"]["dayholiday"]))
    print("ext-nightholiday", len(wd.segmeted_hours["ext"]["nightholiday"]))

if __name__ == '__main__':
    main()
