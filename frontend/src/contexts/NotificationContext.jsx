import React, { createContext, useState, useContext, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import Messages from '../components/Messages'

const NotificationContext = createContext(null)

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState({ message: '', type: null })

  const showNotification = useCallback((message, type = 'message', timeout = 3000) => {
    if (!message) return
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: '', type: null }), timeout)
  }, [])

  const clearNotification = useCallback(() => setNotification({ message: '', type: null }), [])

  const value = useMemo(() => ({ notification, showNotification, clearNotification }), [notification, showNotification, clearNotification])

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

NotificationProvider.propTypes = {
  children: PropTypes.node
}

export function useNotification() {
  const ctx = useContext(NotificationContext)
  if (!ctx) throw new Error('useNotification must be used within NotificationProvider')
  return ctx
}

export function Notification() {
  const { notification } = useNotification()
  return <Messages message={notification.message} type={notification.type} />
}
