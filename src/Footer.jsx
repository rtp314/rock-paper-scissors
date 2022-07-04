import React, { useRef, useState } from "react";
import { ReactComponent as RulesImg } from "./images/image-rules.svg";
import { ReactComponent as Close } from "./images/icon-close.svg";

export default function Footer() {
    const rulesModal = useRef();
    const [showRules, setShowRules] = useState(false);

    function handleClose(e) {
        if (e.currentTarget === e.target) {
            setShowRules(false);
        }
    }

    return (
        <footer>
            <button onClick={() => setShowRules(true)}>Rules</button>
            {showRules && (
                <div ref={rulesModal} id='rules-modal' onClick={handleClose}>
                    <div id='rules'>
                        <div className='flex-between'>
                            <span>Rules</span>
                            <span onClick={() => setShowRules(false)}>
                                <Close />
                            </span>
                        </div>
                        <RulesImg />
                    </div>
                </div>
            )}
        </footer>
    );
}
