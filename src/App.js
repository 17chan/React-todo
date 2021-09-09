// import React from "react";
import React, { useState } from "react";
import { nanoid } from "nanoid";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

function App(props) {　// propsにはindex.jsからもらった tasks={DATA} のみが入ってる
  const [tasks, setTasks] = useState(props.tasks);　//state を作ってる
  function addTask(name) {　//Form.jsからnameを引数にもらった
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false }; //newTaskに値を諸々設定
      //  ... はスプレッド構文と呼ばれるて、配列やオブジェクトの括弧を外してくれる
      //  ['a', 'b', 'c'] → a b c
    setTasks([...tasks, newTask]); //  tasksの一番最後にnewTaskを追加する
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return {...task, completed: !task.completed}  // ★ わからん ★
      }
      return task;
    });

    setTasks(updatedTasks);
  }

  function deleteTask(id) {  // id は Todo.js の onclickのところからクリックされたタスク自身のidをもらってきてる
            // tasks.map(task => {
            //   if (id !== task.id) {
            //     console.log("id = " + id + ":" + "task.id = " + task.id);
            //   }
            // });
    const remainingTasks = tasks.filter(task => id !== task.id); //filterは配列を返すからremainingTasksは配列になってる
    setTasks(remainingTasks);  //tasksのstateをセットし直してる

  }
  const taskList = tasks.map(task => ( //  tasksの中身を一つずつ取ってきてtaskに入れ、Todo.jsのprops渡す
    <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
      />
    )
  );

  // const headingText = `${taskList.length} tasks remaining`;
  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <Form addTask={addTask} />   {/* Form.js のpropsにaddTaskを渡す */}
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;