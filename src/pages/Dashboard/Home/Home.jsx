import { Form, Input, Popconfirm, Table, Typography, Button, notification, Row } from 'antd';
import { EditOutlined, DeleteOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useEmployees } from '../../../hooks/useEmployees'
import { useNavigate } from 'react-router-dom';
import { editEmployees, deleteEmployee } from '../../../services/employee';
import { useAuth } from '../../../context/AuthContext'
import React, { useState } from 'react';

const EditableCell = ({
    editing,
    dataIndex,
    title,
    children,
    ...restProps
}) => {
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

function AddUser() {
    let { employees, totalItems, currentPage, loading, getEmployeePage, setEmployee } = useEmployees()
    const { headers, employee } = useAuth()
    const [form] = Form.useForm();
    const user = employee
    const navigate = useNavigate()
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.id === editingKey;

    const edit = (e, record) => {
        e.stopPropagation();  
        form.setFieldsValue({
            ...record,
        });
        setEditingKey(record.id);
    }

    const deleteItem = async(e, { id }) => {
        e.stopPropagation();  
        try {
            const res = await deleteEmployee({ headers, data: { id } })
            const newData = employees.filter(item => item.id !== id)
            setEmployee((prev) => ({...prev, employees: newData}))
            notification['success']({
                message: res.data.message,
                placement: 'bottom',
            })
        } catch (e) {
            console.log(e)
        }
    }

    const getNextPage = async (page) => {
        setEditingKey('')
        if (currentPage !== page) {
            await getEmployeePage(page)
        }
    };

    const cancel = () => {
        setEditingKey('')
    }

    const save = async (record) => {
        try {
            const row = await form.validateFields();
            const data = {...record, ...row}
            const res = await editEmployees({ headers, data })
            setEditingKey('')
            notification['success']({
                message: res.data.message,
                placement: 'bottom',
            })
        } catch (e) {
            console.log('Validate Failed:', e);
        }
    }

    const haveAccess = (record) => {
        if (user.role === 'ADMIN') {
            return (
                <Row>
                    <Button 
                        disabled={editingKey !== ''} 
                        shape='circle' 
                        type='primary'
                        style={{marginRight: 5}}
                        icon={<EditOutlined />} 
                        onClick={(e) => edit(e, record)} 
                    >
                    </Button>
                    <Popconfirm 
                        title="Sure to delete?" 
                        onCancel={(e) => e.stopPropagation()} 
                        onConfirm={(e) => deleteItem(e, record)}>
                        <Button 
                            disabled={editingKey !== ''} 
                            shape='circle' 
                            type='danger'
                            style={{marginLeft: 5}}
                            icon={<DeleteOutlined />} 
                            onClick={(e) => e.stopPropagation()} 
                        >
                        </Button>
                    </Popconfirm>
                </Row>
            )
        }
        return (
            <Row justify='center'>
                <Button 
                    disabled={true}
                    shape='circle' 
                    type='danger' 
                    onClick={(e) => e.stopPropagation()} 
                    icon={<CloseCircleOutlined />}
                >
                </Button>
            </Row>
        )
    }

    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            editable: false,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            editable: false,
            responsive: ['lg']
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
            title: 'Role',
            dataIndex: 'role',
            editable: true,
            responsive: ['lg']
        },
        {
            title: 'Address',
            dataIndex: 'address',
            width: '20%',
            editable: true,
            responsive: ['lg']
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <span>Cancel</span>
                        </Popconfirm>
                    </span>
                ) : (
                    haveAccess(record)
                );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    })
    return (
        <>
            {console.log(employees)}
            <div className='title mb-4'> Dashboard </div>
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    loading={loading}
                    dataSource={employees}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    onRow={({ id }) => {
                        return {
                            onClick: () => {
                                if (!editingKey) {
                                    navigate(`/employee/${id}`)
                                }
                            }
                        }
                    }}
                    pagination={{
                        onChange: getNextPage,
                        total: totalItems
                    }}
                />
            </Form>
        </>
    );
}

export default AddUser;