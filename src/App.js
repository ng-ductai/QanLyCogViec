
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import React, { Component } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import {connect} from 'react-redux'
import * as actions from './actions/index'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {                       
            keyword : ''        
        };
    }
    
    findIndex = (id) => {
        var { tasks } = this.state;
        var result = -1;
        tasks.forEach((task, index) => {
            if(task.id === id){
                result = index;
            }
        });
        return result;
    }
   
    onToggleForm = () => {
        var {itemEditing} = this.props
        if(itemEditing && itemEditing.id !== ''){
            this.props.onOpenForm()
        }
        else{
            this.props.onToggleForm()
        }
        this.props.onClearTask(
            {
                id: '',
                name: '',
                status: true
            }
        )
    }

    onSearch = (keyword) => {
        this.setState({
            keyword : keyword
        });
    }

    render() {      

        var {isDisplayForm} = this.props
          
        return (
            <div className="container">
                <div className="text-center mb-30">
                    <h1>Work management</h1>
                </div>
                
                <div className="row">
                    <div className={ isDisplayForm === true ? 'col-xs-12 col-sm-12 col-md-12 col-lg-4 mb-20' : '' }>
                        <TaskForm /> 
                    </div>
                    
                    <div className={ isDisplayForm === true ? 'col-xs-12 col-sm-12 col-md-12 col-lg-8' : 'col-xs-122 col-sm1212 col-m12-12 col-lg-12' }>
                        <div className="panel">
                            <div className="row">
                            
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-5 text-center ">
                                    <button type="button" className="btn btn-primary mt-12" onClick={this.onToggleForm} >
                                        <span className="fa fa-plus mr-5 "></span>Add work
                                    </button>
                                </div>
                                
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-7 text-center">
                                    <TaskControl onSearch={this.onSearch}  />
                                </div>                         
                            
                            </div>                            
                            
                            <TaskList  />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isDisplayForm: state.isDisplayForm,
        itemEditing: state.itemEditing
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return{
        onToggleForm : () => {
            dispatch(actions.toggleForm())
        },
        onClearTask: (task) => {
            dispatch(actions.editTask(task))
        },
        onOpenForm : () => {
            dispatch(actions.openForm())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (App);
