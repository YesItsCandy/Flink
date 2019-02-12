from flask import Flask, render_template, jsonify


app = Flask(__name__)


@app.route('/featured')
def featured():
    return jsonify([
        {"src":"https://via.placeholder.com/350x150", "name":"test1"},
        {"src":"https://via.placeholder.com/200x200", "name":"test2"},
        {"src":"https://via.placeholder.com/300x150", "name":"test3"},
        {"src":"https://via.placeholder.com/100x200", "name":"test4"},
        {"src":"https://via.placeholder.com/200x300", "name":"test5"},
        {"src":"https://via.placeholder.com/200x300", "name":"test6"},
        {"src":"https://via.placeholder.com/200x300", "name":"test7"}
    ])


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=3001)
