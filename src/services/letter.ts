export interface Letter {
  hiragana: string
  katakana: string
  roomaji: string
  chinese: string
  figure?: string
}

export function createNoopLetter(): Letter {
  return {
    hiragana: '',
    katakana: '',
    roomaji: '',
    chinese: '',
  }
}
