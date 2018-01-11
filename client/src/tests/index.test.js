import React, { Component } from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
chai.use(chaiEnzyme());

import { FeatureDouble, LayerDouble, MapDouble, MainAppDouble } from './index-double';

describe ('Props', () => {
  it ('has an empty array of pins', () => {
    let app = shallow(<MainAppDouble />)
    console.log(app)
    expect(app.state('pins')).to.be.a('array')
  })
})
