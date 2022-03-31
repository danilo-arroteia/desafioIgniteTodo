import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    const taskWithSameTitle = tasks.find(task => task.title === newTaskTitle)

    if(taskWithSameTitle) {
      return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
    }
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    

    setTasks((oldTask) => [...oldTask, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map((task) => ({ ...task }));

    const taskToBeMarkedAsDone = updatedTasks.find((item) => item.id === id);

    if (!taskToBeMarkedAsDone) return;

    taskToBeMarkedAsDone.done = !taskToBeMarkedAsDone.done;
    setTasks(updatedTasks);
  }

  function handleEditText({ taskId, taskNewTitle }: EditTaskArgs) {
    const updatedTasks = tasks.map((task) => ({ ...task }));

    const taskToBeUpdated = updatedTasks.find((item) => item.id === taskId);

    if (!taskToBeUpdated)
      return;

    taskToBeUpdated.title = taskNewTitle;

    setTasks(updatedTasks);


  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover Item', 'Tem certeza que você deseja remover esse item ?', [
      { 
        style: 'cancel',
        text: 'Não'
      },
      {
        style: 'destructive',
        text:'Sim',
        onPress: () => {
          const updatedTasks = tasks.filter((task) => task.id !== id);
    
          setTasks(updatedTasks);
        }
      }
      
    ])
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList              
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
