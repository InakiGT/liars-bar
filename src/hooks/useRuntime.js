import { useState } from "react"

function useRuntime() {
  const [ runtime, setRuntime ] = useState({
    turn: 0,
    state: '',
    currentQuestion: null,
    selectedTeam: 0,
    damageTo: 0,
    finished: false,
    await: false,
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
  })

  return [ runtime, setRuntime ]
}

export default useRuntime
