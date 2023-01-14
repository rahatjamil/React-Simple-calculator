import "./Screen.css"
import React from "react";
import { Textfit } from 'react-textfit';

class Screen extends React.Component {
    render() {
        return (
            <Textfit className="screen" mode="single" max={50}>{this.props.display}</Textfit>
        )
    }
}

export default Screen;