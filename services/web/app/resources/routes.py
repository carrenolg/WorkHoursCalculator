from resources.holiday import HolidayList, HolidayApi
from resources.calculator import CalculatorApi


def initialize_routes(api):
    api.add_resource(HolidayList, '/api/holidays')
    api.add_resource(HolidayApi, '/api/holidays/<id>')
    api.add_resource(CalculatorApi, '/api/calculate')