import React from "react";

function FilterButton(props) {
    return (
        <button
            type="button"
            className="btn toggle-btn"
            aria-pressed={props.isPressed} //このボタンが押されてるのか判定してる
            onClick={() => props.setFilter(props.name)} 
            //クリックされたらprops.nameつまりその押されたボタンの名前(All Active Completedのいずれか)がsetfilterによってfilterにセットされる。
        >
            <span className="visually-hidden">Show </span>
            <span>{props.name}</span>
            <span className="visually-hidden"> tasks</span>
        </button>
    );
}

export default FilterButton;