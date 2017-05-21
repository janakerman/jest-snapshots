import React from 'react'
import { createRenderer } from 'react-test-renderer/shallow';
import renderer from 'react-test-renderer';
import Footer from './Footer'
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from '../constants/TodoFilters'

const setup = propOverrides => {
  const props = Object.assign({
    completedCount: 0,
    activeCount: 0,
    filter: SHOW_ALL,
    onClearCompleted: jest.fn(),
    onShow: jest.fn()
  }, propOverrides)

  // const renderer = createRenderer()
  // renderer.render(<Footer {...props} />)
  // const output = renderer.getRenderOutput()

  const output = renderer.create(<Footer {...props} />).toJSON()

  return {
    props: props,
    output: output
  }
}

const getTextContent = elem => {
  const children = Array.isArray(elem.props.children) ?
    elem.props.children : [ elem.props.children ]

  return children.reduce((out, child) =>
    // Concatenate the text
    // Children are either elements or text strings
    out + (child.props ? getTextContent(child) : child)
  , '')
}

describe('components', () => {
  describe('Footer', () => {
    
    it('should render correctly', () => {
      const { output } = setup()
      expect(output).toMatchSnapshot()
    });

    // Duplicate of the first test.
    it('should display active count when 0', () => {
      const { output } = setup({ activeCount: 0 })
      expect(output).toMatchSnapshot()
    })

    it('should display active count when above 0', () => {
      const { output } = setup({ activeCount: 1 })
      expect(output).toMatchSnapshot()
    })

    // Duplicate of the first test.
    it('should render filters', () => {
      const { output } = setup()
      expect(output).toMatchSnapshot()
    })

    // This can't be replaced by a snapshot as we're testing a callback is called.
    it('should call onShow when a filter is clicked', () => {
      const { output, props } = setup()
      const [ , filters ] = output.children
      const filterLink = filters.children[1].children[0]
      filterLink.props.onClick({})
      expect(props.onShow).toBeCalledWith(SHOW_ACTIVE)
    })

    // Duplicate of test 1
    it('shouldnt show clear button when no completed todos', () => {
      const { output } = setup({ completedCount: 0 })
      expect(output).toMatchSnapshot()
    })

    it('should render clear button when completed todos', () => {
      const { output } = setup({ completedCount: 1 })
      expect(output).toMatchSnapshot()
    })

    // Can't use snapshot here as we're testing a callback
    it('should call onClearCompleted on clear button click', () => {
      const { output, props } = setup({ completedCount: 1 })
      const [ , , clear ] = output.children
      clear.props.onClick({})
      expect(props.onClearCompleted).toBeCalled()
    })

    it('should select the active link when active filter', () => {
      const { output, props } = setup({ filter: SHOW_ACTIVE})
      expect(output).toMatchSnapshot()
    })

    it('should select the completed link when completed filter', () => {
      const { output, props } = setup({ filter: SHOW_COMPLETED})
      expect(output).toMatchSnapshot()
    })

  })
})
