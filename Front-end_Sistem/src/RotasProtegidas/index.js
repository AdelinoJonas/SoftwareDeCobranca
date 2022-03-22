import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const RotasProtegidas = ({ children }) => {

  const token = window.localStorage.getItem('token');

  return (
    <Route
      render={() => token ? (children) : (<Redirect to='/' />)}
    />
  )
}

export default RotasProtegidas;