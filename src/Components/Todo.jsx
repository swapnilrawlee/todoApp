import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion"


const Todo = () => {
  const [inputText, setInputText] = useState("");
  const [tasks, setTasks] = useState([]);

  
  const notify = () =>
    toast("Task added...", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  const removeNotify = () =>
    toast.warn("Task removed...", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });



    const addHandler = () => {
        if (inputText.trim() !== "") {
            const updatedTasks = [...tasks, inputText];
      setTasks(updatedTasks);
      setInputText("");
      notify();
    }
  };

  const deleteHandler = (id) => {
    const updatedTasks = tasks.filter((_, index) => index !== id);
    setTasks(updatedTasks);
    removeNotify()

  };
  const constraintsRef = useRef(null)
  
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
    console.log("get "+ storedTasks);
  }, []);

  useEffect(() => {
   const storedTasks= localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("set"+storedTasks);
  }, [tasks]);
  
  return (
      <div  ref={constraintsRef} className="todobox">
        <h1>DailyTask </h1>
      <div className="userInput">
      
        <input
          type="text"
          placeholder="write your tasks here....."
          value={inputText}
          draggable={true}
          onChange={(e) => setInputText(e.target.value)}
        />
        <motion.button  whileHover={{
    scale: 1.2,
    transition: { duration: 1 },
  }}
  whileTap={{ scale: 0.9 }} onClick={()=>{addHandler()}}>Add</motion.button>
        <ToastContainer />
      </div>
      <div className="task">
        <ul>
            <h3>Task List :</h3>
            {tasks.length !== 0 ? (
  <ul>

    {tasks.map((task, id) => (
      <motion.div drag
      dragConstraints={constraintsRef} key={id} >
    <li key={id}  >
        {task}{" "}
        <i
          onClick={() => deleteHandler(id)}
          className="ri-close-fill"
        ></i>
      </li>
        </motion.div>

    ))}
  </ul>
) : (
  <h4>No Tasks Available</h4>
)}

        </ul>
      </div>
      <footer>
        <h6>&copy;copyright by Swapnil Rawle 2024.....</h6>
      </footer>
    </div>
  );
};

export default Todo;
