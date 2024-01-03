import { User } from "src/api/users";
import React from "react";
import styles from "src/components/UserTag.module.css";

export interface UserTagProps {
  user: User | undefined;
}

export function UserTag({ user }: UserTagProps) {
  return (
    <div>
      {user === undefined ? (
        <span>Not assigned</span>
      ) : (
        <div className={styles.items}>
          <img
            src={user.profilePictureURL === undefined ? "/user-icon.png" : user.profilePictureURL}
            width="32px"
            height="32px"
          />
          <span>{user.name}</span>
        </div>
      )}
    </div>
  );
}
