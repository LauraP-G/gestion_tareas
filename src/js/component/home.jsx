import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


const Home = () => {
  const [task, setTask] = useState("")
  const [arrayTasks, setArrayTasks] = useState([])


  const addTask = (event) => {
    if (event.key === 'Enter') {
      setArrayTasks([...arrayTasks, task])
      setTask("")
    }
  }

  const inputTask = (e) => {
    setTask(e.target.value)

  }

  const deleteTask = (index) => {
    // Creo una copia del array actual
    const newTasks = [...arrayTasks];

    // aquí se elimina el elemento en el índice especificado
    newTasks.splice(index, 1);

    // con el nuevo array cambio el valor de arrayTaks
    setArrayTasks(newTasks);
  }


  return (
    <>

      <div className="mainContainer">
        <h1>Things to do</h1>

        <div>
          <input id="addTask" name="task" className="input" type="text" onChange={inputTask} onKeyDown={addTask} placeholder="What needs to be done?" value={task} />
        </div>

        <ul>
        {arrayTasks.map((singleTask, index) => (
            <li className="list" key={index}>
              {index + 1}. {singleTask}
              <span className="iconTrash" onClick={() => deleteTask(index)}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
            </li>
          ))}
        </ul>

        <div className="pendingTask">
          {arrayTasks.length === 0 ? "No pending tasks" : `Pending tasks: ${arrayTasks.length}` }
        </div>

      </div>

    </>

  )
};

export default Home;






/* opcion para renderizar añadir tarea con una funcion 
 /* const renderTasks = () => {
    return arrayTasks.map((singleTask, index) => (
      <li className="list" key={index}>
        {index + 1}. {singleTask}
        <span className="iconTrash" onClick={() => deleteTask(index)}>
          <FontAwesomeIcon icon={faTrash} />
        </span>
      </li>
    ));
  };*/


  /*  opcion para eliminar tarea con llamando a la función tarea pendiente 
  const pendingTask = () => {
    if (arrayTasks.length === 0) {
      return "No pending tasks"
    }
    else {
      return `Pending tasks: ${arrayTasks.length}`
    }
  }*/

