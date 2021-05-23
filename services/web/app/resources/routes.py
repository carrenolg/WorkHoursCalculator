from resources.holiday import HolidayList, HolidayApi
from resources.calculator import CalculatorApi


def initialize_routes(api):
    api.add_resource(HolidayList, '/holidays')
    api.add_resource(HolidayApi, '/holidays/<id>')
    api.add_resource(CalculatorApi, '/api/calculate')