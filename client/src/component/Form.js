import React from 'react'
import "../App.css"
function Form() {
  return (
    <div className='form'>
        <h1>Add New User</h1>
        <form >
            <input type="text" />
            <input type="text" />
            <input type="button" value="submit"/>
        </form>
    </div>
  )
}

export default Form;