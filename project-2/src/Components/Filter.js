import React from 'react';
import './Filter.css';

export default class Filter extends React.Component {
    state = {
        activeTasks: [],
        completedTasks: []
    }

    Counter(todoes) {
        this.state = { ...this.state, activeTasks: todoes.filter(e => e.status === false) }
        this.state = { ...this.state, completedTasks: todoes.filter(e => e.status === true) }
        return this.state.activeTasks.length;
    }

    render() {
        const todoes = this.props.array;
        return (
            <div className="Filter justify-content-between align-items-center p-1">
                <div className="Counter">
                    <p className="pCenter">{this.Counter(todoes)} items left</p>
                </div>
                <div className="FilterButtons">
                    <button
                        onClick={() => this.props.transmit(todoes, "all")}
                        className="fil"
                    >All</button>
                    <button
                        onClick={() => this.props.transmit(todoes, "active")}
                        className="fil"
                    >Active</button>
                    <button
                        onClick={() => this.props.transmit(todoes, "completed")}
                        className="fil"
                    >Completed</button>
                </div>
                <div className="ClearingButton">
                    <button
                        type="submit"
                        onClick={() => this.props.removeAllCompleted(this.state.completedTasks)}
                        className={this.state.completedTasks.length !== 0 ? "btn-link fil clearing" : "invisibleBut"}
                        disabled={this.state.completedTasks.length !== 0 ? false : true}
                    >Clear completed</button>
                </div>
            </div>
        )
    }
}