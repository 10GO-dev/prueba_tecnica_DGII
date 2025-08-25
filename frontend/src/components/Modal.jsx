import React from 'react'
import PropTypes from 'prop-types'

export default function Modal({ title, children, onClose }) {
  const dialogRef = React.useRef(null)
  const onCloseRef = React.useRef(onClose)

  React.useEffect(() => { onCloseRef.current = onClose }, [onClose])
  React.useEffect(() => {
    const dlg = dialogRef.current
    if (!dlg) return
    // open with showModal if supported, run once on mount
    if (typeof dlg.showModal === 'function' && !dlg.open) {
      dlg.showModal()
      // focus the first input/select/textarea when modal opens to keep typing in the form
      setTimeout(() => {
        const first = dlg.querySelector('input, select, textarea')
        if (first?.focus) first.focus()
      }, 0)
    }

  function onKey(e) { if (e.key === 'Escape') onCloseRef.current?.() }
    window.addEventListener('keydown', onKey)
    return () => {
      if (dlg?.open && typeof dlg.close === 'function') {
        dlg.close()
      }
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <dialog ref={dialogRef} className="p-0 max-w-lg w-full rounded" aria-label={title}>
      <div className="bg-white rounded shadow-lg z-10 w-full p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button className="text-gray-600" onClick={() => { if (dialogRef.current?.open && typeof dialogRef.current.close === 'function') { dialogRef.current.close() } ; onClose() }}>Cerrar</button>
        </div>
        <div>
          {children}
        </div>
      </div>
    </dialog>
  )
}

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired
}
