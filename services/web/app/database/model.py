from database.db import db


class Holiday(db.Document):
    year = db.IntField(required=True)
    month = db.IntField(required=True)
    day = db.IntField(required=True)
    des = db.StringField(required=False)