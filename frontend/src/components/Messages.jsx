import React from 'react'
import PropTypes from 'prop-types'

export default function Messages({ message, type }) {
  if(!message) return null;
  return (
    <div>
      {type=="error" && <div className="text-red-600 mb-2">{message}</div>}
      {type=="message" && <div className="text-green-600 mb-2">{message}</div>}
    </div>
  )
}

Messages.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string
}
