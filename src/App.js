// import React from "react";
import React, { useState } from "react";
import { nanoid } from "nanoid";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

function App(props) {　// propsにはindex.jsからもらった tasks={DATA} のみが入ってる
  const [tasks, setTasks] = useState(props.tasks);　//state を作ってる
  const [filter, setFilter] = useState('All');  //state を作ってる(初期値All)

  const FILTER_MAP = {
    All: () => true,
    Active: task => !task.completed,
    Completed: task => task.completed
  };

  const FILTER_NAMES = Object.keys(FILTER_MAP);
  // オブジェクトのキーを配列として取り出す。今回ならAll Active Completedの３つ


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


  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
    // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }


  const taskList = tasks.filter(FILTER_MAP[filter]).map(task => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const filterList = FILTER_NAMES.map(name => ( //All Active Completedのボタンを作りたい
    // namenにはAll Active Completedが入ってる
    <FilterButton
      key={name}　//All Active Completedのいずれか
      name={name}　//All Active Completedのいずれか
      isPressed={name === filter}
      //filterは今どれが選択されてるか。で、name === filterはボタンの中で押されてるものと一致しているか(一致してたら周りを囲む)
      setFilter={setFilter}　//setfilterはフィルターのstateを更新するやつ
    />
  ));


  // const headingText = `${taskList.length} tasks remaining`;
  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;


  return (
    <div className="todoapp stack-large">
      <Form addTask={addTask} />    {/* Form.js のpropsにaddTaskを渡す */}
      <div className="filters btn-group stack-exception">
        {filterList}    {/* All Active Completedのボタンを表示している */}
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