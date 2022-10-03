
import { InboxOutlined } from '@ant-design/icons';
import { Card, Row, Col, Table, notification } from 'antd';
import { message, Upload } from 'antd';
import React, { useState } from 'react';
import papaparse from 'papaparse'
import './AddUser.css'

function AddUser() {
    const { Dragger } = Upload;
    const [employees, setEmployees] = useState([])
    const tableHeader = ['Username', 'Email', 'Password', 'First Name', 'Last Name', 'Role', 'Address']

    const createKey = (title) => {
        const str = title.replace(' ', '')
        return str.charAt(0).toLowerCase() + str.slice(1)
    }

    const columns = tableHeader.map(item => ({
        title: item,
        dataIndex: createKey(item),
        key: createKey(item),
    }))

    const openNotificationWithIcon = ({message, description, type, placement='bottom'}) => {
        notification[type]({
            message,
            description,
            placement
        })
    }

    const isValidCSV = (file) => {
        const isCSV = file.type === 'text/csv'
        if(!isCSV) message.error('File is not a valid CSV')
        return isCSV
    }

    const removeIncorrectRow = (data, errors) => {
        console.log(errors)
        const errorsIndex = errors.map(err => err.row)
        errorsIndex.sort()
        errorsIndex.forEach((rowIdx, index) => {
            data.splice(rowIdx - index, 1)
        })
        setEmployees(data)
    }

    const getContentFile = (res) => {
        const {data, errors} = res
        const notifObj = {type: 'warn', message: 'Some row is incorrect!'}
        if (errors) {
            openNotificationWithIcon({...notifObj})
        }
        const correctedData = removeIncorrectRow(data, errors)
        console.log(res)
        console.log(correctedData)
        console.log(setEmployees)
    }

    const getFile = (file) => {
        if (!isValidCSV(file)) return
        papaparse.parse(file, {
            header: true,
            newline: '\n',
            error() {
                const message = 'Error in parsing'
                openNotificationWithIcon('error', { message })
            },
            transformHeader(header) {
                return header.trim()
            },
            transform(val) {
                return val.trim()
            },
            complete: getContentFile,
        })
    }

    const props = {
        beforeUpload(file) {
            getFile(file)
            return false
        },
        onDrop(e) {
            console.log(e)
            console.log('Dropped files', e.dataTransfer.files);
        }
    }

    return (
        <Card>
            <Row justify='center'>
                <Col span={8}>
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibit from uploading company data or other
      band files
                        </p>
                    </Dragger>
                </Col>
            </Row>
            <div className='table-container'>
                <Table 
                    dataSource={employees} 
                    columns={columns}>
                </Table>
            </div>
        </Card>
    )
}

export default AddUser