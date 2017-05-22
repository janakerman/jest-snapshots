import React from 'react'
import { createRenderer } from 'react-test-renderer/shallow';
import renderer from 'react-test-renderer';
import Footer from './Footer'
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from '../constants/TodoFilters'
import { shallow } from 'enzyme'

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

  const output = shallow(<Footer {...props} />)

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
    
    it('test', () => {
      const { output } = setup()
      const filters = ['All', 'Active', 'Completed']
      output.find('button').forEach((node, i) => {
        expect(node.text()).toBe(filters[i])
      })
    })
    
  })
})
