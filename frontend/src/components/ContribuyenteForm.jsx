import React from 'react'
import PropTypes from 'prop-types'

export default function ContribuyenteForm({ onSubmit, values, setters, error }) {
  const { newRnc, newNombre, newTipo, newEstatus } = values
  const { setNewRnc, setNewNombre, setNewTipo, setNewEstatus } = setters
  return (
    <div>
      <h4 className="mt-4 text-sm font-medium">Añadir contribuyente</h4>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={onSubmit} className="mt-2 space-y-2">
        <input className="w-full border rounded px-2 py-1" placeholder="RNC / Cédula" value={newRnc} onChange={e => setNewRnc(e.target.value)} />
        <input className="w-full border rounded px-2 py-1" placeholder="Nombre" value={newNombre} onChange={e => setNewNombre(e.target.value)} />
        <select
          className="w-full border rounded px-2 py-1"
          value={newTipo}
          onChange={e => setNewTipo(e.target.value)}
        >
          <option value="">Selecciona el tipo</option>
          <option value="activo">PERSONA JURIDICA</option>
          <option value="inactivo">PERSONA FISICA</option>
        </select>
        <select
          className="w-full border rounded px-2 py-1"
          value={newEstatus}
          onChange={e => setNewEstatus(e.target.value)}
        >
          <option value="">Selecciona estatus</option>
          <option value="activo">activo</option>
          <option value="inactivo">inactivo</option>
        </select>
        <button className="w-full bg-blue-600 text-white rounded py-1" type="submit">Crear</button>
      </form>
    </div>
  )
}

ContribuyenteForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  values: PropTypes.shape({
    newRnc: PropTypes.string,
    newNombre: PropTypes.string,
    newTipo: PropTypes.string,
    newEstatus: PropTypes.string,
  }).isRequired,
  setters: PropTypes.shape({
    setNewRnc: PropTypes.func,
    setNewNombre: PropTypes.func,
    setNewTipo: PropTypes.func,
    setNewEstatus: PropTypes.func,
  }).isRequired,
  error: PropTypes.string
}
