import React from 'react';
import './AddComponent.css';

export default class AddComponent extends React.Component {

    isEnterPress(e) {
        const { value } = e.target;
        if (e.which === 13) {
            document.getElementById('textInp').value = '';
            let textValue = value;
            if (textValue === '') {
                alert('You didn\'t write a task. Null values aren\'t added to the task list!');
            } else {
                this.props.addTodo(textValue);
            }
        }
    }
    render() {
        return (
            <div className={this.props.array.length === 0 ? "AddComponent shadow" : "AddComponent borderUnder"}>
                <button
                    className={this.props.array.length !== 0 ? "checkAll" : "invisibleButAdd"}
                    onClick={() => this.props.checkTasks()}
                >›</button>
                <input
                    type="text"
                    id="textInp"
                    className="inp"
                    placeholder="What needs to be done?"
                    onKeyPress={(e) => this.isEnterPress(e)}
                />
            </div>
        );
    }

}