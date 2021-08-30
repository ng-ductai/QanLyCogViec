import React, { Component } from 'react';
import {connect} from 'react-redux'

import * as actions from './../actions/index'

class TaskForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            status: true
        };
    }

    componentWillMount() {
        if(this.props.itemEditing && this.props.itemEditing.id !== null){
            this.setState({
                id : this.props.itemEditing.id,
                name : this.props.itemEditing.name,
                status : this.props.itemEditing.status
            });
        }else{
            this.onClear();
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.itemEditing){
            this.setState({
                id : nextProps.itemEditing.id,
                name : nextProps.itemEditing.name,
                status : nextProps.itemEditing.status
            });
        }else{
            this.onClear();
        }
    }

    onHandleChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name] : value
        });
    }

    onSave = (event) => {
        event.preventDefault();
        this.props.onSaveTask(this.state)
        this.onClear();
        this.onExitForm();
    }

    onClear = () => {
        this.setState({            
            name : '',
            status : true
        });
    }

    onExitForm = () => {
        this.props.onCloseForm();
    }

    render() {
        if(!this.props.isDisplayForm) return null;
        return (
            
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title text-center">
                        { !this.state.id ? 'Add work' : 'Update work' }
                        <span
                            className="fa fa-times text-right"
                            onClick={this.onExitForm}
                        ></span>
                    </h3>
                </div>
                <br />               
                    
                <div className="panel-body">
                    <form onSubmit={this.onSave} >
                        <div className="form-group">
                            <label>Work name:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={this.state.name}
                                onChange={ this.onHandleChange }
                            />
                        </div>
                        <br />
                        <label>Status:</label>
                        <select
                            className="form-control"
                            value={this.state.status}
                            onChange={this.onHandleChange}
                            name="status"
                        >
                            <option value={true}>Doing</option>
                            <option value={false}>Done</option>
                        </select>
                        <br/>
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning mr-10">
                                <span className="fa fa-plus mr-5"></span>Save
                            </button>
                            <button type="button" onClick={ this.onClear } className="btn btn-danger">
                                <span className="fa fa-undo mr-5"></span>Reset
                            </button>
                        </div>
                    </form>
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
    return {
        onSaveTask: (task) => {
            dispatch(actions.saveTask(task))
        },
        onCloseForm : () => {
            dispatch(actions.closeForm())
        },
       
    }
}
export default connect (mapStateToProps, mapDispatchToProps) (TaskForm);
