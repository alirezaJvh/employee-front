import { LockOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Form, Input, Col, Row, Typography } from 'antd';
import React from 'react'
import PropTypes from 'prop-types'
import './Login.css'
import { loginEmployee } from '../../services'
function Login({ dispatch }) {
    const { Title } = Typography

    const handleSubmit = async ({username, password}) => {
        try {
            const payload = await loginEmployee({
                username,
                password,
            })
            if (payload.token) dispatch({ type: 'LOGIN', payload })
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <Row justify='center' 
            align='middle' 
            className='login-wrapper'>
            <Col span={6}>
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
                            type="primary" 
                            htmlType="submit"
                            className="login-form-button">
                                Log in
                        </Button>
                        Or <span className='register'>register now!</span>
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


