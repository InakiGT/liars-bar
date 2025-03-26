import { questions } from '../utils/questions'

export function getQuestion() {
  const index = Math.floor(Math.random() * questions.length)
  const removed = questions.splice(index, 1)[0]

  return removed
}
