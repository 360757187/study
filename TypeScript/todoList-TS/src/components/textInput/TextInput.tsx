import React from 'react'
import '../../App.css'

export default (props: any) => {
  const { addTodo } = props;

  return <input
    className='text-input'
    placeholder='请输入待办事项'
    onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>): void => addTodo(e)}
  />;
}