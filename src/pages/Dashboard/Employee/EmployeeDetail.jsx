import { Card, Row, Col, Avatar, List, Comment, Tooltip, Form, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {useParams} from 'react-router-dom';
import { getEmployeeById, getEmployeesComment, addComment } from './../../../services'
import { useAuth } from '../../../context/AuthContext';
import React, { useEffect, useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import './EmployeeDetail.css'

function EmployeeDetail() {
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false)
    const { headers, employee } = useAuth()
    const { id } = useParams()
    const [user, setUser] = useState({
        username: '',
        firstName: '',
        lastName: '',
        role: '',
        address: '',
    })
    useEffect(() => {
        Promise.all([
            getEmployeeById({ headers, id }),
            getEmployeesComment({ headers, id })
        ]).then(([user, comments]) => {
            setUser(user.data)
            setComments(comments.data)
        }).catch(e => {
            console.log(e)
        }) 
    }, [])

    const onSubmit = async({ text }) => {
        try {
            setLoading(true)
            const { data } = await addComment({
                id,
                text,
                headers,
                autherId: employee.id
            })
            setLoading(false)
            setComments(prev => [...prev, data])
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Row>
            <Col span={9}>
                <Card title='Profile'>
                    <div className='avatar-container'>
                        <Avatar 

                            size={100} 
                            icon={<UserOutlined />}>
                        </Avatar>
                    </div>
                    <Row 
                        className='details-container' 
                        justify='space-center'
                    >
                        <Col span={12} className='mt'>
                            <div className='title-info'>Username</div>
                            <div className='detail-info'>{user.username}</div>
                        </Col>
                        <Col span={12} className='mt'>
                            <div className='title-info'>Email</div>
                            <div className='detail-info'>{user.email}</div>
                        </Col>
                        <Col span={12} className='mt'>
                            <div className='title-info'>First Name</div>
                            <div className='detail-info'>{user.firstName}</div>
                        </Col>
                        <Col span={12} className='mt'>
                            <div className='title-info'>Last Name</div>
                            <div className='detail-info'>{user.lastName}</div>
                        </Col>
                        <Col span={12} className='mt'>
                            <div className='title-info'>Role</div>
                            <div className='detail-info'>{user.role}</div>
                        </Col>
                        <Col span={12} className='mt'>
                            <div className='title-info'>Address</div>
                            <div className='detail-info'>{user.address}</div>
                        </Col>
                    </Row>

                </Card>
            </Col>
            <Col span={14} offset={1}>
                <Card title='Comments'>
                    <List 
                        dataSource={comments} 
                        itemLayout="horizontal"
                        renderItem={item => {
                            const auther = item.auther ? item.auther.firstName : 'anonymous'
                            const dataTime = item.createdAt
                            return (
                                <Comment 
                                    content={item.body} 
                                    author={auther}
                                    datetime={
                                        <Tooltip title={dataTime}>
                                            {dataTime.split('T')[0]}
                                        </Tooltip>
                                    }
                                />
                            )
                        }}
                    />
                    <Form 
                        style={{marginTop: 20}} 
                        onFinish={onSubmit}
                    >
                        <Form.Item 
                            name='text' 
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your comment'
                                }
                            ]}>
                            <TextArea rows={4}></TextArea>
                        </Form.Item>
                        <Form.Item>
                            <Button 
                                loading={loading}
                                htmlType='submit' 
                                type='primary'>
                            Add Comment
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}

export default EmployeeDetail;