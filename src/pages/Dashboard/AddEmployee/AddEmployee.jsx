/* eslint-disable jsx-a11y/no-static-element-interactions */
import  { EditableRow }  from '../../../components/EditableTable/EditableRow.jsx'
import EditableCell from '../../../components/EditableTable/EditableCell.jsx';
import FileDragger from '../../../components/FileDragger.jsx';
import { Button, Popconfirm, Table, Row, Col, notification, Card } from 'antd';
import { addEmployees } from '../../../services/employee.js';
import { useAuth } from './../../../context/AuthContext'
import React, { useState } from 'react';
import './AddEmployee.css'

const AddEmployee = () => {
    const [employees, setEmployees] = useState([])
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(false)
    const { headers } = useAuth()
    
    // const form = useContext(EditableContext)

    const handleDelete = (key) => {
        const newData = employees.filter((item) => item.key !== key);
        setEmployees(newData);
    };

    const defaultColumns = [
        {   
            title: 'Username',
            dataIndex: 'username',
            editable: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            editable: true,
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            editable: true,
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            editable: true,
        },
        {
            title: 'Password',
            dataIndex: 'password',
            editable: true,
        },
        {
            title: 'Role',
            dataIndex: 'role',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            editable: true
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            render: (_, record) =>
                employees.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                        <span>Delete</span>
                    </Popconfirm>
                ) : null,
        },
    ];

    const handleAdd = () => {
        const newData = {
            key: count,
            email: 'email@example.com',
            username: 'Username',
            firstName: 'First Name',
            lastName: 'Last Name',
            role: 'EMPLOYEE',
            address: 'Address',
            password: '123',
        };
        setEmployees([...employees, newData]);
        setCount(count + 1);
    };

    const handleSave = (row) => {
        const newData = [...employees];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setEmployees(newData);
    };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };
    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        }
    })

    const openNotificationWithIcon = ({message, description, type, placement='bottom'}) => {
        notification[type]({
            message,
            description,
            placement
        })
    }

    const emptyFields = (input) => {
        const keys = ['username', 'password', 'email', 'firstName', 'lastName', 'role', 'address']
        const notValidItems = input.find((row) => {
            const item =  keys.find(key => {
                if(!row[key] && (row[key] !== 0)) {
                    return key
                }
            })
            return item
        })
        return notValidItems
    }

    const inputIsValid = () => {
        const notifObj = {message: 'Fill all fields', type: 'error'}
        if(emptyFields(employees)) {
            openNotificationWithIcon({ ...notifObj })
            return false
        }
        if(!employees.length) {
            notifObj.message = 'Add a user'
            openNotificationWithIcon({ ...notifObj })
            return false
        }
        return true
    }

    const handleSubmit = async() => {
        try {
            if(inputIsValid()) {
                setLoading(true)
                await addEmployees({ headers, data: employees })
                setEmployees([])
                setLoading(false)
                openNotificationWithIcon({ 
                    type: 'success', 
                    message: 'Add Users successfully!'
                })
            }
        } catch ({ response }) {
            console.log(response)
            const description = response.data.message
            setLoading(false)
            openNotificationWithIcon({
                type: 'error',
                message: 'Error in create',
                description
            })
        }
    }

    return (
        <Card>
            <Row justify='center'>
                <Col span={8}>
                    <FileDragger setEmployees={setEmployees}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button
                        onClick={handleAdd}
                        type="primary"
                        style={{
                            marginBottom: 15,
                            marginTop: 30,
                        }}
                    >
                    Add a row
                    </Button>
                </Col>
                <Col>
                    <Button 
                        type="primary" 
                        onClick={handleSubmit}
                        style={{
                            marginBottom: 15,
                            marginTop: 30,
                            marginLeft: 10,
                        }}
                    >
                            Save Employee
                    </Button>
                </Col>
            </Row>
            <Table
                bordered
                loading={loading}
                components={components}
                rowClassName={() => 'editable-row'}
                pagination={false}
                dataSource={employees}
                columns={columns}
            />
        </Card>
    );
};

export default AddEmployee;