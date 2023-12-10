"use client"

import React, { useState, useEffect } from "react";
import CourseGoalList from "./components/CourseGoalList/CourseGoalList";
import CourseInput from "./components/CourseInput/CourseInput";
import SearchBar from "./components/SearchBarProps/SearchBarProps";
import { nanoid } from 'nanoid';
import styles from "./page.module.css";

import Image from 'next/image';
import detectiveImage from "./img/detective-check.svg";

interface Goal {
  text: string;
  description: string;
  id: string;
}

const Page: React.FC = () => {
  const [allGoals, setAllGoals] = useState<Goal[]>(() => {
    if (typeof window !== "undefined") {
      const savedGoals = localStorage.getItem("courseGoals");
      return savedGoals ? JSON.parse(savedGoals) : [];
    }
    return [];
  });

  const [filteredGoals, setFilteredGoals] = useState<Goal[]>(allGoals);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("courseGoals", JSON.stringify(allGoals));
    }
    setFilteredGoals(allGoals);
  }, [allGoals]);

  const addGoalHandler = (enteredText: string, enteredDescription: string) => {
    setAllGoals((prevGoals) => [
      { text: enteredText, description: enteredDescription, id: nanoid() },
      ...prevGoals,
    ]);
  };

  const deleteItemHandler = (goalId: string) => {
    setAllGoals((prevGoals) =>
      prevGoals.filter((goal) => goal.id !== goalId)
    );
  };

  const handleSearch = (query: string) => {
    if (query.trim() === "") {
      setFilteredGoals(allGoals);
    } else {
      const filtered = allGoals.filter(
        (goal) =>
          goal.text.toLowerCase().includes(query.toLowerCase()) ||
          goal.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredGoals(filtered);
    }
  };

  let content = (
    <div className={styles.content}>
      <Image src={detectiveImage} alt="Photo: detective check" />
      <p style={{ textAlign: "center" }}>Empty</p>
    </div>
  );

  if (filteredGoals.length > 0) {
    content = (
      <CourseGoalList items={filteredGoals} onDeleteItem={deleteItemHandler} />
    );
  }

  return (
    <div>
      <section className={styles["goal-form"]}>
        <CourseInput onAddGoal={addGoalHandler} />
        <SearchBar onSearch={handleSearch} />
      </section>
      <section className={styles.goals}>{content}</section>
    </div>
  );
};

export default Page;
