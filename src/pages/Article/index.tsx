import React,{useEffect,useState} from 'react'
import { Space, Table } from 'antd'
import type { ColumnsType } from 'antd/lib/table'
import Container from '@components/Container'
import {getArticle} from './api'
interface DataType {
  key: string
  name: string
  age: number
  address: string
  tags: string[]
}

const columns: ColumnsType<DataType> = [
  {
    title: 'title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'describe',
    dataIndex: 'describe',
    key: 'describe',
  },
  {
    title: 'coverImg',
    dataIndex: 'coverImg',
    key: 'coverImg',
  },
  {
    title: 'status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'keywords',
    key: 'keywords',
    dataIndex: 'keywords',
  
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size='middle'>
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
]


const Article: React.FC = () => {
  const [data,setData]=useState()
  const getData = async(page=1) => {
   const {code,data} = await getArticle({
        page,
        pageSize:10
   })
    console.log(code,data)
    if (code === 200) {
       setData(data)
    }
  }
  const onChange = (page) => {
    getData(page)
  }
  useEffect(() => {
     getData()
  },[])
  return (
    <Container>
      <Table
        pagination={{  // 分页
          current: data?.page,
          total: data?.count,
          onChange: onChange,
          pageSize:10,
        }}
        columns={columns}
        dataSource={data?.list} />
    </Container>
  )
}
export default Article
