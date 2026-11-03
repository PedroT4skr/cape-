// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { initGlobalClickSound } from './ui-sound-manager'
import { soundEffects } from './sound-effects.service'

describe('Global UI Click Sound Interceptor', () => {
  let cleanup: (() => void) | null = null

  beforeEach(() => {
    vi.spyOn(soundEffects, 'playTapSound').mockImplementation(() => {})
    cleanup = initGlobalClickSound()
  })

  afterEach(() => {
    if (cleanup) cleanup()
    vi.restoreAllMocks()
  })

  it('plays tap sound when clicking a button', () => {
    const btn = document.createElement('button')
    document.body.appendChild(btn)

    btn.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }))
    expect(soundEffects.playTapSound).toHaveBeenCalledTimes(1)

    document.body.removeChild(btn)
  })

  it('does not play sound if element is disabled', () => {
    const btn = document.createElement('button')
    btn.setAttribute('disabled', 'true')
    document.body.appendChild(btn)

    btn.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }))
    expect(soundEffects.playTapSound).not.toHaveBeenCalled()

    document.body.removeChild(btn)
  })
})
