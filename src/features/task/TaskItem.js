import React from "react";
import styles from "./TaskItem.module.css";

import { BsTrash } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";

import { fetchAsyncDelete, selectTask, editTask } from "./taskSlice";

const TaskItem = ({task}) => {
  const dispatch = useDispatch();

  
  return (
    <li className={styles.listItem}>
      <span 
        className={styles.cursor}
        onClick={()=>{dispatch(selectTask(task))}}
      >
      
        {task.title}
      </span>
      <div>
        <button
          className={styles.taskIcon}
          onClick={()=>dispatch(fetchAsyncDelete(task.id))}
        >
        <BsTrash/>
        </button>
        <button
          className={styles.taskIcon}
          onClick={()=>dispatch(editTask(task))}
        >
          <FaEdit/>
        </button>
      </div>
    </li> 
  );
}

export default TaskItem;