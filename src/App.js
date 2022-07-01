import React, { useState } from "react";
import Footer from "./Footer";
import Game from "./Game";
import Header from "./Header";

function App() {
    const [score, setScore] = useState(0);
    return (
        <div id='app'>
            <Header score={score} />
            <Game setScore={setScore} />
            <Footer />
        </div>
    );
}

export default App;
