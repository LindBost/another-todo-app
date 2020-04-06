import React, { useState } from 'react';

const EditForm = ({ todo, updateTodo }) => {

    const [todoName, setTodoName] = useState(todo.name)

    const updateTodoName = (event) => {
        setTodoName(event.target.value);
    }

    return (
        <div>
            <input
                type="text"
                value={todoName}
                onChange={updateTodoName}
            />
            <button onClick={() => updateTodo({ ...todo, name: todoName })}>Save update</button>
        </div>
    )
}

export default EditForm;