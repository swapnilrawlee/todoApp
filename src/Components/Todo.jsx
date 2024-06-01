import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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

  const Alldeleted = () =>
    toast.warn("All tasks deleted...", {
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
  const deleted = () =>
    toast.warn(" tasks deleted...", {
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
      const newTask = { id: Date.now(), text: inputText };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setInputText("");
      notify();
    }
  };

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      setTasks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const deleteHandler = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    deleted();

  };

  const clearAllHandler = () => {
    if (tasks.length > 0) {
      setTasks([]);
      Alldeleted();
    }
  };

  return (
    <div className="todobox">
      <h1>DailyTask</h1>
      <div className="userInput">
        <input
          type="text"
          placeholder="write your tasks here....."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <motion.button
          whileHover={{ scale: 1.2, transition: { duration: 1 } }}
          whileTap={{ scale: 0.9 }}
          onClick={addHandler}
        >
          Add
        </motion.button>
        <ToastContainer />
      </div>
      <div className="task">
        <h3>Task List:</h3>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
            {tasks.length !== 0 ? (
              tasks.map((task) => (
                <SortableItem
                  key={task.id}
                  id={task.id}
                  task={task}
                  onDelete={deleteHandler}
                />
              ))
            ) : (
              <h4>No Tasks Available</h4>
            )}
          </SortableContext>
        </DndContext>
      </div>
      <motion.button
        whileHover={{ scale: 1.2, transition: { duration: 1 } }}
        whileTap={{ scale: 0.9 }}
        onClick={clearAllHandler}
      >
        Clear All
      </motion.button>
      <footer>
        <h6>&copy; Swapnil Rawle 2024</h6>
      </footer>
    </div>
  );
};

const SortableItem = ({ id, task, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "10px",
    border: "1px solid black",
    display: "inline-block",
    margin: "5px",
    backgroundColor: "white",
    position: "relative",
  };

  return (
   <div>
     <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <input type="checkbox" />
      {task.text}
    </li>
      <button
        onClick={(e) => {
          e.stopPropagation(); 
          onDelete(id);
        }}
      >
        Delete
      </button>
   </div>
  );
};

export default Todo;
