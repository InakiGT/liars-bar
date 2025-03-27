export function getQuestion (questions) {
  const index = Math.floor(Math.random() * questions.length)
  const removed = questions.splice(index, 1)[0]

  return removed
}
