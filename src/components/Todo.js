import React, {useState, useEffect} from 'react'

export default function Todo({item, onUpdate, onDelete, onCompleteTask}) {
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    function FormEdit() {
        const [newValue, setNewValue] = useState(item.title);
        const [disableButton, setDisableButton] = useState(true);

        useEffect(() => {
            if(newValue !== "") {
                setDisableButton(false)
            } else {
                setDisableButton(true)
            }
        }, [newValue]);

        const handleSubmit = (e) => {
            e.preventDefault();
        }
    
        const handleChange = (e) => {
            const value = e.target.value;
            setNewValue(value);
        }

        const handleClickUpdateTodo = (e) => {
            onUpdate(item.id, newValue);
            setIsEdit(false)
        }

        return (
            <form className="todoUpdateForm" onSubmit={handleSubmit}>
                <input onChange={handleChange} type="text" className="todoInput" value={newValue} />
                <button 
                    type="button"
                    className="button buttonEdit" 
                    onClick={handleClickUpdateTodo} 
                    disabled={disableButton}
                >
                    Update
                </button>
            </form>
        );
    }

    function TodoElement() {
        
        const [finishTask, setFinishTask] = useState(item.completed);
        useEffect(() => {
            if(item.completed) {
                setFinishTask(true);
            }
        }, [finishTask]);

        const handleClickFinishTask = (e) => {
            onCompleteTask(item.id, true);
            setIsDelete(true);
        }

        return (
            <div className="todoInfo">
                <span className="todoTitle">
                    {finishTask ? <del>{item.title}</del> : item.title}
                </span>
                {
                    isDelete ? 
                    <button type="button" className="button buttonDelete" onClick={() => onDelete(item.id)}>Delete</button>
                    :
                    <>
                        <button type="button" className="button buttonEdit" onClick={() => setIsEdit(true)}>Edit</button>
                        <button type="button" className="button buttonFinish" onClick={handleClickFinishTask}>Finish</button>
                    </>
                }
            </div>
        );
    }
  return (

    <div className="todo">
        {isEdit ? <FormEdit/> : <TodoElement/>}
    </div>
  )
}
