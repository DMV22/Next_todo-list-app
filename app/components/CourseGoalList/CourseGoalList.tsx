import React from "react";
import CourseGoalItem from "../CourseGoalItem/CourseGoalItem";
import styles from '../../page.module.css';

interface CourseGoalListProps {
  items: { id: string; text: string }[];
  onDeleteItem: (id: string) => void;
}

const CourseGoalList: React.FC<CourseGoalListProps> = (props) => {
  return (
    <ul className={`${styles["goal-list"]}`}>
      {props.items.map((goal) => (
        <CourseGoalItem key={goal.id} id={goal.id} onDelete={props.onDeleteItem}>
          {goal.text}
        </CourseGoalItem>
      ))}
    </ul>
  );
};

export default CourseGoalList;
