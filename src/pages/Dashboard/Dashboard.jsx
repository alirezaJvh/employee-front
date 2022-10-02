import React from 'react'
import { Breadcrumb, Col, Layout, Row } from 'antd';
import './Dashboard.css'
import { Outlet } from 'react-router-dom';

function Dashboard() {
    const { Header, Content, Sider } = Layout;

    return (
        <Layout className='home-layout'>
            <Header className="header">
                <Row 
                    justify='space-between' 
                    className='header'
                >
                    <Col>hello</Col>
                    <Col>by</Col>
                </Row>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    {/* <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                        items={items2}
                    /> */}
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