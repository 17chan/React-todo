import React, { useEffect, useRef, useState } from "react";

function usePrevious(value) { //引数にはisEditingが渡されてる(true or false)

  const ref = useRef(); // refには{ current: ... }というオブジェクトが与えられる
  useEffect(() => {　
    ref.current = value;
  });
  console.log(value);　//最初false → [edit]一回押すとtrue
  console.log(ref.current);  //最初undefined → [edit]一回押すとfalse
  
  return ref.current; //true or falseが返される
}

export default function Todo(props) {

  const editFieldRef = useRef(null);　//初期値を設定して定義する
  const editButtonRef = useRef(null);　//初期値を設定して定義する
  
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');
  
  const wasEditing = usePrevious(isEditing);　//true or false

  function handleChange(e) {
    setNewName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input
          id={props.id}
          className="todo-text"
          type="text"
          value={newName}
          onChange={handleChange}
          ref={editFieldRef}　//ここにref属性を使って設定する
        />
      </div>
      <div className="btn-group">
        <button type="button" className="btn todo-cancel" onClick={() => setEditing(false)}>
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );
  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
          <input
            id={props.id}
            type="checkbox"
            defaultChecked={props.completed}
            onChange={() => props.toggleTaskCompleted(props.id)}
          />
          <label className="todo-label" htmlFor={props.id}>
            {props.name}
          </label>
        </div>
        <div className="btn-group">
          <button type="button" className="btn" onClick={() => setEditing(true)} 
          ref={editButtonRef} //ここにref属性を使って設定する
          >
            Edit <span className="visually-hidden">{props.name}</span>
          </button>
          <button
            type="button"
            className="btn btn__danger"
            onClick={() => props.deleteTask(props.id)}
          >
            Delete <span className="visually-hidden">{props.name}</span>
          </button>
        </div>
    </div>
  );

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);　//wasEditing, isEditingが変わった(再レンダリング)時にuseEffectが実行される


  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
    // <li className="todo stack-small">
    //   <div className="c-cb">
    //     {/* <input id={props.id} type="checkbox" defaultChecked={props.completed} /> */}
    //     <input
    //       id={props.id}
    //       type="checkbox"
    //       defaultChecked={props.completed}
    //       onChange={() => props.toggleTaskCompleted(props.id)}
    //     />
    //     <label className="todo-label" htmlFor={props.id}>
    //       {props.name}
    //     </label>
    //   </div>
    //   <div className="btn-group">
    //     <button type="button" className="btn">
    //       Edit <span className="visually-hidden">Eat</span>
    //     </button>
    //     <button type="button" className="btn btn__danger"  onClick={() => props.deleteTask(props.id)}>
    //       Delete <span className="visually-hidden">{props.name}</span>
    //     </button>
    //   </div>
    // </li>
}