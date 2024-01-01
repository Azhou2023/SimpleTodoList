import React, { useState } from "react";
import type { Task } from "src/api/tasks";
import { CheckButton } from "src/components";
import styles from "src/components/TaskItem.module.css";
import { updateTask } from "src/api/tasks";
import { Link } from "react-router-dom";

export interface TaskItemProps {
  initialTask: Task;
}

export function TaskItem({ initialTask }: TaskItemProps) {
  const [task, setTask] = useState<Task>(initialTask);
  const [isLoading, setLoading] = useState<boolean>(false);
  const wrapperClass = task.isChecked
    ? styles.textContainer + " " + styles.checked
    : styles.textContainer;

  const handleToggleCheck = () => {
    setLoading(true);
    updateTask({ ...task, isChecked: !task.isChecked, assignee: task.assignee?._id }).then(
      (result) => {
        if (result.success) {
          setTask(result.data);
        } else {
          alert(result.error);
        }
        setLoading(false);
      },
    );
  };

  return (
    <div className={styles.outer}>
      <CheckButton checked={task.isChecked} onPress={handleToggleCheck} disabled={isLoading} />
      <div className={styles.item}>
        <div className={wrapperClass}>
          <span className={styles.title}>
            <Link to={`/task/${task._id}`}>{task.title}</Link>
          </span>
          {task.description && <span className={styles.description}>{task.description}</span>}
        </div>
        {typeof task.assignee?._id === "undefined" ? (
          <span className={styles.filler}>Not Assigned</span>
        ) : (
          <div className={styles.assignee}>
            <span className={wrapperClass}>{task.assignee?.name}</span>
            <img src="/user-icon.png" width="30px" height="30px" />
          </div>
        )}
      </div>
    </div>
  );
}
