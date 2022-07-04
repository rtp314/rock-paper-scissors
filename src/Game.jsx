import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as Rock } from "./images/icon-rock.svg";
import { ReactComponent as Paper } from "./images/icon-paper.svg";
import { ReactComponent as Scissors } from "./images/icon-scissors.svg";

function gameResults(myPlay, opponentsPlay) {
    if (myPlay === "rock") {
        if (opponentsPlay === "rock") {
            return "draw";
        } else if (opponentsPlay === "paper") {
            return "lose";
        } else if (opponentsPlay === "scissors") {
            return "win";
        }
    } else if (myPlay === "paper") {
        if (opponentsPlay === "rock") {
            return "win";
        } else if (opponentsPlay === "paper") {
            return "draw";
        } else if (opponentsPlay === "scissors") {
            return "lose";
        }
    } else if (myPlay === "scissors") {
        if (opponentsPlay === "rock") {
            return "lose";
        } else if (opponentsPlay === "paper") {
            return "win";
        } else if (opponentsPlay === "scissors") {
            return "draw";
        }
    }
}

export default function Game({ setScore }) {
    const [results, setResults] = useState({});

    function handleGame(e) {
        const myPlay = e.currentTarget.dataset.icon;
        const opponentsPlay = ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)];
        const gameResult = gameResults(myPlay, opponentsPlay);

        createBlendAnimation(e.currentTarget, document.getElementById("you-played").getBoundingClientRect());
        document.getElementById("game-guess").style.opacity = 0;
        document.getElementById("game-results").style.zIndex = 1;
        document.getElementById("game-results").style.opacity = 1;
        document.getElementById("you-played").style.opacity = 0;
        setTimeout(() => {
            document.getElementById("you-played").style.opacity = 1;
        }, 450);

        setResults({ myPlay, opponentsPlay, gameResult });
    }

    function createBlendAnimation(target, newBoundingRect, delay = 350, ease = "ease-in-out") {
        const { top, left, width, height } = target.getBoundingClientRect();
        const ghost = target.cloneNode(true);
        ghost.style.transition = `top ${delay}ms ${ease} 100ms, left ${delay}ms ${ease} 100ms, width ${delay}ms ${ease} 100ms, height ${delay}ms ${ease} 100ms`;
        ghost.style.zIndex = 10;
        ghost.style.position = "fixed";
        ghost.style.top = top + "px";
        ghost.style.left = left + "px";
        ghost.style.width = width + "px";
        ghost.style.height = height + "px";
        document.getElementById("game").append(ghost);
        window.requestAnimationFrame(() => {
            ghost.style.top = newBoundingRect.top + "px";
            ghost.style.left = newBoundingRect.left + "px";
            ghost.style.width = newBoundingRect.width + "px";
            ghost.style.height = newBoundingRect.height + "px";
            setTimeout(() => {
                ghost.remove();
            }, delay + 100);
        });
    }

    function handleReset() {
        document.getElementById("game-guess").style.opacity = 1;
        document.getElementById("game-results").style.opacity = 0;
        document.getElementById("game-results").style.zIndex = -1;
    }

    return (
        <div id='game'>
            <GameGuess handleGame={handleGame} />
            <GameResults results={results} handleReset={handleReset} setScore={setScore} />
        </div>
    );
}

const GameGuess = ({ handleGame }) => {
    return (
        <div id='game-guess'>
            <div id='game-top-row'>
                <div className='game-icon rock' data-icon='rock' onClick={handleGame}>
                    <Rock />
                </div>
                <div className='game-icon paper' data-icon='paper' onClick={handleGame}>
                    <Paper />
                </div>
            </div>
            <div className='game-icon scissors' data-icon='scissors' onClick={handleGame}>
                <Scissors />
            </div>
        </div>
    );
};

const GameResults = ({ results, handleReset, setScore }) => {
    const [showResults, setShowResults] = useState(false);
    const [showHousePlay, setShowHousePlay] = useState(false);
    const resultsDiv = useRef();
    const iconLookup = { rock: <Rock />, paper: <Paper />, scissors: <Scissors /> };
    const messageLookup = { win: "You Win!", lose: "You Lose", draw: `It's a draw` };

    function addWinAnimation(parent) {
        const div1 = document.createElement("div");
        const div2 = document.createElement("div");
        const div3 = document.createElement("div");
        div1.classList.add("win-animation");
        div2.classList.add("win-animation");
        div3.classList.add("win-animation");
        div2.appendChild(div3);
        div1.appendChild(div2);
        parent.appendChild(div1);
        return div1;
    }

    useEffect(() => {
        if (results.myPlay) {
            setTimeout(() => {
                setShowHousePlay(true);
            }, 500);
            setTimeout(() => {
                resultsDiv.current.style.width = "10ch";
            }, 1000);
            setTimeout(() => {
                if (results.gameResult === "win") {
                    const animation = addWinAnimation(document.getElementById("you-played"));
                    setTimeout(() => {
                        animation.remove();
                    }, 3000);
                    setScore((prev) => prev + 1);
                } else if (results.gameResult === "lose") {
                    const animation = addWinAnimation(document.getElementById("opponent"));
                    setTimeout(() => {
                        animation.remove();
                    }, 3000);
                    setScore((prev) => prev - 1);
                }
                setShowResults(true);
            }, 1500);
        }
    }, [results]);

    function handlePlayAgain() {
        handleReset();
        setTimeout(() => {
            setShowHousePlay(false);
            setShowResults(false);
            resultsDiv.current.style.width = "0px";
        }, 400);
    }

    return (
        <div id='game-results'>
            <div className='results-column'>
                <span>You Played</span>
                <div id='you-played' className={"game-icon " + results.myPlay}>
                    {iconLookup[results.myPlay]}
                </div>
            </div>
            <div className='results-column'>
                <div ref={resultsDiv} id='results'>
                    {showResults && messageLookup[results.gameResult]}
                </div>
                {showResults && <button onClick={handlePlayAgain}>Play Again</button>}
            </div>
            <div className='results-column'>
                <span>The House Played</span>
                <div
                    id='opponent'
                    className={showHousePlay ? "animate-pop game-icon " + results.opponentsPlay : "blank"}
                >
                    {showHousePlay && iconLookup[results.opponentsPlay]}
                </div>
            </div>
        </div>
    );
};
