// rl_stats_utils.gs
// Author: Josh Dye
// 08/28/2022

// Function to count the number of times a single team of 3 appears in a list of teams
// Arguments:
//     arg[0]: single team to check for 
//     arg[1]: 2d array with all winning and losing teams
//     arg[2]: column index of for each row in 2d array to check (0=wins, 1=losses)
//
// Returns:
//     number of occurences
//
function count_occurences(ateam, teams_to_check, index) {
  var occurences = 0;
  var other_team_str = '';
  var other_team_arr = [];

  for (row in teams_to_check) {
    other_team_str = teams_to_check[row][index];
    other_team_arr = get_sorted_team(other_team_str);

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
function get_sorted_team(team_str) { 
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
