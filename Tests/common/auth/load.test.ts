import { describe, it, expect, vi, beforeEach } from 'vitest'
import { load } from './../../../src/common/auth/localStorage/Load'

describe('load()', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('returns parsed value when key exists', () => {
    const user = { name: 'Ola', email: 'ola@example.com' }
    localStorage.setItem('user', JSON.stringify(user))

    const result = load<typeof user>('user')
    expect(result).toEqual(user)
  })

  it('return null when key is missing', () => {
    const result = load('missingKey')
    expect(result).toBeNull()
  })

  it('return null and logs error if value is not valide JSON', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    localStorage.setItem('user', '{not-valid-json}')

    const result = load('user')
    expect(result).toBeNull()
    expect(consoleSpy).toHaveBeenCalled()
  })
})
