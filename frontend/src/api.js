import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

export const fetchContribuyentes = async () => {
  const r = await api.get('/contribuyentes')
  return r.data
}

export const fetchComprobantesByRnc = async (rnc) => {
  const r = await api.get(`/contribuyentes/${rnc}/comprobantes`)
  return r.data
}

export const createContribuyente = async (payload) => {
  const r = await api.post('/contribuyentes', payload)
  return r.data
}

export const createComprobante = async (payload) => {
  const r = await api.post('/comprobantes', payload)
  return r.data
}

export default api
