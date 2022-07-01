import React from "react";

export default function Header(props) {
    return (
        <header>
            <div className='title'>
                <div>Rock</div>
                <div>Paper</div>
                <div>Scissors</div>
            </div>
            <div className='score'>
                <span>SCORE</span>
                <span>{props.score}</span>
            </div>
        </header>
    );
}
