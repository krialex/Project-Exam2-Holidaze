import { render, screen, fireEvent } from './../../../../Tests/test-utils'
import { describe, it, vi, expect } from 'vitest'
import { Header } from '../header/header'

describe('Header (minimal test)', () => {
  it('opens LoginModal when Log in button is clicked', () => {
    render(
      <Header darkMode={false} setDarkMode={vi.fn()} onSearch={vi.fn()} searchTerm="" />
    )

    const loginButtons = screen.getAllByRole('button', { name: /log in/i })
    fireEvent.click(loginButtons[0]) 

    const modalHeading = screen.getByRole('heading', { name: /log in/i })
    expect(modalHeading).toBeInTheDocument()
  })

  it('opens RegisterModal when Register button is clicked', () => {
    render(
      <Header darkMode={false} setDarkMode={vi.fn()} onSearch={vi.fn()} searchTerm="" />
    )

    const registerButtons = screen.getAllByRole('button', { name: /register/i })
    fireEvent.click(registerButtons[0])

    const modalHeading = screen.getByRole('heading', { name: /register/i })
    expect(modalHeading).toBeInTheDocument()
  })

  it('calls onSearch when typed in text in SearchBar', () => {
    const onSearchMock = vi.fn()
    render(
      <Header darkMode={false} setDarkMode={vi.fn()} onSearch={onSearchMock} searchTerm="" />
    )

    const input = screen.getByPlaceholderText(/where to/i)
    fireEvent.change(input, { target: { value: 'Oslo' } })

    expect(onSearchMock).toHaveBeenCalledWith('Oslo')
  })
})
