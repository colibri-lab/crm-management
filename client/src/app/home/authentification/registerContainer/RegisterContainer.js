import React from 'react'
import Register from './Register'
import { connect } from 'react-redux'
import { setRegisterParams } from '../duck/operations'

function RegisterContainer(props) {
    const onSubmit = formData => {
        console.log(formData)
        props.setRegisterParams(formData)
    }
    return (
        <div>
            <Register {...props} onSubmit={onSubmit} />
        </div>
    )
}

const mapStateToProps = state => ({
})

export default connect(mapStateToProps, { setRegisterParams })(RegisterContainer)
