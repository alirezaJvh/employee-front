import { DashboardOutlined, UserAddOutlined, SettingOutlined } from '@ant-design/icons';
import { Breadcrumb, Col, Layout, Row, Menu } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import React from 'react'
import DashboardDropdown from '../../components/DashboardDropdown.jsx';
import './Dashboard.css'

function Dashboard() {
    const { Header, Content, Sider } = Layout;
    const navigate = useNavigate();
    const sidebarMenu = [
        {
            key: '0',
            label: 'Dashboard',
            icon: React.createElement(DashboardOutlined),
            route: '/'
        },
        {
            key: '1',
            label: 'Add Employee',
            icon: React.createElement(UserAddOutlined),
            route: '/add-employee'
        }
    ]

    const changeRoute = ({ key }) => {
        const { route } = sidebarMenu[key]
        navigate(route)
    }

    return (
        <Layout className='home-layout'>
            <Header className="header">
                <Row 
                    justify='space-between' 
                    align='middle'
                    className='header'
                >
                    <Col>
                        <span>
                            <SettingOutlined style={{fontSize: '26px'}}/>
                        </span>
                        <span className='title'>
                            Employee Managment
                        </span>
                    </Col>
                    <Col>
                        <DashboardDropdown />
                    </Col>
                </Row>
            </Header>
            <Layout>
                <Sider 
                    className='visible-desktop'
                    theme='light' 
                    collapsible 
                    width={200}
                >
                    <Menu 
                        onClick={changeRoute}
                        mode='inline' 
                        defaultSelectedKeys={['0']} 
                        items={sidebarMenu}
                    />
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content className="site-layout-background content">
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default Dashboard