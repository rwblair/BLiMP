# -*- coding: utf-8 -*-
""" Core Neuroscout App """
import os

from requests import get

from flask import send_file, send_from_directory, render_template, url_for
from .basic import create_app
from .models import db

app = create_app()

from flask_mail import Mail

from flask_jwt import JWT
from flask_security import Security
from flask_security.confirmable import confirm_email_token_status, confirm_user
from flask_cors import CORS

from .basic import create_app
from .models import db, user_datastore

app, cache = create_app()
mail = Mail(app)
# Enable CORS
cors = CORS(
    app,
    resources={r"/api/*": {"origins": "*"}, r"/swagger/": {"origins": "*"}})

# These imports require the above
from .auth import authenticate, load_user
from .utils.factory import route_factory
from .api_spec import docs

# Setup Flask-Security and JWT
security = Security(app, user_datastore)
jwt = JWT(app, authenticate, load_user)

# Set up API routes
route_factory(
    app, docs,
    [
        ('DatasetResource', 'datasets/<int:dataset_id>'),
        ('DatasetListResource', 'datasets'),
        ('DatasetIngestResource', 'datasets/ingest'),
        ('AnalysisRootResource', 'analyses'),
        ('AnalysisResource', 'analyses/<analysis_id>'),
        ('AnalysisFullResource', 'analyses/<analysis_id>/full'),
        ('AnalysisUploadResource', 'analyses/<analysis_id>/upload'),
        ('BibliographyResource', 'analyses/<analysis_id>/bibliography'),
        ('CloneAnalysisResource', 'analyses/<analysis_id>/clone'),
        ('CompileAnalysisResource', 'analyses/<analysis_id>/compile'),
        ('ReportResource', 'analyses/<analysis_id>/report'),
        ('AnalysisResourcesResource', 'analyses/<analysis_id>/resources'),
        ('AnalysisBundleResource', 'analyses/<analysis_id>/bundle'),
        ('AnalysisFillResource', 'analyses/<analysis_id>/fill'),
        ('RunListResource', 'runs'),
        ('RunResource', 'runs/<int:run_id>'),
        ('PredictorListResource', 'predictors'),
        ('PredictorResource', 'predictors/<int:predictor_id>'),
        ('PredictorCategoryResource', 'predictor_categories/<int:predictor_id>'),
        ('PredictorEventListResource', 'predictor-events'),
        ('PredictorCollectionResource', 'predictors/collection'),
        ('UserRootResource', 'user'),
        ('UserTriggerResetResource', 'user/reset_password'),
        ('UserResetSubmitResource', 'user/submit_token'),
        ('UserResendConfirm', 'user/resend_confirmation'),
        ('TaskResource', 'tasks/<int:task_id>'),
        ('TaskListResource', 'tasks')
    ])

@app.route('/confirm/<token>')
def confirm(token):
    ''' Serve confirmaton page '''
    expired, invalid, user = confirm_email_token_status(token)
    name, confirmed = None, None
    if user:
        if not expired and not invalid:
            confirmed = confirm_user(user)
            db.session.commit()
        name = user.name
    else:
        confirmed = None
    return render_template(
        'confirm.html', confirmed=confirmed, expired=expired, invalid=invalid,
        name=name, action_url=url_for('index', _external=True))

@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory(app.static_folder, path)

''' proxy doesn't work fully, react dev server requires some static resources
    that we don't have in our static dirs
SITE_NAME = 'http://localhost:3000'
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def proxy(path):
    return get(f'{SITE_NAME}{path}').content
'''

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    index_dir, _ = os.path.split(os.path.split(app.static_folder)[0])
    print(index_dir)
    return send_from_directory(index_dir, 'index.html')
