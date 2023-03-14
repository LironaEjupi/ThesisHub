import os
import json
import strgen
import hashlib
import datetime
import mysql.connector

from flask import Flask, request
from flask import send_from_directory
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

class MainDatabase:
    def __init__(self):
        self.conn = mysql.connector.connect(
            host = os.environ['MYSQL_HOST'],
            user = os.environ['MYSQL_USER'],
            password = os.environ['MYSQL_PASSWORD'],
            database = os.environ['MYSQL_DATABASE'],
            autocommit = True
        )

app = Flask(__name__)
app.secret_key = os.environ['SECRET_KEY']
jwt = JWTManager(app)
  
@app.route("/login", methods=["POST"])
def login():
    params = request.get_json()
    response = {}   
    response['logged_in'] = False
    if request.method == 'POST' and 'email' in params and 'password' in params:
        email = params['email']
        password = params['password']
        hashed_pwd = hashlib.sha1(password.encode())

        select_stmt = ("SELECT * FROM users WHERE email = %s AND password = %s")
        data = (email, hashed_pwd.hexdigest())
        db = MainDatabase()
        cursor = db.conn.cursor(dictionary=True)
        cursor.execute(select_stmt, data)
        account = cursor.fetchone()

        if account:
            delta = datetime.timedelta(hours=12) # token expires in 12 hours

            response['msg'] = "Logged in successfully!"
            response['logged_in'] = True
            response['access_token'] = create_access_token(identity={
                "id": account['id'],
                "role" : account['role'],
                "email" : account['email']
            }, expires_delta=delta)
            response['role'] = account['role']
        else:
            response['msg'] = 'Ky përdorues nuk ekziston!'
    else:      
        response['msg'] = "Incorrect request!"

    return response

@app.route("/register", methods=["POST"])
def register_user():
    params = request.get_json()
    name = params['name']
    surname = params['surname']
    password = params['password']
    email = params['email']
    role = params['role']
    company = params['company']
    hashed_pwd = hashlib.sha1(password.encode())
    db = MainDatabase()
    cursor = db.conn.cursor(dictionary=True) 

    select_stmt = ("SELECT * FROM users WHERE email = %s AND password = %s")
    data = (email, hashed_pwd.hexdigest())
    cursor.execute(select_stmt, data)
    account = cursor.fetchone()

    if name == "" or surname == "" or email == "" or password == "" or role == "":
        return {"error" : "Të dhëna të pasakta!"}
    elif account: 
        return {"message" : "Ky përdorues ekziston tashmë!"}
    else:
        insert_stmt = (
        "INSERT INTO users (name, surname, email, password, role, company)"
        "VALUES (%s, %s, %s, %s, %s, %s)"
        )
        data = (name, surname, email, hashed_pwd.hexdigest(), role, company)
        cursor.execute(insert_stmt, data)
        return {"success": "U regjistruat me sukses!"}

@app.route("/reset", methods=["POST"])
def reset_password():
    params = request.get_json()
    email = params['email']
    password = params['password']
    hash_pwd = hashlib.sha1(password.encode())
    db = MainDatabase()
    cursor = db.conn.cursor(dictionary=True)
        
    select_stmt = ("SELECT * FROM users WHERE email = %s")
    data = (email, )
    cursor.execute(select_stmt, data)
    account = cursor.fetchone()
    if account:
        update_stmt = ("UPDATE users SET password = %s WHERE id = %s")
        data = (hash_pwd.hexdigest(), account['id'])
        cursor.execute(update_stmt, data)
        return {"success": "Fjalekalimi u nderrua me sukses!"}
    else: 
        print("Nothing changed!")
        return{"error" : "Nuk ekziston nje llogari me kete email!"}

#Update profile route
@app.route("/update_profile", methods=["POST"])
@jwt_required()
def user_profile():
    user = get_jwt_identity()
    id = user['id']
    db = MainDatabase()
    cursor = db.conn.cursor(dictionary=True)
    response = {}
    pdf_file = request.files.get('pdf_file')
    image = request.files.get('image')
    params = request.form.get('json_data')
    params = json.loads(params)
    
    select_stmt = "SELECT resume, image FROM users WHERE id = %s"
    user_id = (id, )
    cursor.execute(select_stmt, user_id)
    data = cursor.fetchone()
    print("Data returned: " ,data["resume"])
    filename = data['image']

    if pdf_file:
        resume = strgen.StringGenerator("[\w\d]{10}.pdf").render()
        pdf_file.save('storage/files/' + resume)
    else:
        resume = data['resume']

    if image:
        filename = strgen.StringGenerator("[\w\d]{10}.jpg").render()  
        image.save('storage/images/' + filename)
    else:
        if filename == '':
            filename = "anonymous.jpg"
        else:
            filename = data['image']

    if params:         
        name = params['name']
        surname = params['surname']
        birthdate = params['birthdate']
        phone = params['phone']
        address = params['address']
        category = params['category']
        title = params['title']
        availability = params['availability']

        update_stmt = ("UPDATE users SET name = %s, surname = %s, birthdate = %s,  phone = %s, address = %s, category = %s, resume = %s, image = %s, title = %s, availability = %s WHERE id = %s")
        update_data = (name, surname, birthdate, phone, address, category, resume, filename ,title, availability, id)

        cursor.execute(update_stmt, update_data)

    response['message'] = "Updated successfully!"

    return response

