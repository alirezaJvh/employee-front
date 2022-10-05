import { LockOutlined, SettingOutlined, HomeOutlined } from '@ant-design/icons';
import { Button, Form, Input, Col, Row, Typography, notification } from 'antd';
import { useAuth } from '../../context/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom'
import { signupEmployee, loginEmployee } from '../../services'
import UserDataForm, { validationMessages, defaultInputs } from './../../components/UserDataForm.jsx'
import React, { useState } from 'react'
import './SingUp.css'

function SingUp({ dispatch }) {
    const [loading, setLoading] = useState(false)
    const { Title } = Typography
    const { isAuth } = useAuth()
    const navigate = useNavigate();
    const cloneFormInputs = defaultInputs.map(row => row)

    const checkPassword = ({ getFieldValue }) => ({
        validator(_, value) {
            if(!value || getFieldValue('password') === value) return Promise.resolve()
            return Promise.reject(new Error('The two passwords that you entered do not match!'))
        }
    })

    const passwordInputs = [
        [
            {
                name: 'Password',
                icon: LockOutlined,
                rules: [{ required: true }],
                type: 'password',
            },
            {
                name: 'Confirm Password',
                icon: LockOutlined,
                dependencies: 'password',
                type: 'password',
                rules: [{ required: true }, checkPassword]
            }
        ]
    ]
    const singupFormInputs = cloneFormInputs.concat(passwordInputs)
    console.log(singupFormInputs)

    const handleSubmit = async ({ firstName, lastName, username, password, email, address }) => {
        try {
            setLoading(loading => !loading)
            const input = { firstName, lastName, username, password, email, address }
            await signupEmployee(input)
            const payload = await loginEmployee({username, password})
            if (payload) dispatch({ type: 'LOGIN', payload })
            navigate('/')
        } catch (e) {
            const { message } = e.data
            notification['error']({ message, placement: 'bottom'})
        } finally {
            setLoading(loading => !loading)
        }
    }

    if (isAuth) {
        return (<Navigate to={{ pathname: '/'}}/>)
    }

    return (
        <Row justify='center' 
            align='middle' 
            className='singup-wrapper'>
            <Col span={10}>
                <Row justify='center' className='pb-2'>
                    <SettingOutlined 
                        style={{fontSize: '45px'}}
                    />
                    <Title level={2}>Employee Managment</Title>
                </Row>
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={handleSubmit}
                    validateMessages={validationMessages}
                >
                    <UserDataForm formInputs={singupFormInputs}/>
                    <Row justify='center'>
                        <Col span={23}>
                            <Form.Item name='address'>
                                <Input 
                                    placeholder='Address' 
                                    prefix={<HomeOutlined />}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify='center'>
                        <Col span={12}>                    
                            <Form.Item>
                                <Button 
                                    loading={loading}
                                    type="primary" 
                                    htmlType="submit"
                                    className="login-form-button">
                                        SingUp
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>

                </Form> 
            </Col>
        </Row>
    );
}

export default SingUp