import "./ButtonBox.css"
import React from "react";

class ButtonBox extends React.Component {
    render() {
        return (
            <div className="buttonbox">{this.props.children}</div>
        )
    }
}

export default ButtonBox;