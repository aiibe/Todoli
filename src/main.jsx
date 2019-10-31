import React, { PureComponent } from 'react'
import Todo from './components/todo'
import Input from './components/input'


function syncLocalStorage(key, val){
    localStorage.setItem(key, JSON.stringify(val))
}

class Main extends PureComponent {
    constructor(props){
        super(props)
        this.addTodo = this.addTodo.bind(this)
        this.updateTodo = this.updateTodo.bind(this)
        this.deleteTodo = this.deleteTodo.bind(this)
        this.state = {
            todos: [],
        }
    }

    addTodo(todo){
        const todos = [...this.state.todos, todo]
        this.setState({ todos }, () => syncLocalStorage('todos', todos))
    }

    updateTodo({id, marked}){
        const todos = this.state.todos.map( todo => {
            return todo.id === id ? {...todo, marked: !marked} : todo 
        })
        this.setState({ todos }, () => syncLocalStorage('todos', todos))
    }

    deleteTodo(id){
        const todos = this.state.todos.filter( todo => { return todo.id !== id})
        this.setState({ todos }, () => syncLocalStorage('todos', todos))
    }

    componentDidMount(){
        
        // Localstorage
        let todos = localStorage.getItem('todos')
        todos ? this.setState({todos: JSON.parse( todos )}) : localStorage.setItem('todos', '')
    }

    render(){
        return(
            <div className="container">
                <ul>
                    {
                        this.state.todos.map( todo => {
                            return(
                                <Todo 
                                    key={ todo.id } 
                                    data={ todo }
                                    onMark={ this.updateTodo }
                                    onDelete={ this.deleteTodo }/>
                            )
                        })
                    }
                </ul>
                <Input onAdd={this.addTodo}/>
            </div>
        )
    }
}

export default Main