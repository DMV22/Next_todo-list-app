"use client"

import React, { useState, useEffect } from "react";
import styles from './page.module.css';

// @ts-ignore
const TodoPage = ({ params }) => {
  const [taskList, setTaskList] = useState(() => {
    if (typeof window !== "undefined") {
      const storedTasks = localStorage.getItem("courseGoals");
      return storedTasks ? JSON.parse(storedTasks) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("courseGoals", JSON.stringify(taskList));
    }
  }, [taskList]);

  const currentTask = taskList.find((task: { id: string; }) => task.id === String(params.id));

  return (
    <div className={styles.main}>
      {currentTask ? (
        <div>
          <a className={styles.button} href='/'>Back</a>
          <h1 className={styles.text}>{currentTask.text}</h1>
          <div className={styles.info}>
            <h3 className={styles.text}>{currentTask.description}</h3>
          </div>
        </div>
      ) : (
        <h3>{currentTask.text}</h3>
      )}
    </div>
  );
}

export default TodoPage;

