import { Card, Table } from 'antd';
import React from 'react';
import { useEmployees } from './../../../hooks/useEmployees'

function Home() {
    const { employees } = useEmployees()
    const title = ['Username', 'Email', 'First Name', 'Last Name', 'Role']

    const createKey = (title) => {
        const str = title.replace(' ', '')
        return str.charAt(0).toLowerCase() + str.slice(1)
    }

    const columns = title.map(item => ({
        title: item,
        dataIndex: createKey(item),
        key: createKey(item),
    }))

    return (
        <Card>
            <Table dataSource={employees} columns={columns}></Table>
            {employees.map((item, index) =>  <div key={index}>{item.username}</div>)}
        </Card>
    )
}

export default Home