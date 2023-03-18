import React from 'react'
import { Link } from "react-router-dom";
import "./menuLayout.css";

const MenuOpcion = ({ text, path, img }) => {


  return (
    <>
      <Link className="rol" to={`${path}`}>
        <span className="rol-circle">{img}</span>
        <label htmlFor="">{text}</label>
      </Link>
    </>
  )
}

export default MenuOpcion