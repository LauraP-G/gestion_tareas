
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


const Home = () => {
  const [task, setTask] = useState("")
  const [arrayTasks, setArrayTasks] = useState([])


  useEffect(() => {
   createUser();
    getTask();
   
    
  }, [])
 const createUser = () => {

    fetch('https://playground.4geeks.com/todo/users/LauraPG', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      
      body: JSON.stringify([]),
    })
      .then(resp => {
        console.log(resp.ok); // Será true si la respuesta es exitosa
        console.log(resp.status); // El código de estado 200, 300, 400, etc.
        console.log(resp.text()); // Intentará devolver el resultado exacto como string
        return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
      })

      .then(data => {
        // Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor

      })
      .catch(error => {
        // Manejo de errores
        console.log(error);
      });

  }
 


  const getTask = () => {

    fetch('https://playground.4geeks.com/todo/users/LauraPG', {
      method: "GET",
    })
    .then(resp => {
      return resp.json(); 
    })

      .then(data => {
        if (data && Array.isArray(data.todos)) { 
          setArrayTasks(data.todos);
        } else {
          console.error("Unexpected response structure:", data);
        }
      })
      .catch(error => {
        console.error("Error fetching tasks:", error);
      });


  }

 

  const postTask = () => {
    const nuevaTarea = { label: task, is_done: false };
    fetch('https://playground.4geeks.com/todo/todos/LauraPG', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(nuevaTarea),
    })
      .then(resp => resp.json()) 
      .then(data => {
        getTask();
        setTask(""); 
        console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
      })
      .catch(error => {
        console.log(error);
      });
  };



  const addTask = (event) => {
    if (event.key === 'Enter') {

      postTask();
     
    }
  }

  const inputTask = (e) => {
    setTask(e.target.value)

  }

  const deleteTask = (id) => {
    fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Network response was not ok");
        }
        return resp.text().then((text) => (text ? JSON.parse(text) : null));
      })
      .then(() => {
        setArrayTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };
  
  


  const deleteAllTasks = () => {
    // Recorrer y eliminar cada tarea por su ID
    arrayTasks.forEach((task) => {
      fetch(`https://playground.4geeks.com/todo/todos/${task.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
          if (!resp.ok) {
            throw new Error("Network response was not ok");
          }
        })
        .catch((error) => {
          console.error("Error deleting task:", error);
        });
    });

    // Una vez eliminadas todas las tareas, actualizar el estado a un array vacío
    setArrayTasks([]);
  };


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
              <span>
                {index + 1}. {singleTask.label}
              </span>

              <span className="iconTrash" onClick={() => deleteTask(singleTask.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
            </li>
          ))}
        </ul>

        <div className="pendingTask">
          {arrayTasks.length === 0 ? "No pending tasks" : `Pending tasks: ${arrayTasks.length}`}
        </div>
        <button onClick={deleteAllTasks} className="deleteAllButton">
          Delete All Tasks
        </button>

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
