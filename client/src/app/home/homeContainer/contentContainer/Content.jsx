import React from 'react'
import { NavLink } from 'react-router-dom'

function Content({ classes }) {
    return (
        <div>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <NavLink to="/login">Login</NavLink>
            </main>
        </div>
    )
}

export default Content
