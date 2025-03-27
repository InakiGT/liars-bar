import { useEffect, useRef } from "react";

function Modal({ rt: [ runtime, setRuntime ] }) {
  const ref = useRef()

  useEffect(() => {
    if ( runtime.bonusInfo.title !== '' ) {
      ref.current.showModal()
    }
  }, [ runtime.bonusInfo.title ])

  const close = () => {
    ref.current.close()

    setRuntime(prev => ({
      ...prev,
      bonusInfo: { title: '', effect: '' }
    }))
  }
  return (
    <dialog className="modal" ref={ ref }>
      <h3>{ runtime.bonusInfo.title }</h3>
      <p>{ runtime.bonusInfo.effect }</p>

      <button className="btn" onClick={ close }>Cerrar</button>
    </dialog>
  )
}

export default Modal
