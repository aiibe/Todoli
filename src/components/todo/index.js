import React from 'react'
import Clear from '../icons/Clear'

function Todo(props) {

    function removeTodo(event){
        return props.onDelete(props.data.id) 
    }

    function markDone(event) {
        return props.onMark(props.data)
    }

    return(
        <li className={props.data.marked ? "done" : "doing" }>
            <small onClick={ markDone }>{ props.data.content }</small>
            <Clear onClick={ removeTodo }/>
        </li>
    )
}

export default Todo