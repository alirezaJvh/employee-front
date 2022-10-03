import { Card, Table } from 'antd';
import React from 'react';
import { useEmployees } from './../../../hooks/useEmployees'

function Home() {
    const { employees, loading } = useEmployees()
    const title = ['Username', 'Email', 'First Name', 'Last Name', 'Role']
    const dataSource = employees.map((item, key) => ({ ...item, key }))
    
    const createKey = (title) => {
        const str = title.replace(' ', '')
        return str.charAt(0).toLowerCase() + str.slice(1)
    }

    const columns = title.map(item => ({
        title: item,
        dataIndex: createKey(item),
        key: createKey(item),
    }))
    // TODO: pagination table
    return (
        <Card>
            <Table 
                loading={loading} 
                dataSource={dataSource} 
                columns={columns}>
            </Table>
        </Card>
    )
}

export default Home