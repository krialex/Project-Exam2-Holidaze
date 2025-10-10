import { describe, it, expect, vi, beforeEach } from 'vitest'
import { save } from './../../../src/common/auth/localStorage/Save'

describe('save()', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    localStorage.clear()
  })

  it('stores value in localStorage if not null', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')
    save('testKey', { a: 1 })

    expect(setItemSpy).toHaveBeenCalledWith('testKey', JSON.stringify({ a: 1 }))
    expect(localStorage.getItem('testKey')).toBe(JSON.stringify({ a: 1 }))
  })

  it('removes value from localStorage if value is null', () => {
    const removeSpy = vi.spyOn(Storage.prototype, 'removeItem')
    save('testKey', null)

    expect(removeSpy).toHaveBeenCalledWith('testKey')
    expect(localStorage.getItem('testKey')).toBeNull()
  })
})
