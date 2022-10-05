import { Form, Input, Popconfirm, Table, Typography, Button, notification, Row } from 'antd';
import { EditOutlined, DeleteOutlined, CloseCircleOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useEmployees } from '../../../hooks/useEmployees'
import { editEmployees, deleteEmployee } from '../../../services/employee';
import { useAuth } from '../../../context/AuthContext';

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
    const { headers, employee } = useAuth()
    const [form] = Form.useForm();
    const user = employee
    let { employees, totalItems, currentPage, loading, getEmployeePage } = useEmployees()
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.id === editingKey;
    {console.log('user')}
    {console.log(user)}
    const edit = (record) => {
        form.setFieldsValue({
            ...record,
        });
        setEditingKey(record.id);
    }

    const deleteItem = async({ id }) => {
        try {
            // FIXME: remove deleted item
            const res = await deleteEmployee({ headers, data: { id } })
            // const newData = employees.filter(item => item.id !== id)
            // setEmployee(newData)
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
                        onClick={() => edit(record)} 
                    >
                    </Button>
                    <Button 
                        disabled={editingKey !== ''} 
                        shape='circle' 
                        type='danger'
                        style={{marginLeft: 5}}
                        icon={<DeleteOutlined />} 
                        onClick={() => deleteItem(record)} 
                    >
                    </Button>
                </Row>
            )
        }
        return (
            <Row justify='center'>
                <Button 
                    disabled={true}
                    shape='circle' 
                    type='danger' 
                    icon={<CloseCircleOutlined />}
                >
                </Button>
            </Row>
        )
        // console.log('Have Access')
        // console.log('editingKey' + editingKey)
        // console.log(user.role)
        // return (editingKey !== '') && (user.role !== 'ADMIN')
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
        },
        {
            title: 'Address',
            dataIndex: 'address',
            width: '20%',
            editable: true,
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
    });
    return (
        <>
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