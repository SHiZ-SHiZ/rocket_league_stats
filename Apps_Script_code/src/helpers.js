// helpers.gs

// Function to check if an array (length 3) is already in a 2d array
// Arguments:
//     arg[0]: 2d array of teams
//     arg[1]: array of to check
//
// Returns:
//     true if array is already in array
function isTeamInArray(team_arr, testTeam_Arr){
    for(var i = 0; i<team_arr.length; i++){
      if (team_arr[i][0] == testTeam_Arr[0] && team_arr[i][1] == testTeam_Arr[1] && team_arr[i][2] == testTeam_Arr[2]) { return true; }
    }
    return false
  }