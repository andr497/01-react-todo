import {useState, useEffect} from 'react';
import Todo from './Todo';
import './TodoApp.scss'

export default function TodoApp() {

    const [title, setTitle] = useState('');
    const [todos, setTodos] = useState([]);
    const [disableButton, setDisableButton] = useState(true);

    useEffect(() => {
        if(title !== "") {
            setDisableButton(false)
        } else {
            setDisableButton(true)
        }
    }, [title]);

    const handleChange = (e) => {
        const value = e.target.value;

        setTitle(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTodo = {
            id: crypto.randomUUID(),
            title: title,
            completed: false
        }

        setTodos([...todos, newTodo]);

        setTitle("");
    }

    const handleUpdate = (id, value) => {
        const temp = [...todos];
        const item = temp.find(item => item.id === id);

        item.title = value;
        setTodos(temp);
    }

    const handleDelete = (id) => {
        const temp = todos.filter(item => item.id !== id);

        setTodos(temp);
    }

    const handleCompleteTask = (id, value) => {
        const temp = [...todos];
        const item = temp.find(item => item.id === id);

        item.completed = value;
        setTodos(temp);
    }

  return (
      <div className="todoContainer">
        <h2 className="todoHeader">Todo list</h2>
        <form className="todoCreateForm" onSubmit={handleSubmit}>
            <input type="text" onChange={handleChange} className="todoInput" value={title}/>
            <input
                type="submit" 
                value="Create new task" 
                className="button buttonCreate"
                disabled={disableButton}
            />
        </form>

        <div className="todosContainer">
            {
                todos.map(item => (
                    <Todo key={item.id} item={item} onUpdate={handleUpdate} onDelete={handleDelete} onCompleteTask={handleCompleteTask}/>
                ))
            }
        </div>
      </div>
  )
}
