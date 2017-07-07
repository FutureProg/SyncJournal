import React from 'react';
import {connect} from 'react-redux';

const monthNamesEN = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const monthNamesFR = ["javnier", "fevrier", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "decembre"
];

class EntryList extends React.Component{

	render(){
		const items = this.props.entries.map((entry,index)=><EntryListItem title={entry.title} createDate={entry.date} syncState={-1}/>)
		//const items = <EntryListItem title={"Title"} createDate={1499043128093} syncState={-1}/>
		return (
			<div id="entry-list" className={!this.props.sidebarOpen? "closed": ""}>	
				{items}
			</div>
		)
	}

}

const mapStateToProps = state =>({
	sidebarOpen : state.sideBarState.open,
	entries: state.editorState.entries
})

export default connect(mapStateToProps)(EntryList);

class EntryListItem extends React.Component{

	constructor(props){
		super(props);
		const date = new Date(this.props.createDate);				
		const month =(()=> {		
			if(navigator.language.startsWith("fr")) return monthNamesFR[date.getMonth()];
			else return monthNamesEN[date.getMonth()];
		})();
		const day = date.getDate();
		const year = date.getFullYear();
		this.createDate = (()=>{
			if(navigator.language.startsWith("fr")) return "Creé " + day + " " + month + " " + year;
			else return "Created " + month + " " + day + ", " + year;
		})();
		console.log(day);
	}

	render(){
		return (
			<div className="item">
				<div className="title">{this.props.title}</div>
				<div className="create-date">{this.createDate}</div>
				{	this.props.syncing? 
					<div className="sync-bar">
						<div className="fill" style={{width:"50%"}}></div>
					</div>
					: null
				}
			</div>
		)
	}

}