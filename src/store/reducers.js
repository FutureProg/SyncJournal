import * as Actions from './actions';
import {combineReducers} from 'redux'

const sideBarState = (
	state ={
		open: true
	},
	action
)=>{
	switch(action.type){
		case Actions.SIDEBAR_OPEN:
		return {
			...state,
			open: true
		}
		case Actions.SIDEBAR_CLOSE:
		return {
			...state,
			open: false
		}
		default:
		return state;
	}
}

const syncState = (
	state ={
		entries: [],
		syncing: false,
		success: true
	},
	action
)=>{
	switch(action.type){
		default:
		return state;
	}
}

const editorState = (
	state={
		entries: [],
		currentEntry:null				
	},
	action
) =>{
	switch(action.type){
		case Actions.CREATE_ENTRY_SUCCESS:
		return {
			...state,
			entries: [
				{
					filename: action.payload.filename,
					createDate: action.payload.createDate,
					syncDate: action.payload.syncDate,
					title: action.payload.title,
					body: action.payload.body					
				},
				...state.entries
			],
			currentEntry: 0
		}
		case Actions.LOAD_ENTRIES_SUCCESS:
		case Actions.SYNC_ENTRIES_SUCCESS:
		return {
			...state,
			entries: action.payload.entries,			
		}		
		default:
		return state;
	}
}

export default combineReducers({
	sideBarState,
	syncState,
	editorState
})