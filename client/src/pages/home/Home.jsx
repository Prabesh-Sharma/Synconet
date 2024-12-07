import React from 'react'
import Navigation from './components/Navigation'
import { Outlet } from 'react-router-dom'
import HamburgerMenu from './components/HamburgerMenu'

const Home = () => {
  return (
    <>
      {/*sidebar navigation for lg screens*/}
      <div className="hidden md:block">
        <Navigation />
      </div>

      {/*hamburger menu for md and sm screens*/}
      <div className="block md:hidden">
        <HamburgerMenu />
      </div>

      {/*outlet for child routes dashboard,events,analytics and network*/}
      <Outlet />
    </>
  )
}

export default Home
