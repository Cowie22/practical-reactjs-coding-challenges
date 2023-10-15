import Button from "../Button"
import Modal from "../Modal"
import "./style.scss"

import { useContext, useState } from "react"
import { AppContext } from "../../context/state"
import { taskList } from "../../siteData/taskList"

const DeleteModal = () => {
  const state = useContext(AppContext)
  const { updateModalOpen, deleteTaskId, updateDeleteTaskId } = state
  
  const handleDeleteTask = (id) => {
    let indexToRemove;
    for (let i = 0; i < taskList.length; i++) {
      let task = taskList[i]
      if (task.id === id) {
        indexToRemove = i
        break
      }
    }
    taskList.splice(indexToRemove, 1)
  }

  return (
    <Modal>
      <div className="delete-modal">
        <p>Are you sure you want to delete this task?</p>
        <div className="delete-modal__actions">
          <Button
            title="Delete"
            onClick={() => {
              handleDeleteTask(deleteTaskId)
              updateDeleteTaskId(null)
              updateModalOpen("deleteModal", false)
            }}
          />
          <Button
            title="Cancel"
            outline
            onClick={() => {
              updateDeleteTaskId(null)
              updateModalOpen("deleteModal", false)
            }}
          />
        </div>
      </div>
    </Modal>
  )
}

export default DeleteModal
