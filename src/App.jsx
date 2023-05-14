import './App.scss'
import os from 'socket:os'
import React from 'react'
import blog from './assets/images/blog.png'

const App = () => {
  return (
    <section className='app'>
      <div className='img-container'>
        <img src={blog} alt="blog" className='image' />
      </div>
      <h1>Hello, {os.platform()}!</h1>
    </section>
  )
}
export default App
