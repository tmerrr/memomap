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

import App from '../component/App';

class FeatureDouble extends Component {}
class LayerDouble extends Component {}
class MapDouble extends Component {}

describe ('App', () => {
  let wrapper;
  let app;
  beforeEach( () => {
    wrapper = shallow(
      <App
        FeatureClass={FeatureDouble}
        LayerClass={LayerDouble}
        MapClass={MapDouble}
      />
    )
      app = wrapper.instance();
      // sinon.stub(app, 'componentDidMount', () => { })
      // app.componentDidMount = jest.fn()
      app.forceUpdate()
      wrapper.update()
  })

  describe ('Props', () => {
    it ('has an empty array of pins', () => {
      expect(wrapper.state('pins')).to.be.a('array')
    })
  })

  describe ('renderPin', () => {
    it ('returns a FeatureDouble component', () => {
      expect(app.renderPin(5, 5)).to.contain(FeatureDouble)
    })
  })

  describe ('renderLayer', ()=> {
    it ('returns a layer component', ()=>{
      expect(app.renderLayer()).to.contain(LayerDouble)
    })
  })

  describe('handleClick', () => {
    it ('adds a pin to the state', () => {
      let event = {lngLat: 'the coordinates'}
      app.handleClick('map', event)
      expect(wrapper.state('pins')[0]).to.equal('the coordinates')
    })
  })
})
