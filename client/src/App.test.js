import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());

import App from './App';

it ('can add!', () => {
  expect(1 + 2).to.equal(3);
})

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   const wrapper = shallow(<App />);
//   ReactDOM.render(wrapper, div);
// });
