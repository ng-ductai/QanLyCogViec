import React, { Component } from 'react';
import TaskItem from './TaskItem';
import {connect} from 'react-redux'

import * as actions from './../actions/index'

class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterName : '',
            filterStatus : -1
        };
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        var filter ={
            name: name === 'filterName' ? value : this.state.filterName ,
            status: name === 'filterStatus' ? value : this.state.filterStatus
        };
        this.props.onFilterTable(filter)
        this.setState({
            [name] : value
        });
    }

    render() {
        var { tasks, filterTable, keyword } = this.props;

        if(filterTable.name){
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(filterTable.name.toLowerCase()) !== -1
            });
        }
       
        tasks = tasks.filter((task) => {
            if(filterTable.status  === -1){
                return task;
            }else{
                return task.status === (filterTable.status === 1 ? true : false);
            }
        });            

        tasks = tasks.filter((task) => {            
            return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
            
        });   

        var elmTasks = tasks.map((task, index) => {
            return (
                <TaskItem
                    key={task.id}
                    task={task}
                    index={index + 1}
                />
            )
        });

        return (       
                <div className="row mt-15">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th className="text-center">ID</th>
                                    <th className="text-center">Work name</th>
                                    <th className="text-center">Status</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="filterName"
                                            onChange={ this.onChange }
                                            value={ this.state.filerName }
                                        />
                                    </td>
                                    <td>
                                        <select
                                            className="form-control"
                                            name="filterStatus"
                                            onChange={ this.onChange }
                                            value={ this.state.filterStatus }
                                        >
                                            <option value={-1}>All</option>
                                            <option value={0}>Done</option>
                                            <option value={1}>Doing</option>
                                        </select>
                                    </td>
                                    <td></td>
                                </tr>
                                { elmTasks }
                            </tbody>
                        </table>
                    </div>
                </div>           
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        filterTable: state.filterTable,
        keyword: state.search
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onFilterTable: (filter) => {
            dispatch(actions.filterTask(filter))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps ) (TaskList);
