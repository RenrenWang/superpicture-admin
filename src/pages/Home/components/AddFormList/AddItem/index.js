import React from 'react'
import { DeleteOutlined } from '@ant-design/icons'
import './index.less'
const AddItem = ({ onDelete, index, children, name }) => {
  const rightView = () => <DeleteOutlined onClick={() => onDelete(index)} />
  return (
    <div className='kyb-add-item' title={`${name}${index + 1}`}>
      {children}
      {rightView()}
    </div>
  )
}

export default AddItem
