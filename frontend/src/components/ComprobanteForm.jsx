import React from 'react'
import { ITBIS_RATE } from '../constants'
import PropTypes from 'prop-types'

export default function ComprobanteForm({ onSubmit, values, setters, disabled, selected }) {
  const { compNcf, compMonto, compItbis } = values
  const { setCompNcf, setCompMonto, setCompItbis } = setters

  return (
    <div>
      <h4 className="mt-6 text-sm font-medium">Añadir comprobante</h4>
      <form onSubmit={onSubmit} className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 max-w-lg">
        <input className="w-full border rounded px-2 py-1" placeholder="NCF" value={compNcf} onChange={e => setCompNcf(e.target.value)} />
        <input className="w-full border rounded px-2 py-1" placeholder="Monto" value={compMonto} onChange={e => {
          const v = e.target.value
          setCompMonto(v)
          const num = parseFloat(v.replace(/,/g, '')) || 0
          const itbis = Math.round((num * ITBIS_RATE) * 100) / 100
          setCompItbis(itbis)
        }} />
        <input className="w-full border rounded px-2 py-1 bg-gray-50" placeholder="ITBIS (18%)" value={typeof compItbis === 'number' ? compItbis.toFixed(2) : compItbis} readOnly />
        {selected ? (
          <div className="w-full text-sm text-gray-700 py-2">Creando comprobante para: <strong>{selected.nombre}</strong> <span className="text-gray-500">({selected.rncCedula})</span></div>
        ) : (
          <div className="w-full text-sm text-red-600 py-2">Seleccione un contribuyente para habilitar el formulario</div>
        )}
        <div className="col-span-1 md:col-span-2">
          <button className={`rounded px-3 py-1 text-white ${!disabled ? 'bg-green-600' : 'bg-gray-400 cursor-not-allowed'}`} type="submit" disabled={disabled}>Crear comprobante</button>
        </div>
      </form>
    </div>
  )
}

ComprobanteForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  values: PropTypes.shape({
    compNcf: PropTypes.string,
    compMonto: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    compItbis: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }).isRequired,
  setters: PropTypes.shape({
    setCompNcf: PropTypes.func,
    setCompMonto: PropTypes.func,
    setCompItbis: PropTypes.func,
  }).isRequired,
  disabled: PropTypes.bool,
  selected: PropTypes.shape({
    rncCedula: PropTypes.string,
    nombre: PropTypes.string
  })
}
