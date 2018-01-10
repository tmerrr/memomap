import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import renderer from 'react-test-renderer';

chai.use(chaiEnzyme());

import Application from './Application';

it ('can add!', () => {
  expect(1 + 2).to.equal(3);
})
