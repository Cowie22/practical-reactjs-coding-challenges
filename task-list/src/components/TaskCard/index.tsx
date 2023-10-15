import classNames from "classnames"
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg"
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg"
import CircularProgressBar from "../CircularProgressBar"
import "./style.scss"

import { useContext, useState } from "react"
import { AppContext } from "../../context/state"

const TaskCard = ({ task }: any) => {
  const { id, title, priority, status, progress } = task
  const state = useContext(AppContext)
  const { updateModalOpen, updateDeleteTaskId, updateEditTask } = state

  return (
    <div className="task-card">
      <div className="flex w-100">
        <span className="task-title">Task</span>
        <span className="task">{title}</span>
      </div>
      <div className="flex">
        <span className="priority-title">Priority</span>
        <span className={classNames(`${priority}-priority`, "priority")}>{priority}</span>
      </div>
      <div className="task-status-wrapper">
        <button className="status">{status}</button>
      </div>
      <div className="progress">
        <CircularProgressBar strokeWidth={2} sqSize={24} percentage={progress} />
      </div>
      <div className="actions">
        <EditIcon
          className="mr-20 cp"
          onClick={() => {
            updateEditTask(task)
            updateModalOpen("addAndEditModal", true)
          }}
        />
        <DeleteIcon
          className="cp"
          onClick={() => {
            updateDeleteTaskId(id)
            updateModalOpen("deleteModal", true)
          }}
        />
      </div>
    </div>
  )
}

export default TaskCard
