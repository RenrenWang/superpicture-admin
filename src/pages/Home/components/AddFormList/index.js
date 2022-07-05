/**
 *  动态添加表单
 *
 */
import React, { useState, useEffect, useCallback } from 'react'
import AddItem from './AddItem'
import './index.less'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'

const AddList = ({ max = 4, name, onChange, defaultValue = [] }) => {
  const [list, setList] = useState([])
  useEffect(() => {
    let valus = []
    defaultValue &&
      defaultValue.map((item, index) => {
        valus.push({
          key: `${name}-${index}`,
          [name]: item,
        })
      })
    setList([...valus])
  }, [])
  //数据组装
  const onFinish = useCallback(() => {
    const result = []
    list.forEach(item => {
      result.push(item?.input)
    })
    // 去除空数据
    const newResult = result.filter(item => item)
    onChange && onChange(newResult)
  }, [list])
  useEffect(() => {
    onFinish()
  }, [list])
  // 添加内容
  const onAdd = useCallback(() => {
    if (list.length >= max) {
      return
    }
    const length = list?.length
    const newList = [
      ...list,
      {
        key: `${name}-${length}`,
      },
    ]
    setList([...newList])
  }, [list])

  // 删除
  const onDelete = useCallback(
    index => {
      const newList = [...list]
      newList.splice(index, 1)
      setList([...newList])
    },
    [list]
  )
  const onInput = (e, index) => {
    const newList = [...list]
    newList[index][name] = e.target.value
    setList([...newList])
  }
  return (
    <div>
      {list.map((item, index) => (
        <AddItem name={name} index={index} onDelete={onDelete} key={item?.key}>
          <Input defaultValue={item?.[name]} onChange={e => onInput(e, index)}></Input>
        </AddItem>
      ))}
      <div className='item-add-button'>
        <Button onClick={onAdd} type='dashed' block size='large' icon={<PlusOutlined />}>
          Add More
        </Button>
      </div>
    </div>
  )
}
export default AddList
