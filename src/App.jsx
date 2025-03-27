import './App.css'
import { useEffect } from 'react'
import Cards from './components/Cards'
import Header from './components/Header'
import Questions from './components/Questions'
import { getQuestion } from './helpers/questionActions'
import useRuntime from './hooks/useRuntime'
import Modal from './components/Modal'

function App() {
  const [ runtime, setRuntime, base ] = useRuntime()

  useEffect(() => {
    const question = getQuestion(runtime.questions)

    setRuntime(prev => ({
      ...prev,
      currentQuestion: question,
      state: 'Preguntando'
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if ( runtime.finished ) {
      setRuntime(prev => ({
        ...base,
        teams: prev.teams,
        finished: true,
        questions: base.questions,
      }))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ runtime.finished ])

  const newGame = () => {
    const question = getQuestion(runtime.questions)

    setRuntime(prev => ({
      ...base,
      currentQuestion: question,
      questions: prev.questions,
      state: 'Preguntando',
      finished: false
    }))
  }

  return (
    <div className='effect'>
      <Modal rt={[ runtime, setRuntime ]} />
      <Header />
      <div className='main-container'>
        {
          runtime.finished ? (
            <div className='summary'>
            <p>Juego terminado</p>
            <div>
            <h2>Resumen</h2>
            {
              runtime.teams.map(team => (
                <p key={ team.id } className={ team.life === 0 ? 'loser' : undefined }>Equipo { team.id }: { team.life }</p>
              ))
            }
            <button className='btn' onClick={ newGame }>Jugar de nuevo</button>
            </div>
            </div>
          ) : (
            <>
            <Questions rt={[ runtime, setRuntime ]} />
            <Cards rt={[ runtime, setRuntime ]} />
            </>
          )
        }
      </div>
    </div>
  )
}

export default App
