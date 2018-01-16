//Code to Sends data to local storage. This event will handle the submite event of the form. notice is using the id of the form element in html.
//Then the saveIssue function is defined. The parameter passed is the event (e).
document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

//Retriving the data from the input submitted with document getelementbyid (the input for that data) and .value
function saveIssue(e) {
	var issueDesc = document.getElementById('issueDescInput').value;
	var issueSeverity = document.getElementById('issueSeverityInput').value;
	var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
	//Use the chance.guid() to get a global unit identifier and asigned to the variable.
	var issueId = chance.guid();
	//Open is the initial status.
	var issueStatus = 'Open';

	//Create an object variable named issue that will containe variables with the data from the input
	var issue = {
		id: issueId,
		description: issueDesc,
		severity: issueSeverity,
		assignedTo: issueAssignedTo,
		status: issueStatus
	}
	//Check if there is something in localstorage. if null initialize an empty array, in which will be pushed a issue object.
	if (localStorage.getItem('issues') == null) {
		var issues = [];
		issues.push(issue);
		localStorage.setItem('issues', JSON.stringify(issues));
	} else {
	//If something we retrive everything that there is and storage in the variable array issues, then push the new object.
		var issues = JSON.parse(localStorage.getItem('issues'));
		issues.push(issue);
		//Then send all back to localstorage.
		localStorage.setItem('issues', JSON.stringify(issues));
	}
	//We need to reset our input elements. make sure that everything in the form is inicialize.
	document.getElementById('issueInputForm').reset();
	//Calling the fetch function again.
	fetchIssues();
	//Prevent the form from submitting.
	e.preventDefault();
}


//Functions to close an issue posted. Get localstorag issues and put it in issues variable array
//Now compare the id elements of localstorage with the id passed, if match it will close it.
//Get everything back to localstorage, and call fetchissues again.
//Now the delet event with similar data structure.
function setStatusClosed(id) {
	var issues = JSON.parse(localStorage.getItem('issues'));
	for (var i = 0; i < issues.length; i++) {
		if (issues[i].id == id) {
			issues[i].status = 'Closed';
		}
	}

	localStorage.setItem('issues', JSON.stringify(issues));

	fetchIssues();
}


//Now the delet event with similar data structure.
function deleteIssue(id) {
	var issues = JSON.parse(localStorage.getItem('issues'));
	for (var i = 0; i < issues.length; i++) {
		if (issues[i].id == id) {
			issues.splice(i, 1);
		}
	}

	localStorage.setItem('issues', JSON.stringify(issues));

	fetchIssues();
}


//This function will fetch (retrive) the list of issues to post, in many points of time.
//It has variables that will storage the list of current issues, and ?
// for loop will run over every issue in the list and storage the elements of the issue in variables.
//Then we link to the html div element in which we are going to post the issues, using the div id and the innerhtml functionality.
//Notice the onclik functionality for the buttons attaching an event function that is in this script.(the function is passing the id as parameter)
//Check element and make sure it is empy.
function fetchIssues() {
	var issues = JSON.parse(localStorage.getItem('issues'));
	var issuesListe = document.getElementById('issuesList');
	
	issuesList.innerHTML = '';

	for (var i = 0; i < issues.length; i++) {
		var id = issues[i].id;
		var desc = issues[i].description;
		var severity = issues[i].severity;
		var assignedTo = issues[i].assignedTo;
		var status = issues[i].status;

		issuesList.innerHTML += '<div class="well">' + 
								'<h6>Issue ID: ' + id + '</h6>' +
								'<p><span class="label label-info">' + status + '</span></p>' +
								'<h3>' + desc + '</h3>' +
								'<p><span class="glyphicon glyphicon-time"></span>' + severity + '</p>' +
								'<p><span class="glyphicon glyphicon-user"></span>' + assignedTo + '</p>' +
								'<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a>' +
								'<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>' +
								'</div>';

	}
}
