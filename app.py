from flask import Flask, render_template
import os

app = Flask(__name__)

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY') or os.urandom(24)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(
        host='localhost',
        port=5000,
        debug=True
    )
