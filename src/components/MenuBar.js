import React from 'react';
import {connect} from 'react-redux';
import {Actions as SideBar} from './SideBar';

import AddIcon from '../img/ic_add.svg';
import DeleteIcon from '../img/ic_delete.svg';
import SyncIcon from '../img/ic_sync.svg';
import CloseMenuIcon from '../img/ic_sidebar_close.svg';
import OpenMenuIcon from '../img/ic_sidebar_open.svg';

class MenuBar extends React.Component{

	constructor(props){
		super(props);
		this.toggleView = this.toggleView.bind(this);
	}

	toggleView(){
		if(this.props.open){
			this.props.closeSidebar();			
		}else{
			this.props.openSidebar();
		}
	}

	render(){
		var trashStyle = {marginTop:'25px'};
		if(this.props.open){
			trashStyle = {float:'right'}
		}

		return (
			<div id="menu-bar">
				<img alt="close sidebar" onClick={this.toggleView} src={this.props.open? CloseMenuIcon : OpenMenuIcon}/>				
				 <img alt="new entry" src={AddIcon}/>
				<img alt="sync" src={SyncIcon}/>
				<img style={trashStyle} alt="delete" src={DeleteIcon}/>
			</div>
		)
	}
}

const mapStateToProps = state =>({
	open: state.sideBarState.open
})

export default connect(mapStateToProps,{openSidebar:SideBar.open,closeSidebar:SideBar.close})(MenuBar);