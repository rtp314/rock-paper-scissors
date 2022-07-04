import React, { useEffect, useState, useRef } from "react";

export default function Header({ score }) {
    const [scoreGhostText, setScoreGhostText] = useState("");
    const oldScore = useRef(0);
    const scoreGhostDiv = useRef();

    useEffect(() => {
        const scoreChange = score - oldScore.current;
        if (scoreChange === 0) {
            setScoreGhostText("+0"); //never actually shows, since useEffect doesn't fire
        } else if (scoreChange > 0) {
            setScoreGhostText("+1");
        } else {
            setScoreGhostText("-1");
        }
        oldScore.current = score;
        scoreGhostDiv.current.classList.add("score-ghost-animate");
        setTimeout(() => {
            scoreGhostDiv.current.classList.remove("score-ghost-animate");
        }, 1000);
    }, [score]);

    return (
        <header>
            <div className='title'>
                <div>Rock</div>
                <div>Paper</div>
                <div>Scissors</div>
            </div>
            <div className='score'>
                <span>SCORE</span>
                <span>{score}</span>
                <div ref={scoreGhostDiv} className='score-ghost'>
                    {scoreGhostText}
                </div>
            </div>
        </header>
    );
}
