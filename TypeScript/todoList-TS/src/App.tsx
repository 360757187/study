import React, { useState } from 'react'
import './App.css'
import Title from './components/Title'
import TextInput from './components/textInput/TextInput'
import TodoList from './components/list/List'
import Footer from './components/Footer'
import { UUID } from './utils'

function App() {

  interface todo {
    id: string,
    content: string,
    completed: boolean
  }

  const [todoList, setTodoList] = useState<todo[]>([]);
  const [list, setList] = useState<todo[]>([]);
  const [type, setType] = useState<string>('All');

  const addTodo = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      const todo: todo = {
        content: e.currentTarget.value,
        id: UUID(),
        completed: false,
      };
      setTodoList([todo, ...todoList]);
      setList(selectType(type, [todo, ...todoList]))
      e.currentTarget.value = '';
    }
  }

  const todoSelect = (e: any, id: string) => {
    const list = todoList.map(item => {
      if (item.id === id) {
        item.completed = !item.completed;
        e.currentTarget.checked = item.completed;
      }
      return item;
    })
    setTodoList(list);
    setList(selectType(type, list));
  }

  const removeTodo = (id: string) => {
    const list = todoList.filter(item => item.id !== id);
    setTodoList(list);
    setList(selectType(type, list))
  }

  const switchType = (type: string) => {
    setList(selectType(type, todoList))
  }

  const selectType = (type: string, list: todo[]) => {
    setType(type);
    switch (type) {
      case 'Active':
        return list.filter(item => !item.completed);
      case 'Completed':
        return list.filter(item => item.completed);
      default:
        return [...list];
    }
  }

  const editTodo = (e: React.KeyboardEvent<HTMLInputElement>, id: string) => {
    const list = todoList.map(item => {
      if (item.id === id) {
        item.content = e.currentTarget.value;
      }
      return item;
    })
    setTodoList(list);
    setList(selectType(type, list));
  }

  return (
    <div className="App">
      <Title />
      <TextInput addTodo={addTodo} />
      <TodoList
        list={list}
        todoSelect={todoSelect}
        removeTodo={removeTodo}
        editTodo={editTodo}
      />
      <Footer
        list={list}
        type={type}
        switchType={switchType}
      />
    </div>
  );
}

export default App;