import React from 'react';
import './Todo_Style.css';

export default class Todo extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isEditable: false,
            whereIsTheMouse: false,
            name: props.taskName
        };
        this.inputRef = React.createRef();
    }

    componentDidUpdate() {
        this.inputRef.current.focus();
    }

    checkTask() {

        let bool = !this.props.taskStatus;
        this.props.checkTask(this.props.id, bool);
    }

    changeTextName() {
        this.setState({ isEditable: true });
    }

    isTextChange(e) {
        let textValue = e.target.value;
        this.setState({ name: textValue });
        this.props.changeText(textValue, this.props.id);
    }

    isEnterPress(e) {
        let textValue = this.state.name;
        if (e.which === 13) {
            this.setState({ isEditable: false });
            this.props.changeTaskName(textValue, this.props.id);
        }
    }

    onBlurHandler() {
        this.setState({ isEditable: false })
    }

    deleteTask() {
        const { id } = this.props;
        this.props.deleteTask(id)
    }

    classNameSpace() {
        let className = "";
        if (this.state.isEditable) {
            className += "invisibleInput";
        } else if (!this.props.taskStatus) {
            className += "visibleInput";
        } else {
            className += "visibleInput isChecked text-muted";
        }
        return className;
    }

    mouseAt() {
        this.setState({ whereIsTheMouse: true });
    }
    mouseOut() {
        this.setState({ whereIsTheMouse: false });
    }

    render() {
        return (
            <div className="Todo" >
                <div
                    className="todoBox"
                    onMouseEnter={() => this.mouseAt()}
                    onMouseLeave={() => this.mouseOut()}
                >
                    <div className="checkDiv">
                        <input
                            type="checkbox"
                            className="checkbox"
                            checked={this.props.taskStatus}
                            onChange={() => this.checkTask()}
                        />
                    </div>
                    <div className="taskName">
                        <div className="pClass"
                            onDoubleClick={(e) => this.changeTextName(e)}
                            className={this.classNameSpace()}
                        >
                            {this.props.taskName}
                        </div>
                        <input
                            rows="5"
                            className={this.state.isEditable ? "visibleInput inps" : "invisibleInput"}
                            type="text"
                            id={this.props.id}
                            onKeyPress={(e) => this.isEnterPress(e)}
                            disabled={!this.state.isEditable}
                            onBlur={() => this.onBlurHandler()}
                            onChange={(e) => this.isTextChange(e)}
                            ref={this.inputRef}
                            value={this.props.taskName}
                        />
                    </div>
                    <div className="delete">
                        <button
                            onClick={() => this.deleteTask()}
                            className={!this.state.whereIsTheMouse ? "invisibleButX" : "closeXbut"}
                        >×</button>
                    </div>
                </div>
            </div>
        )
    }
}