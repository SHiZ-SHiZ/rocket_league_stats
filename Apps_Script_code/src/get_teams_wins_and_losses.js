// get_teams_wins_losses.gs
// Author: Josh Dye
// 08/27/2022

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