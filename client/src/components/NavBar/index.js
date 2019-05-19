import React from 'react'
import * as Routes from "./routes";
import { NavLink } from './NavLink';
import './styles.scss'
import { getUserRoles } from '../../utils/TokenDecoder'

const NavBar = () => {
  const token = localStorage.getItem('token')
  const roles = getUserRoles(token ? token : "")
  const actualRole = roles ? roles : ""
  const isAdmin = actualRole.includes('admin')
  return (
    <div className="navbar">
        <NavLink to = {Routes.HOME} label = "Home"/>
        <NavLink to = {Routes.SERVICES} label = "Services"/>
        <NavLink to = {Routes.FEEDBACK} label = "Feedback"/>
       {isAdmin && <NavLink to = {Routes.ADMIN} label = "Admin"/>}
    </div>
  )
}

export default NavBar
