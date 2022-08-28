// helpers.gs
// Author: Josh Dye
// 08/28/2022

// Function to check if an team (string) is already in an array
// Arguments:
//     arg[0]: array of teams
//     arg[1]: string to check for
//
// Returns:
//     true if string is already in array
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