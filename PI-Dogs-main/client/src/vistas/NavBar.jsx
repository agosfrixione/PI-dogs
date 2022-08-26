import React from "react";
import { Link } from "react-router-dom";
import './NavBar.css'
// import logoPerro from '../images/logoPerro.png'

export default function NavBar (){
    return (
        <nav className="nav">
          {/* <img className="img" src={logoPerro} alt="not found"/> */}
          <ul className="list">
              <li className="item">
                  <Link className="link" to={'/dogs'}>Home</Link>
              </li>
              <li className="item">
                  <Link className="link" to={'/create'}>Add new breed</Link>
              </li>
          </ul>
        </nav>
      )
}