import {render, fireEvent} from '@testing-library/react';
import Board from './Board';

it('should render without crashing', () => {
  render(<Board/>);
})

it('should match won screen snapshot', () => {
  const {asFragment} = render(<Board chanceLightStartsOn={0} />)
  expect(asFragment()).toMatchSnapshot()
})

it('should match playing screen snapshop', () => {
  const spy = jest.spyOn(Math, 'random')
    .mockReturnValue(1)
    .mockReturnValueOnce(0.1)
    .mockReturnValueOnce(0.1)
    .mockReturnValueOnce(0.1)

  const {asFragment} = render(<Board />)
  expect(asFragment()).toMatchSnapshot()
  spy.mockClear()
})

it('should correctly lit and unlit', () => {
    const spy = jest.spyOn(Math, 'random').mockReturnValue(2).mockReturnValueOnce(0.1)
    const {container} = render(<Board />)
    expect(container.querySelectorAll('.Cell-lit').length).toBe(1)
    expect(container.querySelector('tr:nth-child(1) .Cell:nth-child(1)')).toBeInTheDocument()
    expect(container.querySelector('tr:nth-child(1) .Cell:nth-child(1) img').getAttribute('alt')).toBe('light on')
    // click on 1st cell
    fireEvent.click(container.querySelector('tr:nth-child(1) .Cell:nth-child(1)'))
    expect(container.querySelectorAll('.Cell-lit').length).toBe(2)
    expect(container.querySelector('tr:nth-child(1) .Cell:nth-child(1) img').getAttribute('alt')).toBe('light off')
    expect(container.querySelector('tr:nth-child(1) .Cell:nth-child(2) img').getAttribute('alt')).toBe('light on')
    expect(container.querySelector('tr:nth-child(2) .Cell:nth-child(1) img').getAttribute('alt')).toBe('light on')
    
    //click on cell (3, 3)
    fireEvent.click(container.querySelector('tr:nth-child(3) .Cell:nth-child(3)'))
    expect(container.querySelector('tr:nth-child(3) .Cell:nth-child(3) img').getAttribute('alt')).toBe('light on')
    expect(container.querySelector('tr:nth-child(3) .Cell:nth-child(4) img').getAttribute('alt')).toBe('light on')
    expect(container.querySelector('tr:nth-child(3) .Cell:nth-child(2) img').getAttribute('alt')).toBe('light on')
    expect(container.querySelector('tr:nth-child(4) .Cell:nth-child(3) img').getAttribute('alt')).toBe('light on')
    expect(container.querySelector('tr:nth-child(2) .Cell:nth-child(3) img').getAttribute('alt')).toBe('light on')

    spy.mockClear()
  

})
