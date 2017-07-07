import React from 'react';
import {createAction} from 'redux-actions';
import {connect} from 'react-redux';

import * as ActionTypes from '../store/actions.js';

export const Actions = {
	open: createAction(ActionTypes.SIDEBAR_OPEN),
	close: createAction(ActionTypes.SIDEBAR_CLOSE)
}

class SideBar extends React.Component{

	render(){
		return (
			<div id="side-bar" className={!this.props.open? "hidden":""}>
				{this.props.children}				
			</div>
		)
	}

}

const mapStateToProps = state =>({
	open: state.sideBarState.open
})

export default connect(mapStateToProps)(SideBar);