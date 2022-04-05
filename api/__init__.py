from flask import Flask
from flask_cors import CORS
from flask_bootstrap import Bootstrap
from config import Config


cors = CORS()
bootstrap = Bootstrap()

def create_app(class_config=Config):
    app = Flask(__name__)
    app.config.from_object(class_config)
    
    cors.init_app(app)
    bootstrap.init_app(app)
    
    from api.main import main
    app.register_blueprint(main)
    
    return app