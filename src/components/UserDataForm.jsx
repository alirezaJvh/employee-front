import React from 'react';
import { Form, Input, Col, Row } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';

const validationMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
    }
}

const defaultInputs = [
    [
        {
            name: 'Username',
            icon: UserOutlined,
            rules: [{ required: true }]
        },
        {
            name: 'Email',
            icon: MailOutlined,
            rules: [{ required: true }, { type: 'email' }]
        },
    ], 
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
    ]
]

function UserDataForm({ formInputs = defaultInputs }) {

    const createRow = (inputs = formInputs) => {
        const rowJxs = inputs.map((row, rowIdx) => {
            return (
                <Row 
                    key={`row-${rowIdx}`} 
                    justify='space-around'
                >
                    {row.map(col => createCol(col))}
                </Row>
            )
        })
        return rowJxs
    }

    const createCol = ({name, rules, type, icon}) => {
        return (
            <Col 
                span={11} 
                key={name}>
                <Form.Item
                    name={createName(name)}
                    rules={rules}
                >
                    <Input 
                        placeholder={name} 
                        type={type ?? 'text'}
                        prefix={React.createElement(icon)} 
                    />
                </Form.Item>
            </Col>
        )
    }

    const createName = (col) => {
        const str = col.replace(' ', '')
        return str.charAt(0).toLowerCase() + str.slice(1)
    }

    return createRow(formInputs).map(row => row)
}

export default UserDataForm;
export { UserDataForm, validationMessages, defaultInputs }