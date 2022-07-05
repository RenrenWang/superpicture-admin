import React, { useState } from 'react'
import { Form, Button } from 'antd'
import AddInput from './components/AddFormList'
const Home = () => {
  const [form] = Form.useForm()
  const { validateFields } = form
  const onFinish = () => {
    validateFields().then(res => {
      console.log(res)
    })
   }
  return (
    <Form onFinish={onFinish} form={form}>
      <Form.Item name="input">
        <AddInput defaultValue={["1","2","3"]} name={"input"} />
      </Form.Item>
      <Button type="primary" htmlType="submit">subimt</Button>
    </Form>
  )
}
export default Home
