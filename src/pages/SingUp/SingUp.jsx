import { UserOutlined, LockOutlined, MailOutlined, SettingOutlined, HomeOutlined } from '@ant-design/icons';
// <MailOutlined />
import { Button, Form, Input, Col, Row, Typography } from 'antd';
import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom'
import './SingUp.css'
import { signupEmployee, loginEmployee } from '../../services'

function SingUp({ dispatch }) {
    const [loading, setLoading] = useState(false)
    const { Title } = Typography
    const { isAuth } = useAuth()
    const navigate = useNavigate();

    const checkPassword = ({ getFieldValue }) => ({
        validator(_, value) {
            if(!value || getFieldValue('password') === value) return Promise.resolve()
            return Promise.reject(new Error('The two passwords that you entered do not match!'))
        }
    })

    const formInpus = [
        [
            {
                name: 'Username',
                icon: UserOutlined,
                rules: [{ required: true }]
            },
            {
                name: 'Email',
                icon: MailOutlined,
                rules: [{ required: true }, { type: 'email' }]
            },
        ], 
        [
            {
                name: 'First Name', 
                icon: UserOutlined,
                rules: [{ required: true }]
            },
            {
                name: 'Last Name', 
                icon: UserOutlined,
                rules: [{ required: true }]
            }
        ], 
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
        ],
    ]
    const validationMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
        }
    }

    const handleSubmit = async ({ firstName, lastName, username, password, email, address }) => {
        try {
            setLoading(loading => !loading)
            const input = { firstName, lastName, username, password, email, address }
            await signupEmployee(input)
            const payload = await loginEmployee({username, password})
            if (payload) dispatch({ type: 'LOGIN', payload })
            navigate('/')
        } catch (e) {
            console.log(e.message)
        } finally {
            setLoading(loading => !loading)
        }
    }

    const createName = (col) => {
        const str = col.replace(' ', '')
        return str.charAt(0).toLowerCase() + str.slice(1)
    }
    
    const createCol = ({name, rules, type, icon}) => {
        return (
            <Col 
                span={11} 
                key={name}>
                <Form.Item
                    name={createName(name)}
                    rules={rules}
                >
                    <Input 
                        placeholder={name} 
                        type={type ?? 'text'}
                        prefix={React.createElement(icon)} 
                    />
                </Form.Item>
            </Col>
        )
    }
    const createRow = () => {
        const rowJxs = formInpus.map((row, rowIdx) => {
            return (
                <Row 
                    key={`row-${rowIdx}`} 
                    justify='space-around'
                >
                    {row.map(col => createCol(col))}
                </Row>
            )
        })
        return rowJxs
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

                    {createRow().map(row => row)}

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