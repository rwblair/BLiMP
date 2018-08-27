"""empty message

Revision ID: 8ef48148a25b
Revises: b51e0d9c6f26
Create Date: 2018-08-22 22:48:48.720462

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8ef48148a25b'
down_revision = 'b51e0d9c6f26'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('dataset', sa.Column('summary', sa.Text(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('dataset', 'summary')
    # ### end Alembic commands ###