import React, { useEffect, useState } from 'react'
import { Form, Button } from 'antd'
import AddInput from './components/AddFormList'
const Home = () => {
  const [form] = Form.useForm()
  const { validateFields } = form
  const [defaultValue, setDefaultValue] = useState([])
  const onFinish = () => {
    validateFields().then(res => {
      console.log(res)
    })
  }
  useEffect(() => {
    setTimeout(() => {
      setDefaultValue(['1', '2', '3'])
    }, 1000 * 6)
  }, [])
  return (
    <Form onFinish={onFinish} form={form}>
      <Form.Item name='input'>
        <AddInput defaultValue={defaultValue} name={'input'} />
      </Form.Item>
      <Button type='primary' htmlType='submit'>
        subimt
      </Button>
    </Form>
  )
}
export default Home
