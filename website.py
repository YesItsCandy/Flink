from flask import Flask, render_template, jsonify


app = Flask(__name__)


@app.route('/featured')
def featured():
    return jsonify([
        
    ])


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=3001)
