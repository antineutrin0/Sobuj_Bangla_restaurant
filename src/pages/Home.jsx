import React from 'react'
import Header from '../components/header'
import Body1 from '../components/Body1'
import FoodCard from './Menu'
import { Outlet } from 'react-router-dom'

function Home() { 
  return (
    <>
        <Outlet></Outlet>
    </>
  )
}

export default Home