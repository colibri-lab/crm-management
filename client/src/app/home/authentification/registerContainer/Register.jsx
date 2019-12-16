import React from 'react'
import { reduxForm } from 'redux-form'
import TextField from '@material-ui/core/TextField'
import { NavLink } from 'react-router-dom'
import { Field } from 'redux-form'
import "./register.scss"


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const asyncValidate = (values /*, dispatch */) => {
    return sleep(1000).then(() => {
        // simulate server latency
        if (['foo@foo.com', 'bar@bar.com'].includes(values.email)) {
            // eslint-disable-next-line no-throw-literal
            throw { email: 'Email already Exists' }
        }
    })
}

const validate = values => {
    const errors = {}
    const requiredFields = [
        'firstName',
        'lastName',
        'email',
        'userName',
        'password',
    ]
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    })
    if (
        values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address'
    }
    return errors
}

const renderTextField = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
}) => (
        <TextField
            label={label}
            placeholder={label}
            error={touched && invalid}
            helperText={touched && error}
            {...input}
            {...custom}
        />
    )

const Login = props => {
    const { handleSubmit, pristine, reset, submitting } = props
    return (
        <div className="register-container">
            <div className="content">
                <form onSubmit={handleSubmit}>
                    <div>
                        <Field className="input-field" name="firstName" component={renderTextField} label="First Name" />
                    </div>
                    <div>
                        <Field className="input-field" name="lastName" component={renderTextField} label="Last Name" />
                    </div>
                    <div>
                        <Field className="input-field" name="email" component={renderTextField} label="Email" />
                    </div>
                    <div>
                        <Field className="input-field" name="username" component={renderTextField} label="User Name" />
                    </div>
                    <div>
                        <Field className="input-field" name="password" component={renderTextField} label="Password" type="password" />
                    </div>
                    <div />
                    <div>
                        <button type="submit" disabled={pristine || submitting}>Submit</button>
                        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
                    </div>
                </form>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/login">Login</NavLink>
            </div>
        </div>
    )
}

export default reduxForm({
    form: 'register',
    validate,
    asyncValidate
})(Login)
