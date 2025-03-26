import { useEffect } from 'react'
import './App.css'
import Cards from './components/Cards'
import Header from './components/Header'
import Questions from './components/Questions'
import { getQuestion } from './helpers/questionActions'
import useRuntime from './hooks/useRuntime'

function App() {
  const [ runtime, setRuntime ] = useRuntime()

  useEffect(() => {
    const question = getQuestion()

    setRuntime(prev => ({
      ...prev,
      currentQuestion: question,
      state: 'Preguntando'
    }));
  }, [])

  return (
    <div className='effect'>
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
                <p className={ team.life === 0 && 'loser' }>Equipo { team.id }: { team.life }</p>
              ))
            }
            <button className='btn'>Jugar de nuevo</button>
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
