// import React from "react";
import React, { useState } from "react";



function Form(props) {
    const [name, setName] = useState('');  //state作ってる
    function handleChange(e) {
        setName(e.target.value);  //ここで入力欄の値を取ってきてnameに入れてる
    }
    function handleSubmit(e) {
        // event(e)とは...そもそもその時のinputタグの状態や情報が全て詰まっているって感じ
        // preventDefaultとは...元々ブラウザでスペース押すと多分下に遷移するけどそういうやつを消せる

        e.preventDefault();  //お前(Formタグ)送信するときにenter押されても画面スクロールすなよ！てこと
        props.addTask(name);  //setNameでnameに保存してるやつをaddTaskの引数nameに渡す→App.jsへ
        setName("");  //送信後は最初の空欄に戻す
    }
    return (
        <form onSubmit={handleSubmit}>
            <h2 className="label-wrapper">
                <label htmlFor="new-todo-input" className="label__lg">
                    What needs to be done?
                </label>
            </h2>
            <input
                type="text"
                id="new-todo-input"
                className="input input__lg"
                name="text"
                autoComplete="off"
                value={name}
                onChange={handleChange}
            />
            <button type="submit" className="btn btn__primary btn__lg">
                Add
            </button>
        </form>
    );
}

export default Form;