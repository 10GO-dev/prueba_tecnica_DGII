import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function App() {
  const [contribuyentes, setContribuyentes] = useState([])
  const [selected, setSelected] = useState(null)
  const [comprobantes, setComprobantes] = useState([])
  const [totalItbis, setTotalItbis] = useState(0)

  const [newRnc, setNewRnc] = useState('')
  const [newNombre, setNewNombre] = useState('')
  const [newTipo, setNewTipo] = useState('')
  const [newEstatus, setNewEstatus] = useState('')

  const [compNcf, setCompNcf] = useState('')
  const [compMonto, setCompMonto] = useState('')
  const [compItbis, setCompItbis] = useState('')

  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => { refreshContribuyentes() }, [])

  function refreshContribuyentes() {
    axios.get('/api/contribuyentes')
      .then(r => setContribuyentes(r.data))
      .catch(() => {})
  }

  function selectContrib(rnc) {
    axios.get(`/api/contribuyentes/${rnc}/comprobantes`)
      .then(r => {
        setSelected(r.data.contribuyente)
        setComprobantes(r.data.comprobantes)
        setTotalItbis(r.data.totalItbis)
        setError(null)
        setMessage(null)
      })
      .catch(() => setError('Error al obtener comprobantes'))
  }

  async function createContrib(e) {
    e.preventDefault()
    setMessage(null); setError(null)
    try {
      const payload = { rncCedula: newRnc, nombre: newNombre, tipo: newTipo, estatus: newEstatus }
      await axios.post('/api/contribuyentes', payload)
      setMessage('Contribuyente creado')
      setNewRnc(''); setNewNombre(''); setNewTipo(''); setNewEstatus('')
      refreshContribuyentes()
    } catch (err) {
      setError(err?.response?.data?.message || 'Error creando contribuyente')
    }
  }

  async function createComprobante(e) {
    e.preventDefault()
    setMessage(null); setError(null)
    try {
      const targetRnc = selected?.rncCedula
      if (!targetRnc) { setError('Debe seleccionar un contribuyente antes de crear un comprobante'); return }
      const payload = { ncf: compNcf, monto: parseFloat(compMonto) || 0, itbis18: parseFloat(compItbis) || 0, rncCedula: targetRnc }
      await axios.post('/api/comprobantes', payload)
      setMessage('Comprobante creado')
      setCompNcf(''); setCompMonto(''); setCompItbis('')
      if (selected && selected.rncCedula === targetRnc) selectContrib(targetRnc)
      else refreshContribuyentes()
    } catch (err) {
      setError(err?.response?.data?.message || 'Error creando comprobante')
    }
  }

  return (
    <div className="container">
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-1 bg-white rounded shadow p-4">
          <h3 className="text-lg font-semibold mb-3">Contribuyentes</h3>
          <ul className="space-y-2">
            {contribuyentes.map(c => (
              <li key={c.rncCedula}>
                <button onClick={() => selectContrib(c.rncCedula)} className="text-left w-full px-3 py-2 rounded hover:bg-gray-50">{c.nombre} <span className="text-sm text-gray-500">({c.rncCedula})</span></button>
              </li>
            ))}
          </ul>

          <h4 className="mt-4 text-sm font-medium">Añadir contribuyente</h4>
          <form onSubmit={createContrib} className="mt-2 space-y-2">
            <input className="w-full border rounded px-2 py-1" placeholder="RNC / Cédula" value={newRnc} onChange={e => setNewRnc(e.target.value)} />
            <input className="w-full border rounded px-2 py-1" placeholder="Nombre" value={newNombre} onChange={e => setNewNombre(e.target.value)} />
            <input className="w-full border rounded px-2 py-1" placeholder="Tipo" value={newTipo} onChange={e => setNewTipo(e.target.value)} />
            <input className="w-full border rounded px-2 py-1" placeholder="Estatus" value={newEstatus} onChange={e => setNewEstatus(e.target.value)} />
            <button className="w-full bg-blue-600 text-white rounded py-1" type="submit">Crear</button>
          </form>
        </div>

        <div className="col-span-3">
          <div className="bg-white rounded shadow p-4">
            <h3 className="text-lg font-semibold mb-3">Detalle</h3>
            {error && <div className="text-red-600 mb-2">{error}</div>}
            {message && <div className="text-green-600 mb-2">{message}</div>}

            {selected ? (
              <div>
                <h4 className="text-md font-medium">{selected.nombre} <span className="text-sm text-gray-500">- {selected.rncCedula}</span></h4>
                <p className="text-sm text-gray-600">Tipo: {selected.tipo} · Estatus: {selected.estatus}</p>
                <h5 className="mt-4 font-medium">Comprobantes</h5>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-600"><th className="pb-2">NCF</th><th className="pb-2">Monto</th><th className="pb-2">ITBIS</th></tr>
                    </thead>
                    <tbody>
                      {comprobantes.map(cm => (
                        <tr key={cm.ncf} className="border-t"><td className="py-2">{cm.ncf}</td><td>{cm.monto}</td><td>{cm.itbis18}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-3">Total ITBIS: <b>{totalItbis}</b></p>
              </div>
            ) : (
              <p className="text-sm text-gray-600">Selecciona un contribuyente para ver sus comprobantes</p>
            )}

            <h4 className="mt-6 text-sm font-medium">Añadir comprobante</h4>
            <form onSubmit={createComprobante} className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 max-w-lg">
              <input className="w-full border rounded px-2 py-1" placeholder="NCF" value={compNcf} onChange={e => setCompNcf(e.target.value)} />
              <input className="w-full border rounded px-2 py-1" placeholder="Monto" value={compMonto} onChange={e => {
                const v = e.target.value
                setCompMonto(v)
                const num = parseFloat(v) || 0
                // calculate 18% ITBIS and round to 2 decimals
                setCompItbis((Math.round((num * 0.18) * 100) / 100).toFixed(2))
              }} />
              <input className="w-full border rounded px-2 py-1 bg-gray-50" placeholder="ITBIS (18%)" value={compItbis} readOnly />
              {/* show selected contrib info or hint */}
              {selected ? (
                <div className="w-full text-sm text-gray-700 py-2">Creando comprobante para: <strong>{selected.nombre}</strong> <span className="text-gray-500">({selected.rncCedula})</span></div>
              ) : (
                <div className="w-full text-sm text-red-600 py-2">Seleccione un contribuyente para habilitar el formulario</div>
              )}
              <div className="col-span-1 md:col-span-2">
                <button className={`rounded px-3 py-1 text-white ${selected ? 'bg-green-600' : 'bg-gray-400 cursor-not-allowed'}`} type="submit" disabled={!selected}>Crear comprobante</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
