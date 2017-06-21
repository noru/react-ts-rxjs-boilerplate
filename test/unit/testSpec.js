import { sum } from '../../src/js/utils/removeMe'
import { expect } from './testHelper'


describe('MyTest', () => {

  beforeEach(() => {
    // component = renderComponent(FriendListApp)
    console.error('before each')
  })

  it('sum test', () => {
    expect(sum(1, 2)).to.equal('12')
  })

})
