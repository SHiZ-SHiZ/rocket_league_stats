// get_all_teams.gs
// Author: Josh Dye
// 08/27/2022

// Function to get an array of all teams who have played a game in given sheets
// Arguments:
//     arg[0:]: seasons to get teams from in the format ["'{sheet_name}'!D3:E13", ...] without the {}
//
// Returns:
//     array of all teams who have played a game
function get_all_teams() {
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