from flask_restful import Resource, request
from collections import namedtuple
from models.WorkDay import WorkDay


DTINPUT = namedtuple('DTINPUT', ['year', 'month', 'day', 'hour', 'minute'])


class CalculatorApi(Resource):
    def get(self):
        data = {"route": "/api/calculate"}
        return data, 200

    def post(self):
        # data: [{id, start, end, total}]
        data = request.get_json()
        result = []
        for item in data:
            start_dt = DTINPUT(
                year=item['start']['year'],
                month=item['start']['month'],
                day=item['start']['date'],
                hour=item['start']['hour'],
                minute=0
            )
            end_dt = DTINPUT(
                year=item['end']['year'],
                month=item['end']['month'],
                day=item['end']['date'],
                hour=item['end']['hour'],
                minute=0
            )
            wd = WorkDay(
                item['start']['year'],
                item['start']['month'],
                item['start']['date'],
                start_dt,
                end_dt
            )
            result.append({
                "id": item["id"],
                "ord": wd.segmeted_hours_amount["ord"],
                "ext": wd.segmeted_hours_amount["ext"],
                "total": wd.total_hours
            })
        # return Response(result, mimetype="application/json", status=200)
        return result, 200
