import React from "react";
import {Link} from "react-router-dom";

const Home = () => {
    return (<div>
        <div>Home components</div>
        <button onClick={() => console.log("Test")}>Test</button>
        <Link to="/users">Test</Link>
    </div>)
}

export default {component: Home};