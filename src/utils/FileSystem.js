import { createAction } from 'redux-actions';
import fetch from 'isomorphic-fetch';

import * as Actions from '../store/actions';

const electron = window.require('electron');
const fs = electron.remote.require('fs');
const {app} = electron.remote.require('electron');

const createEntrySuccess = createAction(Actions.CREATE_ENTRY_SUCCESS);
const createEntryFailure = createAction(Actions.CREATE_ENTRY_FAILURE);
const createEntryRequest = createAction(Actions.CREATE_ENTRY_REQUEST);

const updateEntrySuccess = createAction(Actions.UPDATE_ENTRY_SUCCESS);
const updateEntryFailure = createAction(Actions.UPDATE_ENTRY_FAILURE);
const updateEntryRequest = createAction(Actions.UPDATE_ENTRY_REQUEST);

const syncEntriesSuccess = createAction(Actions.SYNC_ENTRIES_SUCCESS);
const syncEntriesFailure = createAction(Actions.SYNC_ENTRIES_FAILURE);
const syncEntriesRequest = createAction(Actions.SYNC_ENTRIES_REQUEST);

const loadEntriesRequest = createAction(Actions.LOAD_ENTRIES_REQUEST);
const loadEntriesSuccess = createAction(Actions.LOAD_ENTRIES_SUCCESS);
const loadEntriesFailure = createAction(Actions.LOAD_ENTRIES_SUCCESS);

const AppSupportPath = app.getPath("appData") + '/com.nick.SyncJournal'
const entryPath = AppSupportPath + '/entries';

export const syncEntries = dispatch => entries =>{
	fetch("http://www.nickmorrison.me/syncjournal/sync.php",{
		method: 'POST',
		body: JSON.stringify(entries),
		headers: {
			'Content-Type':'application/json'
		}
	})
	.then(response => response.json())
	.then(json => {
		if(json.success === true){
			
		}
	});
}

export const createEntry = dispatch => (title,body) =>{
	dispatch(createEntryRequest());
	const createDate = Date.now();
	const filepath = entryPath+"/"+createDate;
	if(!fs.existsSync(entryPath)){		
		fs.mkdirSync(entryPath);		
	}

	var content = title + "\n" + createDate + '\n' + createDate + '\n' + body;
	var fd = fs.open(filepath,'w');

	fs.writeFile(fd,content,(err)=>{
		if(err){
			dispatch(createEntryFailure(err));
			throw err;				
		}
	});
	const payload = {filename: createDate, createDate, syncDate: createDate, title,body}
	dispatch(createEntrySuccess(payload));
}

export const updateEntry = dispatch => ({filename,createDate,title,body}) =>{
	dispatch(updateEntryRequest());
	const syncDate = Date.now();
	const filepath = entryPath + "/" + filename;
	var content = title + "\n" + createDate + '\n' + syncDate + '\n' + body;
	var fd = fs.open(filepath,'w');

	fs.writeFile(fd,content,(err)=>{
		if(err){
			dispatch(updateEntryFailure(err));
			throw err;				
		}
	});
	const payload = {filename, createDate, syncDate, title,body}
	dispatch(updateEntrySuccess(payload));
}

export const loadEntries = dispatch => () =>{
	dispatch(loadEntriesRequest());
	if(!fs.existsSync(entryPath)){		
		fs.mkdirSync(entryPath);
		dispatch(loadEntriesSuccess([]));
	}
	fs.readdir(entryPath,(err,files)=>{
		if(err){
			console.log(err);
			dispatch(loadEntriesFailure(err));
			return;
		}
		var entries = [];		
		files.map((filename,index)=>{
			const filepath = entryPath + "/" + filename;
			var data = fs.readFileSync(filepath);
			var lines = data.split("\n");
			entries.push({
				filename,
				title: lines[0],
				createDate: lines[1],
				syncDate: lines[2],
				body: lines.splice(3).join("\n")
			})
		})
	})
}