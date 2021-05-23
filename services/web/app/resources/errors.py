class HolidayNotExistsError(Exception):
    pass

class InternalServerError(Exception):
    pass

errors = {
    "HolidayNotExistsError": {
        "message": "Holiday with given id doesn't exists",
        "status": 400
    },
    "InternalServerError": {
        "message": "Something went wrong",
        "status": 500
    }
}
