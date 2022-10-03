/* eslint-disable jsx-a11y/no-static-element-interactions */
import  { EditableRow, EditableContext }  from '../../../components/EditableTable/EditableRow.jsx'
import EditableCell from '../../../components/EditableTable/EditableCell.jsx';
import FileDragger from '../../../components/FileDragger.jsx';
import { Button, Popconfirm, Table, Row, Col } from 'antd';
import React, { useState, useContext } from 'react';
import './AddEmployee.css'

const AddEmployee = () => {
    const [employees, setEmployees] = useState([])
    const [count, setCount] = useState(0)
    const form = useContext(EditableContext)

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
            email: '',
            username: '',
            firstName: '',
            lastName: '',
            role: 'employee',
            address: '',
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

    const handleSubmit = async() => {
        console.log(form)
        console.log('send to the server')
        console.log(employees)
    }

    return (
        <div>
            <Row justify='center'>
                <Col span={6}>
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
                components={components}
                rowClassName={() => 'editable-row'}
                pagination={false}
                dataSource={employees}
                columns={columns}
            />
        </div>
    );
};

export default AddEmployee;