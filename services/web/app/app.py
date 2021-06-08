from flask import Flask, jsonify
from flask_cors import CORS
from flask_restful import Api
from database.db import initialize_db
from resources.routes import initialize_routes
from resources.errors import errors


app = Flask(__name__)
CORS(app)
api = Api(app, errors=errors)

# cors
'''
api_cors_config = {
    "origins": ["http://localhost:3000"],
    "methods": ["OPTIONS", "GET", "POST"]
}
CORS(app, resources={
    #r"/holidays": api_cors_config,
    #r"/holidays/<id>": api_cors_config,
    r"/api/calculate": api_cors_config,
})
'''

app.config['MONGODB_SETTINGS'] = {
    'host': 'mongodb://root:admin@mongo:27017/whdb?authSource=admin'
}

initialize_db(app)
initialize_routes(api)

# Custom errors doesn't work when debug=True is setting
if __name__ == '__main__':
    #app.run(host='0.0.0.0', port=8080, debug=True)
    app.run(host='0.0.0.0', port=8080, debug=False)
