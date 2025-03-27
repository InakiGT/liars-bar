import { useEffect, useState } from 'react'
import { getQuestion } from '../helpers/questionActions'
import { getBonus } from '../helpers/bonusActions'

function Questions({ rt: [ runtime, setRuntime ] }) {
  const DAMAGE = 20
  const IS_COMBO = 1

  const [ show, setShow ] = useState(true)
  const [dots, setDots] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots => {
        if (prevDots.length < 3) {
          return prevDots + '.'
        } else {
          return ''
        }
      });
    }, 500)

    return () => clearInterval(interval)
  }, []);

  const showAnswer = () => {
    setShow(false)

    setRuntime(prev => ({
      ...prev,
      state: 'Contestando',
    }))
  }

  const prefab = (prev) => ({
    ...prev,
    turn: ++prev.turn,
    state: 'Preguntando',
    selectedTeam: 0,
  })

  const newQuestion = () => {
    const question = getQuestion(runtime.questions)

    if ( question ) {
      setRuntime(prev => ({
        ...prev,
        currentQuestion: question,
      }))
    } else {
      setRuntime(prev => ({
        ...prev,
        finished: true,
      }))
    }
  }

  const isRight = () => {

    const teams = runtime.teams.map(team => {
      if ( team.id === runtime.selectedTeam ) {
        ++team.combo

        if ( team.combo === IS_COMBO ) {
          const bonus = getBonus()
          bonus.func([ runtime, setRuntime ])

          setRuntime(prev =>({
            ...prev,
            bonusInfo: { title: bonus.title, effect: bonus.effect  },
            activeBonus: [ ...prev.activeBonus, bonus.times > 1 || bonus.times === -1 ? bonus : null ]
          }))

          team.combo = 0
        }

      }
      return team
    })

    setRuntime(prev => ({
      ...prefab(prev),
      teams: [ ...teams ],
      selectedTeam: prev.selectedTeam,
      state: 'Atacando',
      await: true,
    }))
  }

  const isWrong = () => {
    const teams = runtime.teams.map(team => {
      if ( runtime.selectedTeam === team.id ) {
        team.life -= DAMAGE
      }

      return team
    })

    setRuntime(prev => ({
      ...prefab(prev),
      teams: [...teams],
    }))

    setShow(true)
    newQuestion()
  }

  useEffect(() => {
    if ( runtime.await ) {
      if ( runtime.damageTo ) {
        const teams = runtime.teams.map(team => {
          if ( runtime.damageTo === team.id ) {
            team.life -= ( DAMAGE + runtime.damageBonus )
          }

          return team
        })

        setRuntime(prev => ({
          ...prefab(prev),
          teams: [ ...teams ],
          damageTo: 0,
          damageBonus: 0,
          await: false,
        }))

        setShow(true)
        newQuestion()
      }

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ runtime.await, runtime.damageTo ])

  return (
    <div className="playground-container">
      <section className="pixel-border questions">
        {
          runtime.state !== 'Atacando' ? (
          <>
          <p>{ runtime.currentQuestion?.question }</p>
          <p className={ !show ? 'show' : ( runtime.turn ? 'hide' : 'answer' ) }>Respuesta: { runtime.currentQuestion?.answer }</p>
          <div>
            {
              !show ? (
                <>
                <button className="right-btn" onClick={ isRight }>Correcto</button>
                <button className="wrong-btn" onClick={ isWrong }>Incorrecto</button>
                </>
              ) : (
                <button className="btn" disabled={ runtime.selectedTeam === 0 } onClick={ showAnswer }>Revelar</button>
              )
            }
          </div>
          </>
          ) : (
            <p>Ataca a un contrincante</p>
          )
        }
      </section>
      <section className="pixel-border status">
        <p>Estado:  { runtime.state }{ dots }</p>
      </section>
    </div>
  )
}

export default Questions
