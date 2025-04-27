import React from 'react'
import { useAuth } from '../../../../hooks'

export function Welcome() {
    const {user} = useAuth();
    

  return (
    <div>
      <h2>Bienvenido(a): <i>{user.usu_nombres} {user.usu_primer_apellido}</i></h2>
    </div>
  )
}
