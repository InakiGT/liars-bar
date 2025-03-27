import { useState } from 'react'
import { questions } from '../utils/questions'

function useRuntime() {
  const base = {
    turn: 0,
    state: '',
    currentQuestion: null,
    selectedTeam: 0,
    damageTo: 0,
    finished: false,
    await: false,
    activeBonus: [],
    damageBonus: 0,
    bonusInfo: { title: '', effect: '' },
    questions: [ ...questions ],
    teams: [
      {
        id: 1,
        life: 100,
        combo: 0,
      },
      {
        id: 2,
        life: 100,
        combo: 0,
      },
      {
        id: 3,
        life: 100,
        combo: 0,
      },
      {
        id: 4,
        life: 100,
        combo: 0,
      },
    ]
  }
  const [ runtime, setRuntime ] = useState({ ...base })

  return [ runtime, setRuntime, base ]
}

export default useRuntime