@app.route("/profile", methods = ["GET"])
@jwt_required()
def profile():
    user = get_jwt_identity()
    id = user['id']
    response = {}
    db = MainDatabase()
    cursor = db.conn.cursor(dictionary=True)
    
    select_stmt = ("SELECT name, surname, email, role, address, category, phone, image, company, birthdate, title, resume, availability FROM users WHERE id = %s")
    cursor.execute(select_stmt, (id,))
    user_data = cursor.fetchone()
    response['data'] = user_data
    response['message'] = f"User data returned successfully."

    return response
    
#Delete user
@app.route("/delete_user", methods=["GET"])
@jwt_required()
def delete_profile():
    user = get_jwt_identity()
    response = {}
    id = user['id']
    db = MainDatabase()
    cursor = db.conn.cursor(dictionary=True)

    select_stmt = ("SELECT * FROM users WHERE id = %s")
    data = (id, )
    cursor.execute(select_stmt, data)
    account = cursor.fetchone()

    if account: 
        delete_stmt = ("DELETE FROM users WHERE id = %s")
        data = (id, )
        cursor.execute(delete_stmt, data)
        account = cursor.fetchone()
        response['message'] = "Deleted user with ID: ", id
    else: 
        response['message'] = "Nuk ekziston useri i tille" 
    return response

@app.route("/set_location", methods=["POST"])
@jwt_required()
def set_location():
    user = get_jwt_identity()
    params = request.get_json()
    print("Latitude", params['lat'])
    print("Longitude", params['lng'])

    response = {}
    lat = params['lat']
    lng = params['lng']
    id = user['id']
    db = MainDatabase()
    cursor = db.conn.cursor(dictionary=True)
   
    update_stmt = ("UPDATE users SET latitude = %s, longitude = %s WHERE id = %s")
    update_data = (lat, lng, id)
    cursor.execute(update_stmt, update_data)

    response['message'] = "Located successfully!"
    response['latitude'] = params['lat']
    response['longitude'] = params['lng']

    return response
   
@app.route("/user_locations", methods = ["GET"])
@jwt_required()
def user_locations():
    response = {}
    db = MainDatabase()
    cursor = db.conn.cursor(dictionary=True)
    
    select_stmt = ("SELECT id, latitude, longitude, image, name, surname, category, address, title FROM users WHERE role = 'Jobseeker'")
    cursor.execute(select_stmt)
    user_data = cursor.fetchall()
    data = []
    
    for user in user_data:
        if user['latitude'] != None and user['longitude'] != None:
            data.append({'id': user['id'],'image': user['image'],'name': user['name'],'surname': user['surname'],'category': user['category'],'address': user['address'], 'title': user['title'], 'latitude': user['latitude'], 'longitude': user['longitude']})
    
    response['data'] = data
    response['message'] = f"User data returned successfully."

    return response

@app.route("/companies", methods = ["GET"])
@jwt_required()
def companies():
    user = get_jwt_identity()
    id = user['id']
    response = {}
    db = MainDatabase()
    cursor = db.conn.cursor(dictionary=True)
    
    select_stmt = ("SELECT company, id FROM users WHERE company IS NOT NULL")
    cursor.execute(select_stmt)
    user_data = cursor.fetchall()
    response['data'] = user_data        
    response['message'] = f"User data returned successfully."

    return response
    
@app.route("/users", methods = ["GET"])
@jwt_required()
def users():
    response = {}
    db = MainDatabase()
    cursor = db.conn.cursor(dictionary=True)
    select_stmt = ("SELECT * FROM users WHERE role = 'Jobseeker'")
    cursor.execute(select_stmt)
    user_data = cursor.fetchall()
    response['data'] = user_data
    response['message'] = f"User data returned successfully."

    return response

@app.route("/services", methods = ["GET"])
@jwt_required()
def services():
    response = {}
    services = []
    db = MainDatabase()
    cursor = db.conn.cursor(dictionary=True)
    
    select_stmt = ("SELECT * FROM services")
    cursor.execute(select_stmt)
    acc = cursor.fetchall()

    for d in acc:
        services.append(d)
    
    response['data'] = services
    response['message'] = f"{len(acc)} services returned."

    return response
    
@app.route('/storage/images/<path:filename>')
def serve_image(filename):
    return send_from_directory('storage/images', filename)  # return the image

@app.route('/storage/files/<path:filename>')
def serve_pdf(filename):
    return send_from_directory('storage/files', filename)

if __name__ == "__main__":
    # print(os.environ['SECRET_KEY'])
    app.run(host="0.0.0.0", port = "5000", debug=True)
