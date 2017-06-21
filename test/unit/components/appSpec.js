import React from 'react'
import { expect } from 'chai'
import sinon from 'sinon'
import { mount, shallow } from 'enzyme'
import Perf from 'react-addons-perf'
import { App } from 'components/App'
import colors from 'colors'


describe('<App />', () => {
  
  beforeEach(() => {
    Perf.start()
  })

  afterEach(function() {
    Perf.stop()
    console.info('Perf Result of '.green + this.currentTest.title.red + ': ' )
    Perf.printInclusive(Perf.getLastMeasurements())
  })

  it('contains spec with an expectation', function() {
    expect(shallow(<App t={mockT}/>).contains(<span className='span'>Hello world</span>)).to.equal(true)
  })

  it('contains spec with another expectation', function() {
    expect(shallow(<App t={mockT}/>).is('.app')).to.equal(true)
  })

  it('contains spec with another another expectation', function() {
    expect(mount(<App t={mockT}/>).find('li').length).to.equal(3)
  })

  it('calls render', () => {
    sinon.spy(App.prototype, 'render')
    mount(<App t={mockT}/>)
    expect(App.prototype.render.calledOnce).to.equal(true)
  })

})
