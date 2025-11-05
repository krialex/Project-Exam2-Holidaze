import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginModal } from './LoginModal'
import { Login } from '../../common/auth/api/Login/Login'
import { useUser } from '../../context/UserContext'
import { toast } from 'react-toastify'

vi.mock('./../../common/auth/api/Login/Login')
vi.mock('./../../context/UserContext')
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

const mockRefreshUser = vi.fn()
const mockOnClose = vi.fn()

vi.mocked(useUser).mockReturnValue({
  refreshUser: mockRefreshUser,
} as any)

describe('LoginModal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('does NOT render when isOpen is false', () => {
    render(<LoginModal isOpen={false} onClose={mockOnClose} />)
    expect(screen.queryByText('Log in')).not.toBeInTheDocument()
  })

  it('renders modal when isOpen is true', () => {
    render(<LoginModal isOpen={true} onClose={mockOnClose} />)
    expect(screen.getByPlaceholderText('Your email..')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Your password..')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument()
  })

  it('calls Login, refreshUser, toast.success and onClose on successful login', async () => {
  const user = userEvent.setup()

  vi.mocked(Login).mockResolvedValue({
    data: { accessToken: 'abc123' }
  } as any)

  render(<LoginModal isOpen={true} onClose={mockOnClose} />)

  const emailInput = screen.getByRole('textbox', { name: /email/i })
  const passwordInput = screen.getByLabelText(/password/i)
  const submitButton = screen.getByRole('button', { name: /log in/i })

  await user.type(emailInput, 'ola@stud.noroff.no')
  await user.type(passwordInput, 'pass12345')
  await user.click(submitButton)

  await waitFor(() => {
    expect(Login).toHaveBeenCalledWith('ola@stud.noroff.no', 'pass12345')
  })

  await waitFor(() => {
    expect(mockRefreshUser).toHaveBeenCalled()
  })

  await waitFor(() => {
    expect(toast.success).toHaveBeenCalledWith('Logged in successfully!')
  })

  await waitFor(() => {
    expect(mockOnClose).toHaveBeenCalled()
  })
})

  it('shows validation error for invalid email', async () => {
    const user = userEvent.setup()

    render(<LoginModal isOpen={true} onClose={mockOnClose} />)

    const emailInput = screen.getByPlaceholderText('Your email..')
    await user.type(emailInput, 'not-an-email')
    await user.tab()

    await waitFor(() => {
      expect(screen.getByText(/Please insert your @stud.noroff.no email/i)).toBeInTheDocument()
    })
  })

  it('shows validation error for missing password', async () => {
    const user = userEvent.setup()

    render(<LoginModal isOpen={true} onClose={mockOnClose} />)

    const passwordInput = screen.getByPlaceholderText('Your password..')
    await user.click(passwordInput)
    await user.tab() 

    await waitFor(() => {
      expect(screen.getByText(/please insert your password/i)).toBeInTheDocument()
    })
  })

  it('closes modal when clicking close button', async () => {
    const user = userEvent.setup()

    render(<LoginModal isOpen={true} onClose={mockOnClose} />)

    const closeButton = screen.getByRole('button', { name: 'close' })
    await user.click(closeButton)

    expect(mockOnClose).toHaveBeenCalled()
  })

  it('closes modal when clicking backdrop', async () => {
    const user = userEvent.setup()

    render(<LoginModal isOpen={true} onClose={mockOnClose} />)

    const backdrop = screen.getByTestId('backdrop') 
    await user.click(backdrop)

    expect(mockOnClose).toHaveBeenCalled()
  })
})