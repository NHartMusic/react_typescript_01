import React, { useState, Fragment } from 'react'
import ReactDOM from 'react-dom'

type formElem = React.FormEvent<HTMLFormElement>

interface IToDo {
    text: string
    complete: boolean
}

export default function App(): JSX.Element {
    const [value, setValue] = useState<string>('')
    const [toDos, setToDos] = useState<IToDo[]>([])

    const handleSubmit = (e: formElem): void => {
        e.preventDefault()
        addToDo(value)
        setValue('')
    }

    const addToDo = (text: string): void => {
        const newToDos: IToDo[] = [...toDos, { text, complete: false }]
        setToDos(newToDos)
    }

    const completeToDo = (index: number): void => {
        const newToDos: IToDo[] = [...toDos]
        newToDos[index].complete = !newToDos[index].complete
        setToDos(newToDos)
    }

    const removeToDo = (index: number): void => {
        const newToDos: IToDo[] = [...toDos]
        newToDos.splice(index, 1)
        setToDos(newToDos)
    }

    return (
        <>
            <h1>ToDo List</h1>
            <form onSubmit={handleSubmit}>
                <input type='text' value={value} onChange={e => setValue(e.target.value)} required />
                <button type='submit'>Add ToDo</button>
            </form>
            <section>
                {toDos.map((todo: IToDo, index: number) =>
                    <Fragment key={index}>
                        <div style={{ textDecoration: todo.complete ? 'line-through' : '' }}>{todo.text}</div>
                        <button type='button' onClick={() => completeToDo(index)}>
                            {''}
                            {todo.complete ? 'Incomplete' : 'Complete'}
                            {''}
                        </button>
                        <button type='button' onClick={() => removeToDo(index)}>&times;</button>
                    </Fragment>
                )}
            </section>
        </>
    )
}

const root = document.getElementById('app-root')
ReactDOM.render(<App />, root)
