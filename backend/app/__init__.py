from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///books.db'
    db.init_app(app)
    CORS(app)

    from .routes import main  # Import your routes
    app.register_blueprint(main)

    with app.app_context():
        db.create_all()
        from app.populate_db import populate_db
        populate_db()
    return app
