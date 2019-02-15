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
                session["user"] = backenduser_to_safe_frontenduser(user)
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


@app.route('/user/<username>')
def user(username):
    if username == 'you':
        return jsonify({
            'success': True,
            'user': {
                'username': 'you',
                'profilepic': 'https://via.placeholder.com/200x200&text=ProfilePic',
                'links': [
                    {
                        'site': 'twitter',
                        'tag': 'you'
                    },
                    {
                        'site': 'furaffinity',
                        'tag': 'you'
                    }
                ]
            }
        })
    if username == 'azurediamond':
        return jsonify({
            'success': True,
            'user': {
                'username': 'azurediamond',
                'profilepic': 'https://via.placeholder.com/200x200&text=ProfilePic',
                'links': [
                    {
                        'site': 'furaffinity',
                        'tag': 'azurediamond'
                    }
                ]
            }
        })
    return jsonify({'success': False})


@app.route('/logout')
def logout():
    session["user"]=None
    return jsonify({"logout": True})


def backenduser_to_safe_frontenduser(user):
    return {
                "username": user["username"],
                "isartist": user["isartist"],
                "profilepic": user["profilepic"]
            }

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=3001)
