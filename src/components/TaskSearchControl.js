import React, { Component } from 'react';

import {connect} from 'react-redux'
import * as actions from './../actions/index'

class TaskSearchControl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword : ''
        }
    }

    onHandleChange = (event) => {
        this.setState({
            keyword : event.target.value
        });
    }

    onSearch = () => {
        this.props.onSearch(this.state.keyword);
    }

    render() {
        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8">
                <div className="input-group">
                    <input
                        name="keyword"
                        value={this.state.keyword}
                        type="text"
                        className="form-control"
                        placeholder="Keyword..."
                        onChange={this.onHandleChange}
                    />
                    <span className="input-group-btn">
                        <button className="btn btn-primary" type="button" onClick={this.onSearch}>
                            <span className="fa fa-search mr-5"></span>Search
                        </button>
                    </span>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
       
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSearch: (keyword) => {
            dispatch(actions.searchTask(keyword))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps ) (TaskSearchControl);


