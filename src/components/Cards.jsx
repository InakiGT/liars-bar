import Card from './Card'

function Cards({ rt: [ runtime, setRuntime ] }) {

  return (
    <div className='cards'>
      {
        runtime.teams.map(player =>
          <Card key={ player.id } player={ player } rt={[ runtime, setRuntime ]} />
        )
      }
    </div>
  )
}

export default Cards
