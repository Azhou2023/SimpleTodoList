import React, { useEffect, useState } from "react";
import { getAllTasks, type Task } from "src/api/tasks";
import { TaskItem } from "src/components";
import styles from "src/components/TaskList.module.css";

export interface TaskListProps {
  title: string;
  update: boolean;
}

export function TaskList({ title, update }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    getAllTasks().then((result) => {
      if (result.success) {
        setTasks(result.data);
      } else {
        alert(result.error);
      }
    });
  }, [update]);

  return (
    <div className={styles.outer}>
      <span className={styles.title}>{title}</span>
      <br />
      <br />
      <div className={styles.items}>
        {tasks.length === 0 ? (
          <p>No tasks yet. Add one above to get started.</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li key={task._id}>
                <TaskItem initialTask={task} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
