import React from 'react'
import notFound from './../../../assets/images/error.jpg'
import { NavLink } from 'react-router-dom'
import "./notFound.scss"

function NotFound() {
    return (
        <div className="not-found-container">
            <img src={notFound} alt="Not found" />
            <NavLink to="/">Come back</NavLink>
        </div>
    )
}

export default NotFound
