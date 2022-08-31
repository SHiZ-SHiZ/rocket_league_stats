// createOverallTeam.gs
// Author: Josh Dye
// 08/28/2022

// Row/Column Offsets
const OVERALL_TEAM_COL_OFFSET = 11;
const OVERALL_WINS_COL_OFFSET = 12;
const OVERALL_LOSSES_COL_OFFSET = 13;
const OVERALL_COLOR_HEADER_ROW = 2;
const OVERALL_COLOR_ROW_OFFSET = 3;
const OVERALL_TEAM_HEADER_ROW = 5;
const OVERALL_TEAM_NAMES_ROW_OFFSET = 6;

// Color hex values
const HEADER_CELL_COLOR = "#55a8ad"; 
const BLUE_CELL_BACKGROUND = "#0000ff";
const ORANGE_CELL_BACKGROUND = "#ff9900";

// Function to get an array of all teams who have played a game in given sheets
// Arguments:
//     arg[0:]: seasons to get teams from in the format ["'{sheet_name}'!D3:E13", ...]
//
// Returns:
//     array of all teams who have played a game in the format ["player1, player2, player3", ...]
//
function getAllTeams(seasons) {
  var all_teams_all_seasons = [];
  var team_str = "";
  var team_arr = [];

  for (let i = 0; i < seasons.length; i++) {
    all_teams_wins_losses = SpreadsheetApp.getActiveSpreadsheet().getRange(seasons[i]).getDisplayValues();

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
//     arg[1:]: seasons to get wins and losses from in the format ["'season_name'!D3:E13", ...]
//
// Returns:
//     2d array with single element containing the wins and losses
//
function getTeamsWinsAndLosses() {
  var team_of_three;
  let args = Array.from(arguments);
  var seasons = args[1];
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

// Function to create the overall wins and losses table
// Arguments:
//     arg[0]: array seasons (sheet names) to be included
//
function createOverallTeam(seasons) {
  var all_unique_teams_arr = [];
  var all_teams_wins_losses_arr = [];
  var number_orange_wins = 0;
  var number_blue_wins = 0;
  var wins_losses = [];

  if (seasons.length == 0) { return "Error: Must provide seasons as arguments!"; }

  // get all teams
  all_unique_teams_arr = getAllTeams(seasons);
  
  // get teams wins and losses
  for (team in all_unique_teams_arr) {
    wins_losses = getTeamsWinsAndLosses(all_unique_teams_arr[team], seasons);
    all_teams_wins_losses_arr.push(wins_losses[0]);
  }

  // count team color wins and losses
  for (season in seasons) {
    number_blue_wins += countBackgroundColoredCells(seasons[season].slice(0,-3) + "D13", BLUE_CELL_BACKGROUND);
    number_orange_wins += countBackgroundColoredCells(seasons[season].slice(0,-3) + "D13", ORANGE_CELL_BACKGROUND);    
  }

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var s1 = ss.getActiveSheet();

  // fill header rows
  s1.getRange(OVERALL_COLOR_HEADER_ROW, OVERALL_TEAM_COL_OFFSET, 1, 3).setValues([["Color", "Wins", "Losses"]]);
  s1.getRange(OVERALL_COLOR_HEADER_ROW+1, OVERALL_TEAM_COL_OFFSET).setValue("Orange");
  s1.getRange(OVERALL_COLOR_HEADER_ROW+2, OVERALL_TEAM_COL_OFFSET).setValue("Blue");
  s1.getRange(OVERALL_TEAM_HEADER_ROW, OVERALL_TEAM_COL_OFFSET, 1, 3).setValues([["Team", "Wins", "Losses"]]);

  // fill data
  s1.getRange(OVERALL_COLOR_ROW_OFFSET, OVERALL_TEAM_COL_OFFSET+1).setValue(number_orange_wins);
  s1.getRange(OVERALL_COLOR_ROW_OFFSET+1, OVERALL_TEAM_COL_OFFSET+1).setValue(number_blue_wins);
  s1.getRange(OVERALL_COLOR_ROW_OFFSET, OVERALL_TEAM_COL_OFFSET+2).setValue(number_blue_wins);
  s1.getRange(OVERALL_COLOR_ROW_OFFSET+1, OVERALL_TEAM_COL_OFFSET+2).setValue(number_orange_wins);

  for (var i = 0; i < all_unique_teams_arr.length; i++) {
    s1.getRange(OVERALL_TEAM_NAMES_ROW_OFFSET+i, OVERALL_TEAM_COL_OFFSET).setValue(all_unique_teams_arr[i]);
    s1.getRange(OVERALL_TEAM_NAMES_ROW_OFFSET+i, OVERALL_TEAM_COL_OFFSET+1, 1, 2).setValues([all_teams_wins_losses_arr[i]]);
  }

  // make cell borders and color
  s1.autoResizeColumn(OVERALL_TEAM_COL_OFFSET);

  s1.getRange(OVERALL_COLOR_HEADER_ROW+1, OVERALL_TEAM_COL_OFFSET).setBackgroundColor(ORANGE_CELL_BACKGROUND);
  s1.getRange(OVERALL_COLOR_HEADER_ROW+2, OVERALL_TEAM_COL_OFFSET).setBackgroundColor(BLUE_CELL_BACKGROUND);
  s1.getRange(OVERALL_COLOR_HEADER_ROW+1, OVERALL_TEAM_COL_OFFSET, 2, 1).setFontColor("#ffffff");

  s1.getRange(OVERALL_COLOR_HEADER_ROW, OVERALL_TEAM_COL_OFFSET, 1, 3).setFontWeight("bold");
  s1.getRange(OVERALL_COLOR_HEADER_ROW, OVERALL_TEAM_COL_OFFSET, 1, 3).setFontSize(14);
  s1.getRange(OVERALL_COLOR_HEADER_ROW, OVERALL_TEAM_COL_OFFSET, 1, 3).setBackgroundColor(HEADER_CELL_COLOR);

  s1.getRange(OVERALL_TEAM_HEADER_ROW, OVERALL_TEAM_COL_OFFSET, 1, 3).setFontWeight("bold");
  s1.getRange(OVERALL_TEAM_HEADER_ROW, OVERALL_TEAM_COL_OFFSET, 1, 3).setFontSize(14);
  s1.getRange(OVERALL_TEAM_HEADER_ROW, OVERALL_TEAM_COL_OFFSET, 1, 3).setBackgroundColor(HEADER_CELL_COLOR);

  s1.getRange(OVERALL_COLOR_HEADER_ROW, OVERALL_TEAM_COL_OFFSET, all_unique_teams_arr.length+4, 3).setHorizontalAlignment('center');

  s1.getRange(OVERALL_TEAM_NAMES_ROW_OFFSET, OVERALL_TEAM_COL_OFFSET, all_unique_teams_arr.length, 3).sort([{column: OVERALL_WINS_COL_OFFSET, ascending: false},
                                                                                                            {column: OVERALL_LOSSES_COL_OFFSET, ascending: true},
                                                                                                            {column: OVERALL_TEAM_COL_OFFSET, ascending: true}]);

  s1.getRange(OVERALL_TEAM_NAMES_ROW_OFFSET, OVERALL_TEAM_COL_OFFSET, all_unique_teams_arr.length, 1).setBackgroundColor("#1c4214");
  s1.getRange(OVERALL_TEAM_NAMES_ROW_OFFSET, OVERALL_TEAM_COL_OFFSET, all_unique_teams_arr.length, 1).setFontColor('white');

  s1.getRange(OVERALL_COLOR_ROW_OFFSET, OVERALL_WINS_COL_OFFSET, 2, 2).setBackgroundColor("#03fca5");
  s1.getRange(OVERALL_TEAM_NAMES_ROW_OFFSET, OVERALL_WINS_COL_OFFSET, all_unique_teams_arr.length, 2).setBackgroundColor("#03fca5");

  s1.getRange(OVERALL_COLOR_ROW_OFFSET, OVERALL_WINS_COL_OFFSET, 2, 2).setBorder(false, false, false, false, true, true, "black", SpreadsheetApp.BorderStyle.SOLID);
  s1.getRange(OVERALL_TEAM_NAMES_ROW_OFFSET, OVERALL_WINS_COL_OFFSET, all_unique_teams_arr.length, 2).setBorder(false, false, false, false, true, true, "black", SpreadsheetApp.BorderStyle.SOLID);

  s1.getRange(OVERALL_COLOR_HEADER_ROW, OVERALL_TEAM_COL_OFFSET, all_unique_teams_arr.length+4, 3).setBorder(true, true, true, true, null, null, "black", SpreadsheetApp.BorderStyle.SOLID_THICK);
  s1.getRange(OVERALL_COLOR_HEADER_ROW, OVERALL_TEAM_COL_OFFSET, all_unique_teams_arr.length+4, 1).setBorder(true, true, true, true, null, true, "black", SpreadsheetApp.BorderStyle.SOLID_THICK);
  s1.getRange(OVERALL_COLOR_HEADER_ROW, OVERALL_TEAM_COL_OFFSET, 1, 3).setBorder(true, true, true, true, true, null, "black", SpreadsheetApp.BorderStyle.SOLID_THICK);
  s1.getRange(OVERALL_TEAM_HEADER_ROW, OVERALL_TEAM_COL_OFFSET, 1, 3).setBorder(true, true, true, true, true, null, "black", SpreadsheetApp.BorderStyle.SOLID_THICK);

}