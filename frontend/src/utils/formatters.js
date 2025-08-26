export const formatCurrency = (value) => {
  const num = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value
  if (isNaN(num) || num === null) return ''
  return new Intl.NumberFormat('es-DO', { style: 'currency', currency: 'DOP' }).format(num)
}

export default formatCurrency
