import React from 'react'
import Header from '../header/Header'
import OpcionLayout from './OpcionLayout'

const IndexLayout = () => {
  return (
    <div style={{height : "100%"}}>
      <Header back={false} text={"Planillas"} user={"Usuario"} />
      <OpcionLayout/>
    </div>
  )
}

export default IndexLayout