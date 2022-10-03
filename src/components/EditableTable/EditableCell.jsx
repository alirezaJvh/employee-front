/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Form, Input } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { EditableContext } from './EditableRow.jsx'

function EditableCell ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            console.log(dataIndex)
            console.log(inputRef)
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input 
                    placeholder={title} 
                    ref={inputRef} 
                    onPressEnter={save} 
                    onBlur={save} 
                />
            </Form.Item>
        ) : (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
}

export default EditableCell
export { EditableCell }