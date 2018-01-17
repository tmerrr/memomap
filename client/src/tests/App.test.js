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

class MapDouble extends Component {}
class GeocoderDouble extends Component {}
class PinDouble extends Component {}
class PinPopupDouble extends Component {}

describe ('App', () => {
  let wrapper;
  let app;
  beforeEach( () => {
    wrapper = shallow(
      <App
        MapClass={MapDouble}
        GeocoderClass={GeocoderDouble}
        PinClass={PinDouble}
        PinPopupClass={PinPopupDouble}
      />
    )
      app = wrapper.instance();
  })

  describe ('show Popup', () => {
    it ('renders a Popup into the App', () => {
      console.log(wrapper)
      console.log(app)
      expect(app.showPopup()).to.be.a(PinPopupDouble)
    })
  })
  //
  //
  //
  // describe ('Props', () => {
  //   it ('has an empty array of pins', () => {
  //     expect(wrapper.state('pins')).to.be.a('array')
  //   })
  // })
  //
  // describe ('renderPin', () => {
  //   it ('returns a FeatureDouble component', () => {
  //     expect(app.renderPin(5, 5)).to.contain(FeatureDouble)
  //   })
  // })
  //
  // describe ('renderLayer', ()=> {
  //   it ('returns a layer component', ()=>{
  //     expect(app.renderLayer()).to.contain(LayerDouble)
  //   })
  // })
  //
  // describe('handleClick', () => {
  //   it ('adds a pin to the state', () => {
  //     let event = {lngLat: 'the coordinates'}
  //     app.handleClick('map', event)
  //     expect(wrapper.state('pins')[0]).to.equal('the coordinates')
  //   })
  // })
})
