from flask import Flask, render_template, jsonify, request, session
import json
import db
import hashlib


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
    if "user" in session :
        if session["user"] is not None:
            return jsonify({
                "success": True,
                "user": session["user"]
            })
    if "username" in request.form and "password" in request.form:
        user = db.get_user(request.form["username"])
        if(user is not None):
            if user["password_hash"] == hashlib.sha512(request.form["password"].encode('utf-8') + user["salt"].encode('utf-8')).hexdigest():
                session["user"] = backenduser_to_unsafe_frontenduser(user)
                return jsonify({"success": True, "user": session["user"]})
    return jsonify({"success": False, "user": None})


@app.route('/register', methods=['POST'])
def register():
    if "username" in request.form and "email" in request.form and "password" in request.form:
        error = db.create_user(
            request.form["username"],
            request.form["password"],
            request.form["email"]
        )
        if error is not None:
            return jsonify({"status": "error", "error": error})
    return jsonify({"status": "created"})


@app.route('/user/<username>', methods=['GET'])
def get_user(username):
    user = db.get_user(username)
    if user is not None:
        return jsonify(backenduser_to_safe_frontenduser(user))
    return jsonify(None)


@app.route('/user', methods=['GET'])
def get_logginin_user():
    if "user" in session:
        user = db.get_user(session["user"]["username"])
        if user is not None:
            session["user"] = backenduser_to_unsafe_frontenduser(user)
            return jsonify(session["user"])
    return jsonify(None)

@app.route('/user', methods=['POST'])
def update_user():
    if "user" in session:
        db.update_user(session["user"]["username"], request.form)
        return jsonify({"status":"updated"})
    return jsonify({"status": "error", "error" : "not logged in"})


@app.route('/logout')
def logout():
    session["user"]=None
    return jsonify({"logout": True})


def backenduser_to_safe_frontenduser(user):
    return {
                "username": user["username"],
                "isartist": user["isartist"],
                "profilepic": user["profilepic"],
                "socialmedia":{
                    "twitter": user["twitter"] if user["twitter_public"] else None,
                    "discord": user["discord"] if user["discord_public"] else None,
                    "telegram": user["telegram"] if user["telegram_public"] else None,
                    "furaffinity": user["furaffinity"] if user["furaffinity_public"] else None,
                    "skype": user["skype"] if user["skype_public"] else None
                }
            }


def backenduser_to_unsafe_frontenduser(user):
    return {
                "username": user["username"],
                "isartist": user["isartist"],
                "profilepic": user["profilepic"],
                "email": user["email"],
                "socialmedia":{
                    "twitter": user["twitter"],
                    "discord": user["discord"],
                    "telegram": user["telegram"],
                    "furaffinity": user["furaffinity"],
                    "skype": user["skype"],
                    "twitter_public":user["twitter_public"],
                    "discord_public":user["discord_public"],
                    "telegram_public":user["telegram_public"],
                    "furaffinity_public":user["furaffinity_public"],
                    "skype_public":user["skype_public"]
                }
            }

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=3001)
