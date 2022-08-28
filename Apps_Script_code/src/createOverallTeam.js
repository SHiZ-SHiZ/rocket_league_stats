// createOverallTeam.gs
// Author: Josh Dye
// 08/28/2022

// Function to get an array of all teams who have played a game in given sheets
// Arguments:
//     arg[0:]: seasons to get teams from in the format ["'{sheet_name}'!D3:E13", ...] without the {}
//
// Returns:
//     array of all teams who have played a game
function getAllTeams() {
  let seasons = Array.from(arguments);
  var all_teams_all_seasons = [];
  var team_str = "";
  var team_arr = [];
  
  for (season in seasons) {
    all_teams_wins_losses = SpreadsheetApp.getActiveSpreadsheet().getRange(seasons[season]).getDisplayValues();
  
    for (row in all_teams_wins_losses) {
      for (column in all_teams_wins_losses[row]) {
        team_str = all_teams_wins_losses[row][column];
        team_arr = get_sorted_team(team_str);
  
        if (!isTeamInArray(all_teams_all_seasons, team_arr.join(", "))) { all_teams_all_seasons.push(team_arr.join(", ")); }
      }
    }
  }
  
  return all_teams_all_seasons.sort();
}
  
// Function to count the total number of wins and losses for a given team in a range of seasons
// Arguments:
//     arg[0]: must be team to calculate wins and losses
//     arg[1:]: seasons to get wins and losses from in the format "'{season_name}'!D3:E13" without the {}
//
// Returns:
//     number of wins and losses in adjacent columns of the same row
function getTeamsWinsAndLosses() {
  var team_of_three;
  let args = Array.from(arguments);
  var seasons = args.slice(1);
  var all_teams_wins_losses;
  var wins = 0;
  var losses = 0;
  var team = [];

  if (typeof args[0] != 'string') { return "Invalid Input: First argument must be a team of 3 (single cell)"; }

  team_of_three = args[0];
  
  // get team to check  
  team = get_sorted_team(team_of_three);

  for (season in seasons) {
    all_teams_wins_losses = SpreadsheetApp.getActiveSpreadsheet().getRange(seasons[season]).getDisplayValues();

    // wins proc
    wins += count_occurences(team, all_teams_wins_losses, 0);

    // loss proc
    losses += count_occurences(team, all_teams_wins_losses, 1);
  } 

  return [[wins,losses]];
}