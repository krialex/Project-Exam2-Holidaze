vi.stubGlobal('import.meta', { env: { VITE_API_KEY: 'test-key' } })
vi.mock('./../../../src/common/auth/localStorage/Save', () => ({
  save: vi.fn(),
}))

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Register } from './../../../src/common/auth/api/Register'
import { save } from './../../../src/common/auth/localStorage/Save'

describe('Register()', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    vi.clearAllMocks()
  })

  it('calling fetch with correct URL, headers and body, and stores data correct', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({
        data: {
          accessToken: 'mockTokenABC',
          name: 'Kari Nordmann',
          email: 'kari@example.com',
          venueManager: false,
        },
      }),
    }

    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue(mockResponse as any)

    const result = await Register('Kari Nordmann', 'kari@example.com', '12345', false)

    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringContaining('/register'),
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
      })
    )

    expect(save).toHaveBeenCalledWith('accessToken', 'mockTokenABC')
    expect(save).toHaveBeenCalledWith('user', {
      name: 'Kari Nordmann',
      email: 'kari@example.com',
      manager: false,
    })

    expect(result.data.accessToken).toBe('mockTokenABC')
  })

  it('throws error if !resonse ok', async () => {
    const mockResponse = { ok: false }
    vi.spyOn(global, 'fetch').mockResolvedValue(mockResponse as any)

    await expect(Register('a', 'b', 'c', false)).rejects.toThrow('Register failed')
  })
})
