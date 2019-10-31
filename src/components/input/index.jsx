import React, { useState } from 'react'
import { randShortString } from './util'

export default (props) => {
    const [text, setText] = useState('')

    function updateContent(event){
        setText(event.target.value)
    }

    function handleKeyPress(event){
        if(event.key === 'Enter'){
            props.onAdd({
                id: randShortString(),
                content: text,
                marked: false
            })
            return setText('')
        }
    }

    return(
        <div className="textInput">
            <input
                autoFocus
                onKeyPress={handleKeyPress}
                onChange={updateContent}   
                value={text} 
                type="text"/>
            <small>Hit "Enter" to save</small>
        </div>
    )
}