import os

from flask_apispec import MethodResource, marshal_with, doc, use_kwargs
import webargs as wa

from ..core import cache
from ..models import Dataset
from ..schemas.dataset import DatasetSchema
from ..populate.ingest import add_all_tasks
from .utils import first_or_404


class DatasetResource(MethodResource):
    @doc(tags=['dataset'], summary='Get dataset by id.')
    @cache.cached(60 * 60 * 24 * 300, query_string=True)
    @marshal_with(DatasetSchema)
    def get(self, dataset_id):
        return first_or_404(Dataset.query.filter_by(id=dataset_id))


class DatasetListResource(MethodResource):
    @doc(tags=['dataset'], summary='Returns list of datasets.')
    @use_kwargs({
        'active_only': wa.fields.Boolean(
            missing=True, description="Return only active Datasets")
        },
        locations=['query'])
    @cache.cached(60 * 60 * 24 * 300, query_string=True)
    @marshal_with(DatasetSchema(
        many=True, exclude=['dataset_address', 'preproc_address']))
    def get(self, **kwargs):
        query = {}
        if kwargs.pop('active_only'):
            query['active'] = True
        return Dataset.query.filter_by(**query).all()

class DatasetIngestResource(MethodResource):
    @doc(tags=['dataset'], summary='Ingest new dataset.')
    @use_kwargs({'path': wa.fields.Str()})
    def post(self, **kwargs):
        path = kwargs.pop('path')
        dataset_ids = []
        if os.path.lexists(path):
            dataset_ids = add_all_tasks(path)
        else:
            return {'error': 'Path does not exist'}
        return dataset_ids
