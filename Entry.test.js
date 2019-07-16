import React from 'react'
import Entry from './Entry'

import renderer from 'react-test-renderer'

it('renders without crashing', () => {
  const rendered = renderer.create(<Entry />).toJSON()
  expect(rendered).toBeTruthy()
})
