import React from 'react'
import '../App.css'

export default (props: any) => {
  const { list, switchType, type } = props;

  return <footer className='footer'>
    <div>{list.length}条事项</div>
    <div className='button-box'>
      <div onClick={() => switchType('All')} className={type === 'All' ? 'button-selected' : ''}>All</div>
      <div onClick={() => switchType('Active')} className={type === 'Active' ? 'button-selected' : ''}>Active</div>
      <div onClick={() => switchType('Completed')} className={type === 'Completed' ? 'button-selected' : ''}>Completed</div>
    </div>
  </footer>;
}