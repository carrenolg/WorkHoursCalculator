from flask_restful import Resource, request
from flask import Response
from database.model import Holiday
from mongoengine.errors import DoesNotExist
from resources.errors import HolidayNotExistsError, InternalServerError


class HolidayList(Resource):
    def get(self):
        holidays = Holiday.objects().to_json()
        return Response(holidays, mimetype="application/json", status=200)
    
    def post(self):
        body = request.get_json()
        holiday = Holiday(**body)
        holiday.save()
        id = holiday.id
        return {'id': str(id)}, 200

class HolidayApi(Resource):
    def delete(self, id):
        try:
            holiday = Holiday.objects.get(id=id)
            holiday.delete()
            return 'Deleted', 200
        except DoesNotExist:
            raise HolidayNotExistsError
        except Exception:
            raise InternalServerError
