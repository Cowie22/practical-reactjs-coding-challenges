import { ReactComponent as Close } from "../../assets/icons/close.svg"
import Button from "../Button"
import Input from "../Input"
import Modal from "../Modal"
import "./style.scss"

import { useContext, useState } from "react"
import { AppContext } from "../../context/state"
import { taskList } from "../../siteData/taskList"

const AddEditTaskForm = () => {
  const state = useContext(AppContext)
  const { updateModalOpen } = state
  const [input, handleInput] = useState({})
  const [currentPriority, handleCurrentPriority] = useState("")

  const updateInput = (evt) => {
    const { name, value } = evt.target
    handleInput({
      ...input,
      [name]: value,
    })
  }

  const handleSubmit = () => {
    if (input.title === "") {
      return
    }
    if (currentPriority === "") {
      return
    }

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

  return (
    <Modal>
      <form onSubmit={handleSubmit}>
        <div className="add-edit-modal">
          <div className="flx-between">
            <span className="modal-title">Add Task </span>
            <Close className="cp" onClick={() => updateModalOpen("addAndEditModal", false)} />
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
              title="Add"
              onClick={handleSubmit}
              disabled={input.title === "" || currentPriority === ""}
            />
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default AddEditTaskForm
