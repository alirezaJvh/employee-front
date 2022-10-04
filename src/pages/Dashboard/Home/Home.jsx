// eslint-disable
import { Card, Table, Modal, Row, Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useEmployees } from './../../../hooks/useEmployees'

function Home() {
    const [open, setOpen] = useState()
    const [dataEdit, setDataEdit] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        role: '',
        address: '',
    })
    const { employees, loading } = useEmployees()
    const dataSource = employees.map((item, key) => ({ ...item, key }))

    const handleDelete = (data) => {
        console.log('delete')
        console.log(data);
    }

    const handleEdit = (data) => {
        setDataEdit(data)
        setOpen(true)
        console.log('edit')
        console.log(dataEdit)
        console.log(data);
    }

    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
        },
        {
            title: 'Role',
            dataIndex: 'role',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: '',
            dataIndex: 'operation',
            render: (_, record) => (
                <Row justify='center'>
                    <Button 
                        shape='circle' 
                        type='primary'
                        style={{marginRight: 5}}
                        icon={<EditOutlined />} 
                        onClick={() => handleEdit(record)} 
                    >
                    </Button>
                    <Button 
                        shape='circle' 
                        type='danger'
                        style={{marginLeft: 5}}
                        icon={<DeleteOutlined />} 
                        onClick={() => handleDelete(record)} 
                    >
                    </Button>
                </Row>
            )
        }
    ]

    // TODO: pagination table
    return (

        <Card>
            <Modal 
                open={open} 
                onCancel={() => setOpen(false)}
            >

            </Modal>
            <Table 
                bordered
                loading={loading} 
                dataSource={dataSource} 
                columns={columns}>
            </Table>
        </Card>
    )
}

export default Home