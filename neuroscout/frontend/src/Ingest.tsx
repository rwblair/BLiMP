import * as React from 'react';
import { Button, Form, Input, Row } from 'antd';

import { api } from './api';
import { MainCol } from './HelperComponents';

type IngestProps = {
  getDatasets: () => void;
};

type IngestState = {
  path: string
  error: string
};

class Ingest extends React.Component<IngestProps, IngestState> {
  constructor(props) {
    super(props);
    this.state = {path: '', error: ''};
  }

  render() {
    return (
      <Row type="flex" justify="center" style={{ background: '#fff', padding: 0 }}>
        <MainCol>
          <Form 
            onSubmit={(e) => {
              e.preventDefault();
              api.ingestDataset(this.state.path).then(response => {
                if ('error' in response) {
                  this.setState({error: response.error});
                } else {
                  this.setState({error: ''});
                  this.props.getDatasets();
                }
              });
            }}
          >
            <Form.Item
              label="Path to dataset"
              validateStatus={!!this.state.error ? 'error' : 'success'}
              help={!!this.state.error ? this.state.error : ''}
            >
                <Input
                  onChange={(e) => this.setState({path: e.currentTarget.value})}
                />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" type="primary" >
                  Ingest
                </Button>
            </Form.Item>
          </Form>
        </MainCol>
      </Row>
    );
  }
}

export default Ingest;
