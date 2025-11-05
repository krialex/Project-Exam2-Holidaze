import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Register } from './Register'
import { save } from '../../localStorage/Save/Save'

vi.mock('./../../localStorage/Save/Save.ts', () => ({
    save: vi.fn(),
}))

describe('Register()', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    vi.clearAllMocks()
  })

  it('calls fetch with correct URL and body, saves token + user on success', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({
        data: {
          accessToken: 'regToken456',
          name: 'Kari Nordmann',
          email: 'kari@example.com',
          venueManager: false,
        },
      }),
    }

    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue(mockResponse as any)

    const result = await Register('Kari Nordmann', 'kari@example.com', 'secret123', false)

    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringContaining('/register'),
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
          name: 'Kari Nordmann',
          email: 'kari@example.com',
          password: 'secret123',
          venueManager: false,
        }),
      })
    )

    expect(save).toHaveBeenCalledWith('accessToken', 'regToken456')
    expect(save).toHaveBeenCalledWith('user', {
      name: 'Kari Nordmann',
      email: 'kari@example.com',
      manager: false,
    })

    expect(result.data.accessToken).toBe('regToken456')
  })

  it('throws error with API error message when response not ok and errors exist', async () => {
    const mockResponse = {
      ok: false,
      json: async () => ({
        errors: [{ message: 'Email already in use' }],
      }),
    }

    vi.spyOn(global, 'fetch').mockResolvedValue(mockResponse as any)

    await expect(
      Register('Test', 'exists@example.com', 'pass', true)
    ).rejects.toThrow('Email already in use')
  })

  it('throws fallback error when no specific message', async () => {
    const mockResponse = {
      ok: false,
      json: async () => ({ message: 'Something went wrong' }),
    }

    vi.spyOn(global, 'fetch').mockResolvedValue(mockResponse as any)

    await expect(
      Register('Test', 'test@example.com', 'pass', false)
    ).rejects.toThrow('Something went wrong')
  })

  it('throws "Register failed" when no message at all', async () => {
    const mockResponse = {
      ok: false,
      json: async () => ({}),
    }

    vi.spyOn(global, 'fetch').mockResolvedValue(mockResponse as any)

    await expect(
      Register('Test', 'test@example.com', 'pass', false)
    ).rejects.toThrow('Register failed')
  })
})