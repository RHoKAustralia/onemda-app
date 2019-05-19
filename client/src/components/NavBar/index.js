import React from 'react'
import * as Routes from "./routes";
import { NavLink } from './NavLink';
import './styles.scss'


const NavBar = () => {
  return (
    <div className="navbar">
        <NavLink to = {Routes.HOME} label = "Home"/>
        <NavLink to = {Routes.SERVICES} label = "Activities"/>
        <NavLink to = {Routes.FEEDBACK} label = "Feedback"/>
        <NavLink to = {Routes.ADMIN} label = "Admin"/>
    </div>
  )
}

export default NavBar
