import React, { useState } from "react";
import Button from "../UI/Button/Button";
import styles from '../../page.module.css';

interface CourseInputProps {
  onAddGoal: (enteredValue: string, description: string) => void;
}

const CourseInput: React.FC<CourseInputProps> = (props) => {
  const [enteredValue, setEnteredValue] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);

  const goalInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
    setEnteredValue(event.target.value);
  };

  const descriptionInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
    setDescription(event.target.value);
  };

  const formSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (enteredValue.trim().length === 0 || description.trim().length === 0) {
      setIsValid(false);
      return;
    }
    props.onAddGoal(enteredValue, description);
    setEnteredValue("");
    setDescription("");
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div
        className={`${styles["form-control"]} ${!isValid && styles.invalid}`}
      >
        <label>TODO LIST</label>
        <input type="text" onChange={goalInputChangeHandler} value={enteredValue} />
      </div>
      <div className={`${styles["form-control"]} ${!isValid && styles.invalid}`}>
        <label>Description</label>
        <input type="text" onChange={descriptionInputChangeHandler}
          value={description}
        />
      </div>
      <Button type="submit">Add Goal</Button>
    </form>
  );
};

export default CourseInput;
