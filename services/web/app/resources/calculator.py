from flask_restful import Resource, request
from flask import Response
from collections import namedtuple
from models.WorkDay import WorkDay


DTINPUT = namedtuple('DTINPUT', ['year', 'month', 'day', 'hour', 'minute'])


class CalculatorApi(Resource):
    def post(self):
        body = request.get_json()
        hours = {**body}
        start_dt = DTINPUT(2021, 12, 24, 16, 0)
        end_dt = DTINPUT(2021, 12, 25, 16, 0)
        wd = WorkDay(2021, 1, 5, start_dt, end_dt)
        d = wd.segmeted_hours
        # ord
        print("d['ord']['day']:", len(d["ord"]["day"]))
        print("d['ord']['night']:", len(d["ord"]["night"]))
        print("d['ord']['day-holyday']:", len(d["ord"]["day-holyday"]))
        print("d['ord']['day-holyday']:", len(d["ord"]["night-holyday"]))
        # extra
        print("d['ext']['day']:", len(d["ext"]["day"]))
        print("d['ext']['night']:", len(d["ext"]["night"]))
        print("d['ext']['day-holyday']:", len(d["ext"]["day-holyday"]))
        print("d['ext']['day-holyday']:", len(d["ext"]["night-holyday"]))
        return Response(hours, mimetype="application/json", status=200)
