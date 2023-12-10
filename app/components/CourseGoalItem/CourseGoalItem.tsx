import React, { ReactNode, useState } from "react";
import Link from "next/link";
import styles from '../../page.module.css';

import Image from 'next/image';
import basketImage from "../../img/basket-delete.svg";

interface CourseGoalItemProps {
  id: string;
  onDelete: (id: string) => void;
  children: ReactNode; 
}

const CourseGoalItem: React.FC<CourseGoalItemProps> = (props) => {
  const [isChecked, setIsChecked] = useState(false);

  const deleteHandler = () => {
    props.onDelete(props.id);
  };

  const checkboxChangeHandler = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <li className={`${styles["goal-item"]}`}>
      <label style={{ cursor: "pointer" }}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={checkboxChangeHandler}
        />
        <span style={{ textDecoration: isChecked ? "line-through" : "none" }}>
          {props.children}
        </span>
      </label>
      <div className={`${styles["goal-item__button"]}`}>
        <Link href={`/task/${props.id}`} className={`${styles["goal-item__link"]}`}>Details</Link>
        <Image src={basketImage} alt="Icon: basket" onClick={deleteHandler} />
      </div>
    </li>
  );
};

export default CourseGoalItem;
