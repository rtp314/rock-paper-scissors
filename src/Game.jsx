import React, { useEffect, useState } from "react";
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
    function handleGame(e) {
        const myPlay = e.currentTarget.dataset.icon;
        const opponentsPlay = ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)];
        const gameResult = gameResults(myPlay, opponentsPlay);
        if (gameResult === "win") setScore((prev) => prev + 1);
        else if (gameResult === "lose") setScore((prev) => prev - 1);
        createBlendAnimation(e.currentTarget, document.getElementById("you-played").getBoundingClientRect());
        return { myPlay, opponentsPlay, gameResult };
    }

    function createBlendAnimation(target, newBoundingRect, delay = 350, ease = "ease-in-out") {
        const { top, left, width, height } = target.getBoundingClientRect();
        const ghost = target.cloneNode(true);
        ghost.style.transition = `top ${delay}ms ${ease}, left ${delay}ms ${ease}, width ${delay}ms ${ease}, height ${delay}ms ${ease}`;
        ghost.style.zIndex = 10;
        ghost.style.position = "fixed";
        ghost.style.top = top + "px";
        ghost.style.left = left + "px";
        ghost.style.width = width + "px";
        ghost.style.height = height + "px";
        target.parentNode.append(ghost);
        requestAnimationFrame(() => {
            ghost.style.top = newBoundingRect.top + "px";
            ghost.style.left = newBoundingRect.left + "px";
            ghost.style.width = newBoundingRect.width + "px";
            ghost.style.height = newBoundingRect.height + "px";
            setTimeout(() => {
                console.log("timeout ended");
                ghost.remove();
            }, delay + 100);
        });
    }

    return (
        <div id='game'>
            <GameGuess handleGame={handleGame} />
            <GameResults />
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

const GameResults = ({ results }) => {
    return (
        <div id='game-results'>
            <div id='you-played' className='game-icon rock'>
                <Rock />
            </div>
            <div className='game-icon paper'>
                <Paper />
            </div>
        </div>
    );
};
