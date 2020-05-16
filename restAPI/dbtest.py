import pymongo,urllib
from flask import Flask,request
from flask_restful import Resource,Api
from flask_cors import CORS
from flask import jsonify

app = Flask(__name__)
api = Api(app)
CORS(app)
MongoUri="mongodb+srv://RahulJoshi:"+urllib.parse.quote("Rj@246266")+"@cluster0-kpenv.mongodb.net/test?retryWrites=true&w=majority"
myclient=pymongo.MongoClient(MongoUri)

mydb = myclient["Inventory-Management"]
prod = mydb["products"]
cat = mydb["categories"]
acc=mydb['accounts']

class TopProducts(Resource):
    def get(self):
        products=list(prod.find().sort("price",-1).limit(5))
        for p in products:
            p["_id"]=str(p["_id"])
        if products:
            return products,200
        else:
            return {'message':'No data'},404

class AllProducts(Resource):
    def get(self):
        products=list(prod.find())
        for p in products:
            p["_id"]=str(p["_id"])
        if products:
            return products,200
        else:
            return {'message':'No data'},404

class AllCategories(Resource):
    def get(self):
        categories=list(cat.find())
        for c in categories:
            c["_id"]=str(c["_id"])
        if categories:
            return categories,200
        else:
            return {'message':'No data'},404

class editProduct(Resource):
    def post(self):
        data=request.get_json()
        status=prod.update({'id':data['id']},{"$set":{"name":data['name'],"price":int(data['price']),"units":data['units']}})
        if status['nModified']>=0:
            return {'msg':'updated successfully'},200
        else:
            return {'message':'No data'},404 

class deleteProduct(Resource):
    def post(self):
        id=request.get_json()
        id=id['id']
        for i in id:
            status=prod.delete_one({'id':i}).deleted_count
        if status>0:
            return {'msg':'deleted successfully'}
        else:
            return {'msg':'error'}

class addProduct(Resource):
    def post(self):
        data=request.get_json()
        temp=list(prod.find().sort('_id',-1).limit(1))
        for t in temp:
            temp=t['id']
        temp=int(temp)+1
        data['id']=str(temp)
        Str=data['category'].split(': ')
        data['category']=Str[1]
        status=prod.insert_one(data).acknowledged
        if status:
            return {'msg':'data added'}
        else:
            return{'msg':'error occured'}

class addCategory(Resource):
    def post(self):
        data=request.get_json()        
        temp=list(cat.find().sort('_id',-1).limit(1))
        for t in temp:
            temp=t['id']
        temp=int(temp)+1
        data['id']=str(temp)
        status=cat.insert_one(data)
        if status:
            return {'msg':'data added'}
        else:
            return{'msg':'error occured'}  

class Accounts(Resource):
    def get(self):
        accounts=list(acc.find({},{'_id':0,'email':0,'password':0}))
        if accounts:
            return accounts,200
        else:
            return {'message':'No data'},404

class addAccount(Resource):
    def post(self):
        status=acc.insert_one(request.get_json())
        print('hello')
        if status.acknowledged:
            return {'msg':'added successfully'}
        else :
            return {'msg':'error'}

class deleteAccounts(Resource):
    def post(self):
        id=request.get_json()
        id=id['username']
        for i in id:
            status=acc.delete_one({'username':i}).deleted_count
        if status>0:
            return {'msg':'deleted successfully'}
        else:
            return {'msg':'error'}

class Login(Resource):
    def post(self):
        data=request.get_json()
        D=acc.find({'username':data['username']})
        for d in D:
            if d['password']==data['password']:
                return {'msg':'true'}
        return {'msg':'false'}

class ExportCSV(Resource):
    def get(self):
        data=list(prod.find({},{'_id':0}))
        return data,200

api.add_resource(TopProducts,'/top-products')
api.add_resource(AllProducts,'/all-products')
api.add_resource(AllCategories,'/categories')
api.add_resource(editProduct,'/editProduct')
api.add_resource(deleteProduct,'/deleteProduct')
api.add_resource(addProduct,'/add-product')
api.add_resource(addCategory,'/add-category')
api.add_resource(Accounts,'/accounts')
api.add_resource(addAccount,'/add-account')
api.add_resource(deleteAccounts,'/deleteAccounts')
api.add_resource(Login,'/login')
api.add_resource(ExportCSV,'/exportCSV')

app.run(debug=True)