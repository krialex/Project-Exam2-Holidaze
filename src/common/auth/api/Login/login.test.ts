import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Login } from './Login'
import { save } from './../../localStorage/Save/Save'

vi.mock('./../../localStorage/Save/Save.ts', () => ({
  save: vi.fn(),
}))

describe('Login()', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    vi.clearAllMocks()
  })

  it('calls fetch with correct URL and body, and saves token + user', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({
        data: {
          accessToken: 'mockToken123',
          name: 'Ola Nordmann',
          email: 'ola@example.com',
          venueManager: true,
        },
      }),
    }

    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue(mockResponse as any)

    const result = await Login('ola@example.com', '1234', true)

    expect(fetchSpy).toHaveBeenCalledWith(expect.stringContaining('/login'), expect.objectContaining({
      method: 'POST',
      headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
    }))

    expect(save).toHaveBeenCalledWith('accessToken', 'mockToken123')
    expect(save).toHaveBeenCalledWith('user', {
      name: 'Ola Nordmann',
      email: 'ola@example.com',
      manager: true,
    })

    expect(result.data.accessToken).toBe('mockToken123')
  })

  it('throws error if !response ok', async () => {
    const mockResponse = { ok: false }
    vi.spyOn(global, 'fetch').mockResolvedValue(mockResponse as any)

    await expect(Login('test@test.com', 'wrong')).rejects.toThrow('Login failed')
  })
})

 