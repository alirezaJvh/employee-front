import React, { useState } from 'react'
import { useAuth } from './../context/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom'
import { signupEmployee, loginEmployee } from './../services'
function SingUp({ dispatch }) {
    const [
        {
            username,
            email,
            password,
            firstName,
            lastName,
            // addresses
        },
        setForm
    ] = useState({
        username: 'sina',
        email: 'sina@gmail.com',
        password: 'sina',
        firstName: 'ssss',
        lastName: 'jjjj',
        // addresses: ''
    })
    const { isAuth } = useAuth()
    const navigate = useNavigate();

    const inputHandler = (e) => {
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
        setForm(form => ({...form, [name]: value }))
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const input = { firstName, lastName, username, password, email }
            await signupEmployee(input)
            const payload = await loginEmployee({username, password})
            if (payload) dispatch({ type: 'LOGIN', payload })
            navigate('/')
        } catch (e) {
            console.log('error in signup')
            console.log(e.message)
        }
    }

    if (isAuth) {
        return (<Navigate to={{ pathname: '/'}}/>)
    }

    return(
        <div className="login-wrapper">
            <h1>Please SingUp</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input 
                        name='username'
                        type="text" 
                        value={username} 
                        onChange={inputHandler}
                    />
                </label>
                <label>
                    <p>Password</p>
                    <input 
                        name="password"
                        type="password" 
                        value={password}
                        onChange={inputHandler}
                    />
                </label>
                <label>
                    <p>Email</p>
                    <input 
                        name="email"
                        value={email}
                        onChange={inputHandler}
                    />
                </label>
                <label>
                    <p>FirstName</p>
                    <input 
                        name='firstName'
                        value={firstName}
                        onChange={inputHandler}
                    />
                </label>
                <label>
                    <p>LastName</p>
                    <input 
                        name="lastName"
                        value={lastName}
                        onChange={inputHandler}
                    />
                </label>
                {/* <label>
                    <p>Addresses</p>
                    <input 
                        name='addresses'
                        value={addresses}
                        onChange={inputHandler}
                    />
                </label> */}
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default SingUp