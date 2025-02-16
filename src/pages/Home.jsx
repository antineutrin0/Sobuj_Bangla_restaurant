import React from 'react'
import { Outlet } from 'react-router-dom'

function Home() { 
  return (
    <>
      <Outlet></Outlet>
    </>
  )
}

export default Home