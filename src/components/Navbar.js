import React from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => (
  <nav className="navbar navbar-dark navbar-expand-lg">
    <div className="navbar-brand">Note App</div>
    <NavLink exact to='/'>Главная</NavLink>
    <NavLink exact to='/note'>Редкатировать заметку</NavLink>
  </nav>
);
