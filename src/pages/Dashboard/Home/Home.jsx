// eslint-disable
import { Card, Table, Modal, Row, Button, Form } from 'antd';
import { DeleteOutlined, EditOutlined, UserOutlined, HomeOutlined, SafetyOutlined } from '@ant-design/icons';
import UserDataForm, { validationMessages } from '../../../components/UserDataForm.jsx';
import { useEmployees } from './../../../hooks/useEmployees'
import React, { useState } from 'react';

function Home() {
    const [open, setOpen] = useState()
    const [form] = Form.useForm()
    const { employees, loading } = useEmployees()
    const dataSource = employees.map((item, key) => ({ ...item, key }))
    const formInputs = [    
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
                name: 'Address',
                icon: HomeOutlined,
                rules: []
            },
            {
                name: 'role',
                icon: SafetyOutlined,
                rules: [],
            }
        ]
    ]
    const [dataEdit, setDataEdit] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        role: '',
        address: '',
    })

    const handleDelete = (data) => {
        console.log('delete')
        console.log(data);
    }

    const handleEdit = (data) => {
        setDataEdit(data)
        // form.setFieldValue({
        //     username: 'alireza'
        // })
        console.log(form)
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
                width={600}
                title='Edit Employee'
                onCancel={() => setOpen(false)}
            >
                <Form 
                    form={form} 
                    initialValues={dataEdit} 
                    component={false} 
                    validateMessages={validationMessages}>
                    <UserDataForm formInputs={formInputs} />
                </Form>
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