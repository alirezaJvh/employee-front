import { LockOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Form, Input, Col, Row, Typography, notification } from 'antd';
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';
import { loginEmployee } from '../../services'
import './Login.css'
function Login({ dispatch }) {
    const [loading, setLoading] = useState(false)
    const navigage = useNavigate()
    const { Title } = Typography

    const handleSubmit = async ({username, password}) => {
        try {
            setLoading(loading => !loading)
            const payload = await loginEmployee({
                username,
                password,
            })
            if (payload.token) dispatch({ type: 'LOGIN', payload })
            notification['success']({ 
                message: 'Welcome ;)', 
                placement: 'bottom' })
        } catch (e) {
            const { message } = e.data
            notification['error']({ message, placement: 'bottom' })
        } finally {
            setLoading(loading => !loading)
        }
    }
    return (
        <Row justify='center' 
            align='middle' 
            className='login-wrapper'>
            <Col xs={{span: 20}} sm={{span: 14}} md={{span: 10}} lg={{span: 8}} xl={{span:6}} xxl={{span: 5}}>
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
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input 
                            placeholder="Username" 
                            prefix={<UserOutlined className="site-form-item-icon" />} 
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input
                            type="password"
                            placeholder="Password"
                            prefix={<LockOutlined className="site-form-item-icon" />}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button 
                            loading={loading}
                            type="primary" 
                            htmlType="submit"
                            className="login-form-button">
                                Log in
                        </Button>
                        Or
                        <Button 
                            type='link' 
                            style={{paddingLeft: 5}} 
                            onClick={() => navigage('/signup')}>
                                register now!
                        </Button>
                    </Form.Item>
                </Form> 
            </Col>
        </Row>
    );
}

Login.propTypes = {
    dispatch: PropTypes.func.isRequired,
}

export default Login


