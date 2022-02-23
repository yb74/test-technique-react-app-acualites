import React from 'react';
import {NavLink} from "react-router-dom";

const Header = () => {
    return(
        <header className="flex flex-row bg-blue-400 py-4">
            <NavLink to="/" className="flex-1 text-left text-white font-semibold text-xl pl-4 flex items-center">
                <div id="icon-container" className="pr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                    </svg>
                </div>
                <div id="brand-container">Appsolute News</div>
            </NavLink>
        </header>
    )
};

export default Header;