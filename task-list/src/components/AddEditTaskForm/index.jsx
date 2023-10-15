import { ReactComponent as Close } from "../../assets/icons/close.svg"
import Button from "../Button"
import Input from "../Input"
import Modal from "../Modal"
import "./style.scss"

import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../context/state"
import { taskList } from "../../siteData/taskList"

const AddEditTaskForm = () => {
  const state = useContext(AppContext)
  const { updateModalOpen, editTask, updateEditTask } = state
  const [input, handleInput] = useState({})
  const [currentPriority, handleCurrentPriority] = useState("")

  useEffect(() => {
    if (editTask !== null) {
      const { id, priority, progress, status, title } = editTask
      handleInput({
        title: title,
      })
      handleCurrentPriority(priority)
    }
  }, [])

  const updateInput = (evt) => {
    const { name, value } = evt.target
    handleInput({
      ...input,
      [name]: value,
    })
  }

  const handleSubmit = () => {
    let newTask = {
      id: taskList.length,
      title: input.title,
      priority: currentPriority,
      status: "To Do",
      progress: 0,
    }

    taskList.unshift(newTask)
    updateModalOpen("addAndEditModal", false)
  }

  const handleEditInput = (evt) => {
    evt.preventDefault()
    const { id } = editTask
    updateModalOpen("addAndEditModal", false)

    return taskList.map((task, i) => {
      if (task.id === id) {
        task.title = input.title
        task.priority = currentPriority
      }
    })
  }

  return (
    <Modal>
      <form>
        <div className="add-edit-modal">
          <div className="flx-between">
            <span className="modal-title">Add Task </span>
            <Close
              className="cp"
              onClick={() => {
                updateModalOpen("addAndEditModal", false)
                updateEditTask(null)
              }}
            />
          </div>
          <Input
            label="Task"
            placeholder="Type your task here..."
            onChange={updateInput}
            name="title"
            required
            value={input.title ? input.title : ""}
          />
          <div className="modal-priority">
            <span>Priority</span>
            <ul className="priority-buttons">
              {["high", "medium", "low"].map((priority) => {
                return (
                  <li
                    key={priority}
                    className={currentPriority === priority ? `${priority}-selected` : priority}
                    onClick={() => handleCurrentPriority(priority)}
                  >
                    {priority}
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="flx-right mt-50">
            <Button
              title={editTask === null ? "Add" : "Edit"}
              onClick={(evt) => {
                editTask === null ? handleSubmit() : handleEditInput(evt) && updateEditTask(null)
              }}
              disabled={input.title === "" || currentPriority === ""}
            />
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default AddEditTaskForm
