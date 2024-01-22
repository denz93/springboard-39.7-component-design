import {render} from '@testing-library/react'
import Cell from './Cell';

it('renders without crashing', () => {
  render(<Cell />)
})

it('should match unlit snapshot', () => {
  const {asFragment} = render(<Cell />)
  expect(asFragment()).toMatchSnapshot()
})
it('should match lit snapshot', () => {
  const {asFragment} = render(<Cell isLit={true} />)
  expect(asFragment()).toMatchSnapshot()
})