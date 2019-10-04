from celery import Celery
from celery.bin import worker
from .core import app

celery_app = Celery(
    'celery_worker',
    include=['tasks', 'upload'],
    broker=app.config.get('CELERY_BROKER_URL'),
    backend=app.config.get('CELERY_RESULT_BACKEND'),
    broker_backend=app.config.get('BROKER_BACKEND')
    )


celery_app.conf.update(
    task_always_eager=True,
    task_eager_propagates=app.config.get('CELERY_TASK_EAGER_PROPAGATES')
)
