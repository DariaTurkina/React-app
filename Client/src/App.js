import React from 'react';
import './App.css';
import AddComponent from './Components/AddComponent.js'
import { TaskList } from './TaskList.js'
import Authorization from './Components/Authorization.js'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const axios = require('axios');
const path = "http://localhost:1234/tasks";

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      todoes: [],
      userID: "5d398e5d44a94d9aac4ead9a",
      stateApp: "TaskList"
    }
  }

  notify(err) {
    toast.error(`${err}`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true
    });
  }

  componentDidMount() {
    axios.get(`${path}`)
      .then(res => {
        const data = res.data;
        this.setState({ todoes: data });
      })
      .catch(err => {
        this.notify(err);
      })
  }

  addTodo(nameValue) {

    let newTask = {
      name: nameValue,
      status: false,
      userID: this.state.userID
    }
    axios.post(`${path}/create`, newTask)
      .then(() => {
        axios.get(`${path}`)
          .then(res => {
            const data = res.data;
            this.setState({ todoes: data });
          })
          .catch(err => {
            this.notify(err);
          })
      })
      .catch(err => {
        this.notify(err);
      })
  }

  checkTasks() {
    let count = 0;
    let bool = true;
    for (let i = 0; i < this.state.todoes.length; i++) {
      if (this.state.todoes[i].status === false) {
        count++;
        break;
      }
    }

    if (count === 0) {
      bool = false;
    }
    for (let i = 0; i < this.state.todoes.length; i++) {
      let todo = {
        name: this.state.todoes[i].name,
        status: bool,
        id: this.state.todoes[i]._id
      }
      axios.put(`${path}/${this.state.todoes[i]._id}/update`, todo)
        .then(() => {
          this.setState(state => {
            const todoes = state.todoes.map(e => {
              e.status = bool;
              return e.status;
            });
            return { status: todoes };
          });
        })
        .catch(err => {
          this.notify(err);
        })
    }
  }

  checkTask(id, bool) {
    let thisTodo = this.state.todoes.filter(e => e._id === id);
    let todoToUpdate = {
      name: thisTodo[0].name,
      status: bool,
      id: id
    }
    axios.put(`${path}/${id}/update`, todoToUpdate)
      .then(() => {
        this.setState(state => {
          const todoes = state.todoes.map(e => {
            if (e._id === id) {
              e.status = bool;
              return e.status;
            }
          });
          return { status: todoes };
        });
      })
      .catch(err => {
        this.notify(err);
      })
  }

  deleteTask(id) {
    const newArray = this.state.todoes.filter(el => (el._id !== id));
    axios.delete(`${path}/${id}/delete`)
      .then(() => {
        this.setState({
          todoes: newArray
        });
      })
      .catch(err => {
        this.notify(err);
      })
  }

  changeText(name, id) {
    this.setState(state => {
      const updated = state.todoes.map(e => {
        if (e._id === id) {
          e.name = name;
          return e.name;
        }
      });
      return { updated, };
    });
  }

  changeTaskName(name, id) {
    let thisTodo = this.state.todoes.filter(e => e._id === id);
    let updateData = {
      name: name,
      status: thisTodo.status,
      _id: thisTodo._id,
      _v: 0
    }
    axios.put(`${path}/${id}/update`, updateData)
      .then(() => {
        this.setState(state => {
          const updated = state.todoes.map(e => {
            if (e._id === id) {
              e.name = name;
              return e.name;
            }
          });
          return { updated, };
        });
      })
      .catch(err => {
        this.notify(err);
      })
  }

  removeAllCompleted(arrayOfCompleted) {
    if (arrayOfCompleted.length !== 0) {

      let clearedFromComleted = this.state.todoes.filter(e => e._id !== arrayOfCompleted[0]._id);
      axios.delete(`${path}/${arrayOfCompleted[0]._id}/delete`)
        .then(() => {
          this.setState({
            todoes: clearedFromComleted
          });
        })
        .catch(err => {
          this.notify(err);
        })
      for (let i = 1; i < arrayOfCompleted.length; i++) {
        clearedFromComleted = clearedFromComleted.filter(e => e._id !== arrayOfCompleted[i]._id);
        axios.delete(`${path}/${arrayOfCompleted[i]._id}/delete`)
          .then(() => {
            this.setState({
              todoes: clearedFromComleted
            });
          })
          .catch(err => {
            this.notify(err);
          })
      }
    } else {
      alert("Nothing to delete");
    }
  }

  render() {
    return (
      <div className="App container" id="app">
        <ToastContainer />
        <header className="App-header text-center">todos</header>
        {this.state.stateApp === "Authorization" &&
          <Authorization/>
        }
        {this.state.stateApp === "TaskList" &&
          <div className="taskBody shadow">
            <AddComponent
              addTodo={(e) => this.addTodo(e)}
              checkTasks={() => this.checkTasks()}
              array={this.state.todoes}
            />
            <TaskList
              array={this.state.todoes}
              checkTask={(id, bool) => this.checkTask(id, bool)}
              changeTaskName={(name, id) => this.changeTaskName(name, id)}
              changeText={(name, id) => this.changeText(name, id)}
              deleteTask={(id) => this.deleteTask(id)}
              removeAllCompleted={(arrayOfCompleted) => this.removeAllCompleted(arrayOfCompleted)}
            />
          </div>
        }
      </div>
    );
  }
}
export default App;
