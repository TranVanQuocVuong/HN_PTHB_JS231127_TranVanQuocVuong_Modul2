import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addJob, deleteJob, editJob, checkCompleteJob, moveJob } from '../redux-toolkit/reducers/toDoList';
import "./toDoList.scss"

export default function ToDoList() {
    const [job, setJob] = useState({
        id: "",
        nameJob: "",
        status: false
    })
    const [flag, setFlag] = useState(-1);
    const [move, setMove] = useState(false);

    const data = useSelector((state) => {
        console.table(state.dataJobs);
        return state;
    })
    // console.log(data);
    const disPatch = useDispatch()

    const handleChange = (e) => {
        setJob({ ...job, id: Math.floor(Math.random() * 10000), nameJob: e.target.value, status: false })
    }

    const addToDo = () => {
        if (flag == -1) {
            disPatch(addJob(job))
            setJob({
                id: "",
                nameJob: "",
                status: false
            })
        } else {
            disPatch(editJob({
                flag,
                job
            }))
            setJob({
                id: "",
                nameJob: "",
                status: false
            })
            setFlag(-1)
        }
    }

    const deleteToDo = (id) => {
        let deleteConfirm = confirm("Bạn có muốn xóa công việc này");
        if (deleteConfirm) {
            disPatch(deleteJob(id));
        }
    }

    const checkJob = (item) => {
        disPatch(checkCompleteJob(item))
    }

    const updateToDo = (id) => {
        let index = data.dataJobs.findIndex((item) => {
            return item.id == id
        })
        setJob({ ...job, id: id, nameJob: data.dataJobs[index].nameJob, status: data.dataJobs[index].status })
        setFlag(id)
    }

    const moveItem = () => {
        let checkMove = !move
        if (checkMove == true) {
            const newData = [...data.dataJobs]
            newData.sort((a, b)=>{
                return Number(a.status) - Number(b.status)
            })
            disPatch(moveJob(newData))
        }
        setMove(checkMove)
    }
    console.log("move", move);
    return (
        <div className='main'>
            <div className='headerToDo'>
                <p>Todo List</p>
                <span>get things done, one item at a time</span>
                <hr />
            </div>
            <div className='bodyToDo'>
                <ul>
                    {
                        data.dataJobs.map((item) => {
                            return (
                                <li key={item.id}>
                                    <span style={{ textDecoration: item.status ? 'line-through' : '' }}>
                                        {item.nameJob}
                                    </span>
                                    <div>
                                        <input
                                            type="checkbox"
                                            checked={item.status}
                                            value={item.status}
                                            onChange={() => checkJob(item)}
                                        />
                                        <span>
                                            <i
                                                className="fa-regular fa-pen-to-square"
                                                onClick={() => updateToDo(item.id)}
                                            />
                                        </span>
                                        <span>
                                            <i
                                                className="fa-solid fa-trash"
                                                onClick={() => deleteToDo(item.id)}
                                            />
                                        </span>
                                    </div>
                                </li>

                            )
                        })
                    }
                </ul>
                <div className='moveItem'>
                    <p>Move done items at the end? </p>
                    <input
                        type="checkbox"
                        className='swicth-toggle'
                        onClick={moveItem}
                    />
                </div>
            </div>
            <div className='footerToDo'>
                <p>Add to the todo list </p>
                <div className='footerAdd'>
                    <input
                        type="text"
                        value={job.nameJob}
                        onChange={() => handleChange(event)}
                    />
                    <button onClick={addToDo}>{flag == -1 ? "ADD ITEM" : "UPDATE"}</button>
                </div>

            </div>
        </div>
    )
}
