import "./App.scss"
import { ReactComponent as Add } from "./assets/icons/add.svg"
import AddEditTaskForm from "./components/AddEditTaskForm"
import Button from "./components/Button"
import DeleteModal from "./components/DeleteModal"
import TaskCard from "./components/TaskCard"
import { taskList } from "./siteData/taskList"

import { useState, useContext } from "react"
import { AppContext } from "./context/state"

const App = () => {
  const state = useContext(AppContext)
  const { modalOpen, updateModalOpen } = state

  return (
    <div className="container">
      <div className="page-wrapper">
        <div className="top-title">
          <h2>Task List</h2>
          <Button
            title="Add Task"
            icon={<Add />}
            onClick={() => updateModalOpen('addAndEditModal', true)}
          />
        </div>
        <div className="task-container">
          {taskList.map((task) => (
            <div key={task.id}>
              <TaskCard task={task} />
            </div>
          ))}
        </div>
      </div>
      {modalOpen.addAndEditModal && <AddEditTaskForm />}
      {modalOpen.deleteModal && <DeleteModal />}
    </div>
  )
}

export default App
