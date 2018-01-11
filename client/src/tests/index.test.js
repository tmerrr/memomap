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
    expect(app.state('pins')).to.be.a('array')
  })
})

describe ('renderPin', () => {
  it ('returns a FeatureDouble component', () => {
    let app = shallow(<MainAppDouble />)
    expect(app.find(LayerDouble).find(FeatureDouble)).to.have.length(1)
  })
})

describe ('renderLayer', ()=> {
  it ('returns a layer component', ()=>{
    let app = shallow(<MainAppDouble />)
    expect(app.find(LayerDouble)).to.have.length(1)
  })
})

describe('handleClick', () => {
  it ('adds a pin to the state', () => {
    let app = shallow(<MainAppDouble />)
    let map = 'map'
    let event = {lngLat: 'the coordinates'}
    app.instance().handleClick(map, event)
    expect(app.state('pins')[0]).to.equal('the coordinates')
  })
})
