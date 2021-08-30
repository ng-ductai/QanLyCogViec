import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import {connect} from 'react-redux'
import * as actions from './../actions/index'

class TaskItem extends Component {

    showStatusElement(){
        return (
            <span
                className={ this.props.task.status ? 'label-danger' : 'label-info' }
                onClick={ this.onUpdateStatus }
            >{ this.props.task.status === true ? 'Doing' : 'Done' }</span>
        );
    }

    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id)
    }

    onDeleteItem = () => {
        this.props.onDeleteTask(this.props.task.id); //dispatch(actions.deleteItem)
        this.props.onCloseForm()
    }

    onEditTask = () => {
        this.props.onOpenForm();
        this.props.onEditTask(this.props.task)
    }

    render() {
        return (
            <tr>
                <td>{ this.props.index }</td>
                <td>{ this.props.task.name }</td>
                <td className="text-center">
                    { this.showStatusElement() }
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning mr-10" onClick={ this.onEditTask }>
                        <span className="fa fa-pencil"></span>
                    </button>
                    &nbsp;
                    <button type="button" className="btn btn-danger" onClick={ this.onDeleteItem }>
                        <span className="fa fa-trash"></span>
                    </button>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = state => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return{
        onUpdateStatus : (id) => {
            dispatch(actions.updateStatus(id))
        },
        onDeleteTask : (id) => {
            dispatch(actions.deleteTask(id))
        },
        onCloseForm : () => {
            dispatch(actions.closeForm())
        },
        onOpenForm : () => {
            dispatch(actions.openForm())
        },
        onEditTask: (task) => {
            dispatch(actions.editTask(task))
        }
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (TaskItem);
