
function Card({ player, rt: [ runtime, setRuntime ] }) {
  const selectTeam = () => {
    if ( !runtime.selectedTeam ) {
      setRuntime(prev => ({
        ...prev,
        selectedTeam: player.id
      }))
    } else if ( runtime.state === 'Atacando' ) {
      setRuntime(prev => ({
        ...prev,
        damageTo: player.id,
      }))
    }
  }

  return (
    <article className={`pixel-border card ${ runtime.selectedTeam === player.id || runtime.damageTo === player.id ? 'selected' : null } ${ runtime.state === 'Atacando' && 'crosshair' }`} onClick={ selectTeam }>
      <h3>Equipo { player.id }</h3>
      <div>
        <p>Vida: { player.life } HP</p>
        <span className="hp">{ Array(player.life).fill('.') }</span>
      </div>
      <p>Bonus:</p>
      <div>
        <img className="icon" src="https://freesvg.org/img/coracaozinho-para-o-luiz-otavio.png" />
      </div>
    </article>
  )
}

export default Card
