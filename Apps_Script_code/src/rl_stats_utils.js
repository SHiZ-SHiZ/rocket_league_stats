// rl_stats_utils.gs
// Author: Josh Dye
// 08/28/2022

// Function converts strings of sheet names (in an array) into a range with the sheet name and input range
// Arguments:
//     arg[0:]: array of string seasons (sheet_names) in the format ["sheet_name", ...]
//
// Returns:
//     array of string seasons (sheet_names) with the full range spec concatenated
//
function getFullRange(seasons, needed_range) {

  for (season in seasons) {
    seasons[season] = "'" + seasons[season] + "'!" + needed_range;
  }

  return seasons;
}

// Function to count the number of times a single team of 3 appears in a list of teams
// Arguments:
//     arg[0]: single team to check for 
//     arg[1]: 2d array with all winning and losing teams
//     arg[2]: column index of for each row in 2d array to check (0=wins, 1=losses)
//
// Returns:
//     number of occurences
//
function countOccurences(ateam, teams_to_check, index) {
  var occurences = 0;
  var other_team_str = '';
  var other_team_arr = [];

  for (row in teams_to_check) {
    other_team_str = teams_to_check[row][index];
    other_team_arr = getSortedTeam(other_team_str);

    if (JSON.stringify(ateam) == JSON.stringify(other_team_arr)) { occurences += 1; }
  }

  return occurences;
}

// Function to sort a team of three
// Arguments:
//     arg[0]: single team to sort
//
// Returns:
//     sorted array of team members
//
function getSortedTeam(team_str) { 
  var sorted_team_arr = [];
  const team_arr = team_str.split(',');
  
  for (person in team_arr) {
    sorted_team_arr[person] = team_arr[person].trim();
  }

  return sorted_team_arr.sort();;
}

// Function to check if an team (string) is already in an array
// Arguments:
//     arg[0]: array of teams
//     arg[1]: string to check for
//
// Returns:
//     true if string is already in array
//
function isTeamInArray(team_arr, testTeam_str){
  for(var i = 0; i<team_arr.length; i++){
    num_matching_chars = 0;
    for (var j = 0; j<testTeam_str.length; j++) {
      if (team_arr[i][j] == testTeam_str[j]) { num_matching_chars += 1; }
    }

    if (num_matching_chars == testTeam_str.length) { return true; }
  }
  return false;
}

// Function to get input list of seasons from user
// Returns:
//      array of user input seasons ( arr[string] )
//
function getSeasonInput() {
  var out_arr = [];
  var ui = SpreadsheetApp.getUi();
  
  var response = ui.alert("**IMPORTANT** This should only be selected while creating an 'overall' sheet. If you're on a sheet that has data already that data WILL be OVERWITTEN. Are you sure you want to continue?", ui.ButtonSet.YES_NO);

  if (response == ui.Button.NO) { return; }

  response = ui.prompt("Enter the seasons (sheet names) you want to include. e.g. Season 1, Season 2, Season 3")
  const seasons_arr = response.getResponseText().split(',');

  if (seasons_arr.length == 0) { return "Error: Must provide seasons as arguments!"; }

  for (season in seasons_arr) {
    out_arr[season] = seasons_arr[season].trim();
  }

  return out_arr;
}