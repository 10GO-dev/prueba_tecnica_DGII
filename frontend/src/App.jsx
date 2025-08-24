import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [contribuyentes, setContribuyentes] = useState([])
  const [selected, setSelected] = useState(null)
  const [comprobantes, setComprobantes] = useState([])
  const [totalItbis, setTotalItbis] = useState(0)

  useEffect(() => {
    axios.get('/api/contribuyentes').then(r => setContribuyentes(r.data)).catch(console.error)
  }, [])

  function selectContrib(rnc) {
    axios.get(`/api/contribuyentes/${rnc}/comprobantes`)
      .then(r => {
        setSelected(r.data.contribuyente)
        setComprobantes(r.data.comprobantes)
        setTotalItbis(r.data.totalItbis)
      })
      .catch(err => console.error(err))
  }

  return (
    <div style={{ display: 'flex', gap: 20, padding: 20 }}>
      <div style={{ width: 300 }}>
        <h3>Contribuyentes</h3>
        <ul>
          {contribuyentes.map(c => (
            <li key={c.rncCedula}>
              <button onClick={() => selectContrib(c.rncCedula)}>{c.nombre} ({c.rncCedula})</button>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ flex: 1 }}>
        <h3>Detalle</h3>
        {selected ? (
          <div>
            <h4>{selected.nombre} - {selected.rncCedula}</h4>
            <p>Tipo: {selected.tipo} - Estatus: {selected.estatus}</p>
            <h5>Comprobantes</h5>
            <table border="1" cellPadding="6">
              <thead>
                <tr><th>NCF</th><th>Monto</th><th>ITBIS</th></tr>
              </thead>
              <tbody>
                {comprobantes.map(cm => (
                  <tr key={cm.ncf}><td>{cm.ncf}</td><td>{cm.monto}</td><td>{cm.itbis18}</td></tr>
                ))}
              </tbody>
            </table>
            <p>Total ITBIS: <b>{totalItbis}</b></p>
          </div>
        ) : (
          <p>Selecciona un contribuyente</p>
        )}
      </div>
    </div>
  )
}

export default App
