import React, { useState, useEffect } from 'react'
import { fetchContribuyentes, fetchComprobantesByRnc } from './api'

import ContribuyentesList from './components/ContribuyentesList'
import ComprobantesList from './components/ComprobantesList'

function AppContent() {
  const [contribuyentes, setContribuyentes] = useState([])
  const [selected, setSelected] = useState(null)
  const [comprobantes, setComprobantes] = useState([])
  const [totalItbis, setTotalItbis] = useState(0)



  useEffect(() => {
    refreshContribuyentes()
  }, [])

  function refreshContribuyentes() {
    fetchContribuyentes()
      .then((r) => setContribuyentes(r))
      .catch(() => {})
  }

  function selectContrib(rnc) {
    fetchComprobantesByRnc(rnc)
      .then((r) => {
        setSelected(r.contribuyente)
        setComprobantes(r.comprobantes)
        setTotalItbis(r.totalItbis)
      })
      .catch(() => showNotification('Error al obtener comprobantes', 'error'))
  }


  return (
    <div className="grid grid-cols-4 gap-6">
      <div className="col-span-1 bg-white rounded shadow p-5">
        <div className="flex items-center justify-between">
          <ContribuyentesList contribuyentes={contribuyentes} onSelect={selectContrib} />
        </div>
  
      </div>

      <div className="col-span-3">
        <div className="bg-white rounded shadow p-4">
          <h3 className="text-lg font-semibold mb-3">Detalle</h3>

          {selected ? (
            <div>
              <h4 className="text-md font-medium">
                {selected.nombre}{' '}
                <span className="text-sm text-gray-500">- {selected.rncCedula}</span>
              </h4>
              <p className="text-sm text-gray-600">
                Tipo: {selected.tipo} · Estatus: <span className={
                  selected.estatus?.toLowerCase() === 'activo' ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'
                }>
                  {selected.estatus}
                </span>
              </p>
              <ComprobantesList comprobantes={comprobantes} totalItbis={totalItbis} />
            </div>
          ) : (
            <p className="text-sm text-gray-600">Selecciona un contribuyente para ver sus comprobantes</p>
          )}

  
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
      <div className="container">
        <AppContent />
      </div>
  )
}
