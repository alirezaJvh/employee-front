import { InboxOutlined } from '@ant-design/icons';
import { message, Upload, notification } from 'antd';
import papaparse from 'papaparse'
import React from 'react'

function FileDragger({ setEmployees }) {
    const { Dragger } = Upload;

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

    const openNotificationWithIcon = ({message, description, type, placement='bottom'}) => {
        notification[type]({
            message,
            description,
            placement
        })
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

    const DraggerProps = {
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
        <Dragger {...DraggerProps}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
                Add your CSV employee file
            </p>
        </Dragger>
    )
}

export default FileDragger