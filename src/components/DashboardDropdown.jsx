import {  LogoutOutlined, UserOutlined } from '@ant-design/icons';
import {  Menu, Dropdown, Space, Avatar } from 'antd';
import { useAuth } from './../context/AuthContext';
import React from 'react'

function DashboardDropdown() {
    const { employee, dispatch } = useAuth()
    const avatarDropDown = [
        {
            key: 'profile',
            label: 'Profile',
            icon: React.createElement(UserOutlined)
        },
        {
            key: 'logOut',
            label: 'Log Out',
            icon: React.createElement(LogoutOutlined)
        },
    ]

    const handleMenuClick = (e) => {
        if(e.key === 'logOut') {
            dispatch({ type: 'LOGOUT'})
        }
    }
    
    const menu = (
        <Menu onClick={handleMenuClick} items={avatarDropDown}></Menu>
    )
    // TODO: implement logout button
    return (
        <Dropdown overlay={menu}>
            <span>
                <Space>
                    <Avatar 
                        size='small' 
                        icon={<UserOutlined />}>
                    </Avatar>
                    <span style={{paddingLeft: '6px'}}>{employee.username}</span>
                </Space>
            </span>
        </Dropdown>
    )
}

export default DashboardDropdown