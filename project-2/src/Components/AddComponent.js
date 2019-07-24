import React from 'react';
import './AddComponent.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class AddComponent extends React.Component {

    notify = () => {
        toast.info('You didn\'t write a task. Null values aren\'t added to the task list!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true
        });
    }

    isEnterPress(e) {
        const { value } = e.target;
        if (e.which === 13) {
            document.getElementById('textInp').value = '';
            let textValue = value;
            if (textValue === '') {
                this.notify();
            } else {
                this.props.addTodo(textValue);
            }
        }
    }
    render() {
        return (
            <div className={this.props.array.length === 0 ? "AddComponent shadow" : "AddComponent borderUnder"}>
                <ToastContainer/>
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