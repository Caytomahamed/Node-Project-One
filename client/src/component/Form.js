import React from 'react'
import "../App.css"
function Form() {
  return (
    <div className='form'>
        <h1>Add New User</h1>
        <form >
            <input type="text"  placeholder='Enter users name'/>
            <input type="text" placeholder='Enter users bio'/>
            <input type="text" placeholder='Enter users image url'/>
            <input type="button" value="submit"/>
        </form>
    </div>
  )
}

export default Form;