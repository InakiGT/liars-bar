import { bonus } from '../utils/bonus'

export function getBonus () {
  const index = Math.floor(Math.random() * bonus.length)
  const b = bonus[index]

  return b
}
