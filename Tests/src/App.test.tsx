import { describe, it, expect } from 'vitest'
import { render, screen } from '../test-utils'
import App from './../../src/App'

describe('App', () => {
  it('renders the App component', () => {
    const { container } = render(<App />)
    expect(container.firstChild).toBeInTheDocument()
    screen.debug()
  })
})
