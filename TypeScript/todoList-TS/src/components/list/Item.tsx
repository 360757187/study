import React, { useState, useEffect, createRef } from 'react'
import '../../App.css'

export default (props: any) => {
  const { todo, todoSelect, editTodo, removeTodo } = props;
  const [edit, setEdit] = useState<boolean>(false);
  const editInput = createRef<HTMLInputElement>();

  
  const sureEditTodo = (e: React.KeyboardEvent<HTMLInputElement>, id: string) => {
    if (e.key === 'Enter') {
      editTodo(e, id);
      setEdit(false);
    }
  }


  useEffect(() => {
    if (edit === true && editInput.current !== null)
      editInput.current.focus();
  }, [editInput, edit])

  return (
    <div className='item'>
      <input type='radio' defaultChecked={todo.completed} onClick={(e) => todoSelect(e, todo.id)}></input>
      <label style={{ display: !edit ? 'block' : 'none' }} className={todo.completed ? 'completed' : ''} onDoubleClick={() => setEdit(true)}>{todo.content}</label>
      <input
        ref={editInput}
        style={{ display: edit ? 'block' : 'none' }}
        defaultValue={todo.content}
        placeholder='请输入待办事项'
        onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>): void => sureEditTodo(e, todo.id)}
        onBlur={() => setEdit(false)}
      />
      <span title='删除事项' className='destory' onClick={() => removeTodo(todo.id)}>x</span>
    </div>
  );
}