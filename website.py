from flask import Flask, render_template, jsonify, request


app = Flask(__name__)


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
    if("username" in request.form and "password" in request.form):
        if(request.form["username"] == "azurediamond" and request.form["password"] == "hunter2"):
            return jsonify({
                "success": True,
                "user": {
                    "username": "azurediamond",
                    "email": "azurediamond@example.com",
                    "profilepic": "https://via.placeholder.com/200x200&text=ProfilePic",
                    "artist": True
                }
            })
    return jsonify({"success": False})


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=3001)
