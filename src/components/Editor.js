import React from 'react';
import {connect} from 'react-redux';


class Editor extends React.Component{
	render(){
		return(
			<div id="editor" className={this.props.sidebarOpen? "":"expand"}>
				<div id="title" contentEditable placeholder="Title">
				</div>
				<div id="post-body" contentEditable placeholder="Write here...">
				</div>
			</div>
		)
	}
}

const mapStateToProps = state =>({
	sidebarOpen: state.sideBarState.open
})

export default connect(mapStateToProps)(Editor);