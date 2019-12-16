import React from 'react'
import Login from './Login'
import { connect } from 'react-redux'
import { setLoginParams } from '../duck/operations'
import { Redirect } from 'react-router-dom'

function LoginContainer(props) {
    const onSubmit = formData => {
        console.log(props)
        const { userName: u, password: p } = formData
        props.setLoginParams(u, p)
    }
    if (props.isAuth) return <Redirect to="/" />
    return (
        <div>
            <Login {...props} onSubmit={onSubmit} />
        </div>
    )
}

const mapStateToProps = state => ({
    isAuth: state.loginPage.isAuth
})

export default connect(mapStateToProps, { setLoginParams })(LoginContainer)
