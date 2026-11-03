import { describe, it, expect, beforeEach } from 'vitest'
import {
  getCurrentPin,
  setCustomPin,
  resetPinToDefault,
  validatePin,
  PIN_STORAGE_KEY
} from './pin.utils'
import { APP_CONFIG } from '../constants/config.constants'

// Mock simples de localStorage para ambiente Node
const storageMap = new Map<string, string>()
const mockLocalStorage = {
  getItem: (key: string) => storageMap.get(key) ?? null,
  setItem: (key: string, value: string) => storageMap.set(key, value),
  removeItem: (key: string) => storageMap.delete(key),
  clear: () => storageMap.clear()
}

// @ts-expect-error Mocking global localStorage
globalThis.localStorage = mockLocalStorage

describe('PIN Security Management', () => {
  beforeEach(() => {
    mockLocalStorage.clear()
  })

  it('returns default PIN when nothing is saved in localStorage', () => {
    expect(getCurrentPin()).toBe(APP_CONFIG.DEFAULT_PIN)
    expect(validatePin('1234')).toBe(true)
    expect(validatePin('9999')).toBe(false)
  })

  it('allows saving a valid custom 4-digit PIN', () => {
    const success = setCustomPin('4321')
    expect(success).toBe(true)
    expect(getCurrentPin()).toBe('4321')
    expect(validatePin('4321')).toBe(true)
    expect(validatePin('1234')).toBe(false)
  })

  it('allows saving up to 8 numeric digits', () => {
    const success = setCustomPin('12345678')
    expect(success).toBe(true)
    expect(getCurrentPin()).toBe('12345678')
    expect(validatePin('12345678')).toBe(true)
  })

  it('rejects invalid PIN formats (letters, less than 4 digits, more than 8 digits)', () => {
    expect(setCustomPin('123')).toBe(false)
    expect(setCustomPin('abcd')).toBe(false)
    expect(setCustomPin('123456789')).toBe(false)
    expect(getCurrentPin()).toBe(APP_CONFIG.DEFAULT_PIN)
  })

  it('resets to factory default PIN when requested', () => {
    setCustomPin('9876')
    expect(getCurrentPin()).toBe('9876')

    resetPinToDefault()
    expect(getCurrentPin()).toBe(APP_CONFIG.DEFAULT_PIN)
    expect(validatePin('1234')).toBe(true)
  })
})
