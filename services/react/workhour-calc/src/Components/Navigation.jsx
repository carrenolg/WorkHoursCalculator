import React from "react";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <div className="box">
      <nav className="menu">
        <ul>
          <li>
            <NavLink to="/">NFC</NavLink>
          </li>
          <li>
            <NavLink to="/about">Festivos</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contacto</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
