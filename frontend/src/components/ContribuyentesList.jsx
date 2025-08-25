import React from 'react'
import PropTypes from 'prop-types'

export default function ContribuyentesList({ contribuyentes, onSelect }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Contribuyentes</h3>
      <ul className="space-y-2">
        {contribuyentes.map(c => (
          <li key={c.rncCedula}>
            <button onClick={() => onSelect(c.rncCedula)} className="text-left w-full px-3 py-2 rounded hover:bg-gray-50">{c.nombre} <span className="text-sm text-gray-500">({c.rncCedula})</span></button>
          </li>
        ))}
      </ul>
    </div>
  )
}

ContribuyentesList.propTypes = {
  contribuyentes: PropTypes.arrayOf(PropTypes.shape({
    rncCedula: PropTypes.string,
    nombre: PropTypes.string
  })),
  onSelect: PropTypes.func.isRequired
}
