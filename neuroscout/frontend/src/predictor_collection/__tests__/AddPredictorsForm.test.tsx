import * as React from 'react';
import { mount } from 'enzyme';

import { AddPredictorsForm } from '../AddPredictorsForm';
import * as testData from './data';

let testProps = {
  datasets: [testData.testDataset]
  closeModal: () => {}
};

test('AddPredictorsForm renders without crashing', () => {
  const wrapper = mount(<AddPredictorsForm {...testProps} />);
  // Create new analysis button
  expect(wrapper.text().toLowerCase()).toContain(testData.testDataset.name);
});
