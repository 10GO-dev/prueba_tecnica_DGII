import React from 'react'
import PropTypes from 'prop-types'

export default function ComprobantesList({ comprobantes, totalItbis }) {
  return (
    <div>
      <h5 className="mt-4 font-medium">Comprobantes</h5>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600"><th className="pb-2">NCF</th><th className="pb-2">Monto</th><th className="pb-2">ITBIS</th></tr>
          </thead>
          <tbody>
            {comprobantes.map(cm => (
              <tr key={cm.ncf} className="border-t"><td className="py-2">{cm.ncf}</td><td>RD${cm.monto}</td><td>RD${cm.itbis18}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3">Total ITBIS: <b>{totalItbis}</b></p>
    </div>
  )
}

ComprobantesList.propTypes = {
  comprobantes: PropTypes.arrayOf(PropTypes.shape({
    ncf: PropTypes.string,
    monto: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    itbis18: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })),
  totalItbis: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
