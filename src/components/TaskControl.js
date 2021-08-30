import React, { Component } from 'react';
import TaskSearchControl from './TaskSearchControl';

class TaskControl extends Component {
    render() {
        return (
            <div className="row mt-15">
                <TaskSearchControl />                
            </div>
        );
    }
}

export default TaskControl;
