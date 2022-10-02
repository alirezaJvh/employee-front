import React, { useState } from 'react'
import { useAuth } from './../context/AuthContext'
import { Navigate } from 'react-router-dom'

function SingUp() {
    const [
        {
            username,
            email,
            password,
            firstName,
            lastName,
            addresses
        },
        setForm
    ] = useState({
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        addresses: ''
    })

    const { isAuth } = useAuth()

    if (isAuth) {
        return (<Navigate to={{ pathname: '/'}}/>)
    }

    return(
        <div className="login-wrapper">
            <h1>Please SingUp</h1>
            <form >
                <label>
                    <p>Username</p>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={e => setUsername(e.target.value)}
                    />
                </label>
                <label>
                    <p>Password</p>
                    <input 
                        type="password" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </label>
                <label>
                    <p>Addresses</p>
                    <input 
                        type="password" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    <p>FirstName</p>
                    <input 
                        type="password" 
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                </label>
                <label>
                    <p>LastName</p>
                    <input 
                        type="password" 
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                </label>
                <label>
                    <p>Addresses</p>
                    <input 
                        type="password" 
                        value={addresses}
                        onChange={e => setAddresses(e.target.value)}
                    />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default SingUp