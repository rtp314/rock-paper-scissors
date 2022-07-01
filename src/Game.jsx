import React from "react";
import { ReactComponent as Rock } from "./images/icon-rock.svg";
import { ReactComponent as Paper } from "./images/icon-paper.svg";
import { ReactComponent as Scissors } from "./images/icon-scissors.svg";

export default function Game({ setScore }) {
    return (
        <div id='game'>
            <div id='game-top-row'>
                <div id='rock' className='game-icon'>
                    <Rock />
                </div>
                <div id='paper' className='game-icon'>
                    <Paper />
                </div>
            </div>
            <div id='scissors' className='game-icon'>
                <Scissors />
            </div>
        </div>
    );
}
