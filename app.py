
from flask import Flask

import pymongo

from bson.json_util import dumps

from bson.objectid import ObjectId

from flask import jsonify, request

from flask_cors import CORS



#############################  Making schema and connecting with DB   ###############################################


app = Flask(__name__)

CORS(app)


client = pymongo.MongoClient('mongodb://localhost:27017')

mydb = client["NewTodosApp"]

myCol = mydb["todoss"]

# myCol.insert_one(data)



################# Mkaing routes #####################

# POST REQUEST
@app.route('/add', methods = ['POST'])
def app_user():

    _json = request.json
    _todos = _json['todos']

    if _todos and request.method == 'POST':

        id = myCol.insert_one({
            'todos':_todos
        })

        resp = jsonify("successfully created broooo")

        return resp


# GET REQUEST
@app.route('/users')
def users():
    users = myCol.find()
    resp = dumps(users)
    return resp



# DELETE REQUEST
@app.route('/delete/<id>', methods=['DELETE'])

def delete_usr(id):

    myCol.delete_one({'_id': ObjectId(id)})
    resp = jsonify("user deleted successfully")

    return resp



# UPDATE REQUEST
@app.route('/update/<id>', methods = ['PUT'])
def update_user(id):

    _id = id
    _json = request.json
    _todos = _json['todos']

    if _todos and _id and request.method == 'PUT':
        
        myCol.update_one({'_id': ObjectId(id)}, {'$set':{'todos':_todos}})
        # myCol.update_one({'_id': ObjectId(_id['$olid'])}, {'$set':{'todos':_todos}})

        resp = jsonify("user updated successfully")

        return resp



######################  listening to port  ####################################


if __name__ == "__main__":
    # app.run(debug = True, port = 3000)
    app.run(debug = True)