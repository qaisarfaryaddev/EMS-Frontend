import React from 'react'
import { useEffect } from 'react'
import Navbar from '../Components/Navbar'
import EmployeStats from '../Components/EmployeStats'
import EmployeListing from '../Components/EmployeListing'

const Home = () => {
  


  return (
    <div>
      <Navbar />
      <EmployeStats />
      <EmployeListing />
    </div>
  )
}

export default Home
