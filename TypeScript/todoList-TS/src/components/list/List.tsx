import React from 'react'
import '../../App.css'
import TodoItem from './Item'

export default (props: any) => {

  interface todo {
    id: string,
    content: string,
    completed: boolean
  }

  const { list = [], todoSelect, editTodo, removeTodo } = props;

  return (
    list.length > 0 ? <div className='list'>
      {
        list.map((item: todo, index: number) => (
          <TodoItem
            key={item.id}
            todo={item}
            todoSelect={todoSelect}
            editTodo={editTodo}
            removeTodo={removeTodo}
          />
        ))
      }
    </div>
      : <div className='list-empty'>暂无事项。。。</div>
  );
}