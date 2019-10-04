from setuptools import setup, find_packages

setup(
    name='neuroscout',
    version='0.4',
    packages=find_packages(),
    install_requires=[
        'pliers',
        'pybids==0.8.0',
        'flask',
        'flask-sqlalchemy',
        'flask_security',
        'flask-script',
        'flask-migrate',
        'flask-caching',
        'flask-jwt',
        'flask-cors',
        'flask-apispec==0.8.0',
        'apispec==1.1.0',
        'psycopg2',
        'requests',
        'google-api-python-client',
        'hashids',
        'citeproc-py',
        'citeproc-py-styles',
        'celery',
        'marshmallow==2.19.1',
        'python-magic',
        'datalad',
        'progressbar2',
        ],
    description='Neuroscout web application.',
    url='https://github.com/neuroscout/neuroscout',
    author='UT Psychoinformatics Lab',
    author_email='delavega@utexas.edu',
    license='MIT'
)