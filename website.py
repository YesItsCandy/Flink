from flask import Flask, render_template, jsonify, request, session
import json


app = Flask(__name__)

with open("secret.json") as secret:
    app.secret_key = json.load(secret)["appsecret"]


@app.route('/featured')
def featured():
    return jsonify([
        {"src": "https://via.placeholder.com/350x150", "name": "test1"},
        {"src": "https://via.placeholder.com/200x200", "name": "test2"},
        {"src": "https://via.placeholder.com/300x150", "name": "test3"},
        {"src": "https://via.placeholder.com/100x200", "name": "test4"},
        {"src": "https://via.placeholder.com/200x300", "name": "test5"},
        {"src": "https://via.placeholder.com/200x300", "name": "test6"},
        {"src": "https://via.placeholder.com/200x300", "name": "test7"}
    ])


@app.route('/login', methods=['POST'])
def login():
    if("user" in session):
        if(session["user"] is not None):
            return jsonify({
                "success": True,
                "user": session["user"]
            })
    if("username" in request.form and "password" in request.form):
        if(request.form["username"] == "azurediamond" and request.form["password"] == "hunter2"):
            user = {
                    "username": "azurediamond",
                    "email": "azurediamond@example.com",
                    "profilepic": "https://via.placeholder.com/200x200&text=ProfilePic",
                    "artist": True
                }
            session["user"] = user
            return jsonify({
                "success": True,
                "user": user
            })
    return jsonify({"success": False})


@app.route('/logout')
def logout():
    session["user"] = None
    return jsonify({"logout":True})

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=3001)
