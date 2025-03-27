
export const bonus = [
  {
    kind: 'HEALTH',
    title: 'Corazón de Rober',
    effect: 'Recuperas 50 HP',
    times: 1,
    func: ([ runtime, setRuntime ]) => {
      const teams = runtime.teams.map(team => {
        if ( team.id === runtime.selectedTeam ) {
          team.life = team.life + 50 >= 100 ? 100 : team + 50
        }

        return team
      })

      setRuntime(prev => ({
        ...prev,
        teams: [ ...teams ]
      }))
    },
  },
  {
    kind: 'DAMAGE',
    title: 'Bala de plata',
    effect: 'Haces 15 puntos más de daño',
    times: 1,
    func: ([, setRuntime ]) => {
      setRuntime(prev => ({
        ...prev,
        damageBonus: 5
      }))
    },
  },
  { // TODO:
    kind: 'CURSE',
    title: 'Bala envenenada',
    effect: 'El contrincante que elijas recibe 5 puntos de daño por ronda hasta que conteste bien una pregunta',
    times: -1,
    func: () => {},
  },
]
