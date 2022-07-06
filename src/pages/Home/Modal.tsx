import React  from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'antd'
const Modal = ({ children }) => {
  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 100,
        top: 100,
        color: '#ff0',
         
      }}
    >
      {children}
    </div>
  )
}
function Wrapper(props) {
  const container = document.createElement('div')

  const hide = () => {
    ReactDOM.unmountComponentAtNode(container)
    document.body.removeChild(container)
  }
  const show = () => {
    console.log(props)
    document.body.appendChild(container)
    ReactDOM.render(<Modal {...props} hide={hide} />, container)
  }

  return (
    <Button type='primary' onClick={show}>
      Loadingwww
    </Button>
  )
}
export default Wrapper
