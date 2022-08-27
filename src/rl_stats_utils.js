// rl_stats_utils.gs
// Author: Josh Dye
// 08/26/2022

// Function to count the total number of wins and losses for a given team in a range of seasons
// Arguments:
//     arg[0]: must be team to calculate wins and losses
//     arg[1:]: seasons to get wins and losses from in the format "'{season_name}'!D3:E13" without the {}
//
// Returns:
//     number of wins and losses in adjacent columns of the same row
function get_teams_wins_and_losses() {
  var team_of_three;
  let args = Array.from(arguments);
  var seasons = args.slice(1);
  var all_teams_wins_losses;
  var wins = 0;
  var losses = 0;

  if (typeof args[0] != 'string') { return "Invalid Input: First argument must be a team of 3 (single cell)"; }

  team_of_three = args[0];
  
  // get team to check  
  const team = team_of_three.split(',');
  team.forEach(person => person.trim());
  team.sort();

  for (season in seasons) {
    all_teams_wins_losses = SpreadsheetApp.getActiveSpreadsheet().getRange(seasons[season]).getDisplayValues();

    // wins proc
    wins += count_occurences(team, all_teams_wins_losses, 0);

    // loss proc
    losses += count_occurences(team, all_teams_wins_losses, 1);
  } 

  return [[wins,losses]];
}

// Function to count the number of times a single team of 3 appears in a list of teams
// Arguments:
//     arg[0]: single team to check for 
//     arg[1]: 2d array with all winning and losing teams
//     arg[2]: column index of for each row in 2d array to check (0=wins, 1=losses)
//
// Returns:
//     number of occurences
function count_occurences(ateam, teams_to_check, index) {
  var occurences = 0;
  var other_team_str = '';

  for (row in teams_to_check) {
    other_team_str = teams_to_check[row][index];
    const other_team_arr = other_team_str.split(',');
    other_team_arr.forEach(person => person.trim());
    other_team_arr.sort();

    if (JSON.stringify(ateam) == JSON.stringify(other_team_arr)) { occurences += 1; }
  }

  return occurences;
}
