import React from 'react'
import * as Routes from "./routes"; 
import { NavLink } from './NavLink';
const NavBar = () => {
  return (
    <div>
        <NavLink to = {Routes.HOME} label = "Home"/>
        <NavLink to = {Routes.SERVICES} label = "Services"/>
        <NavLink to = {Routes.FEEDBACK} label = "Feedback"/>
    </div>
  )
}

export default NavBar