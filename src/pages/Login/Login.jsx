import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { loginEmployee } from '../../services'
function Login({ dispatch }) {
    // const [username, setUsername] = useState()
    // const [password, setPassword] = useState()
    // const [, forceUpdate] = useState({})
    const [form] = Form.useForm()

    return (
        <Form form={form} name='login'>
            <Form.Item 
                name='username'
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!'
                    }
                ]}
            >

            </Form.Item>
        </Form>
    )

    // const handleSubmit = async e => {
    //     try {
    //         e.preventDefault()
    //         const payload = await loginEmployee({
    //             username,
    //             password,
    //         })
    //         if (payload.token) dispatch({ type: 'LOGIN', payload })
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    // return(
    //     <div className="login-wrapper">
    //         <h1>Please Log In</h1>
    //         <form onSubmit={handleSubmit}>
    //             <label>
    //                 <p>Username</p>
    //                 <input type="text" onChange={e => setUsername(e.target.value)}/>
    //             </label>
    //             <label>
    //                 <p>Password</p>
    //                 <input type="password" onChange={e => setPassword(e.target.value)}/>
    //             </label>
    //             <div>
    //                 <button type="submit">Submit</button>
    //             </div>
    //         </form>
    //     </div>
    // )
}

Login.propTypes = {
    dispatch: PropTypes.func.isRequired,
}

export default Login