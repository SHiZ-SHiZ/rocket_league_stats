// createOverallPlayers.gs
// Author: Josh Dye
// 09/18/2022

// ROW/COL offsets
const OVERALL_MAIN_TABLE_START_COL = 2
const OVERALL_PLAYERS_START_COL     = 3;
const OVERALL_PLAYERS_END_COL       = 9;
const OVERALL_PLAYERS_START_ROW     = 2;
const OVERALL_PLAYERS_END_ROW       = 16;
const OVERALL_MAIN_TABLE_HEADER_OFFSET = 3
const OVERALL_PLAYERS_HEADER_OFFSET = 1;
const OVERALL_MATCHES_HEADER_OFFSET = 3;
const OVERALL_SEASONS_HEADER_OFFSET = 2;

const NUM_PLAYERS_PER_SEASON = 6;
const SEASON_PLAYER_NUM_STATS = 5;
const SEASON_PLAYER_RECORD_ROW = 9;
const GAMES_PER_SEASON = 10;

const SEASON_PLAYERS_START_COL = 7;
const SEASON_PLAYERS_END_COL = 12;
const SEASON_PLAYERS_START_ROW = 3;
const SEASON_PLAYERS_END_ROW = 11;

const OVERALL_HEADER_COLOR = "#f1c232";
const OVERALL_GOALS_COLOR = "#cfe2f3";
const OVERALL_ASSISTS_COLOR = "#fff2cc";
const OVERALL_SAVES_COLOR = "#f4cccc";
const OVERALL_SHOTS_COLOR = "#ead1dc";
const OVERALL_MVPS_COLOR = "#d9ead3";
const OVERALL_RECORD_COLOR = "#fce5cd";
const OVERALL_GPG_COLOR = "#9fc5e8";
const OVERALL_APG_COLOR = "#ffe599";
const OVERALL_SAPG_COLOR = "#ea9999";
const OVERALL_ACC_COLOR = "#d5a6bd";
const OVERALL_SHPG_COLOR = "#b6d7a8";

const STATS = ["goals", "assists", "saves", "shots", "mvp"];

class overallPlayer{

  constructor(name) {
    this.name = name;
    this.goals = 0;
    this.assists = 0;
    this.saves = 0;
    this.shots = 0;
    this.mvp = 0;
    this.record = [0,0];
  }

  getMatchesPlayed() { return this.record[0] + this.record[1]; }

  updateRecord(record) {
    this.record[0] = this.record[0] + parseInt(record[0]);
    this.record[1] = this.record[1] + parseInt(record[1]);
  }

  getPrintableRecord() {
    var output = "";

    // output = JSON.stringify(this.record[0]) + "-" + JSON.stringify(this.record[1]);
    output = this.record[0] + "-" + this.record[1];

    return output;
  }
}

function getAllPlayers(seasons) {
  var players = [];
  var isPlayerInArray;
  var val;

  var ss = SpreadsheetApp.getActiveSpreadsheet();

  for (var i = 0; i < seasons.length; i++) {
    var s1 = ss.getSheetByName(seasons[i]);
    for (var j = 0; j < NUM_PLAYERS_PER_SEASON; j++) {
      player_name = s1.getRange(SEASON_PLAYERS_START_ROW, SEASON_PLAYERS_START_COL+j, 1, 1).getDisplayValue();
      isPlayerInArray = false;
      for (player in players) {
        if (players[player].name == player_name) {
          isPlayerInArray = true;
          break;
        }
      }

      if (!isPlayerInArray) {
        let unique_player = new overallPlayer(player_name);
        players.push(unique_player);
      }

      let temp_player = players.find(p=>p.name==player_name);
      
      if (temp_player) {
 
        val = s1.getRange(SEASON_PLAYERS_START_ROW+OVERALL_PLAYERS_HEADER_OFFSET, SEASON_PLAYERS_START_COL+j, 1, 1).getDisplayValue();
        temp_player.goals += parseInt(val);
        val = s1.getRange(SEASON_PLAYERS_START_ROW+OVERALL_PLAYERS_HEADER_OFFSET+1, SEASON_PLAYERS_START_COL+j, 1, 1).getDisplayValue();
        temp_player.assists += parseInt(val);
        val = s1.getRange(SEASON_PLAYERS_START_ROW+OVERALL_PLAYERS_HEADER_OFFSET+2, SEASON_PLAYERS_START_COL+j, 1, 1).getDisplayValue();
        temp_player.saves += parseInt(val);
        val = s1.getRange(SEASON_PLAYERS_START_ROW+OVERALL_PLAYERS_HEADER_OFFSET+3, SEASON_PLAYERS_START_COL+j, 1, 1).getDisplayValue();
        temp_player.shots += parseInt(val);
        val = s1.getRange(SEASON_PLAYERS_START_ROW+OVERALL_PLAYERS_HEADER_OFFSET+4, SEASON_PLAYERS_START_COL+j, 1, 1).getDisplayValue();
        temp_player.mvp += parseInt(val);
      }

      record_str = s1.getRange(SEASON_PLAYER_RECORD_ROW, SEASON_PLAYERS_START_COL+j, 1, 1).getDisplayValue();
      const record_arr = record_str.split('-');
      temp_player.updateRecord(record_arr);
    }
  }

  return players;
}

function formatOverallPlayersRange(num_players) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var s1 = ss.getActiveSheet();

  s1.getRange(OVERALL_PLAYERS_START_ROW, OVERALL_MAIN_TABLE_START_COL, 15, num_players+1).setHorizontalAlignment('center');
  
  // header
  s1.getRange(OVERALL_PLAYERS_START_ROW, OVERALL_MAIN_TABLE_START_COL, OVERALL_MAIN_TABLE_HEADER_OFFSET, num_players+1).setBackgroundColor(OVERALL_HEADER_COLOR);
  s1.getRange(OVERALL_PLAYERS_START_ROW, OVERALL_MAIN_TABLE_START_COL, OVERALL_MAIN_TABLE_HEADER_OFFSET, num_players+1).setFontWeight("bold");
  s1.getRange(OVERALL_PLAYERS_START_ROW, OVERALL_MAIN_TABLE_START_COL, OVERALL_MAIN_TABLE_HEADER_OFFSET, num_players+1).setFontSize(14);

  s1.getRange(OVERALL_PLAYERS_START_ROW+OVERALL_MAIN_TABLE_HEADER_OFFSET, OVERALL_MAIN_TABLE_START_COL, 1, num_players+1).setBackgroundColor(OVERALL_TOTALS_HEADER_COLOR_ALT);
  s1.getRange(OVERALL_PLAYERS_START_ROW+OVERALL_MAIN_TABLE_HEADER_OFFSET, OVERALL_PLAYERS_START_COL, 1, num_players+1).setFontWeight("bold");

  // s1.getRange(OVERALL_PLAYERS_START_ROW+OVERALL_MAIN_TABLE_HEADER_OFFSET+OVERALL_PLAYERS_HEADER_OFFSET, OVERALL_MAIN_TABLE_START_COL, 11, 1).setBackgroundColor();
  s1.getRange(OVERALL_PLAYERS_START_ROW+OVERALL_MAIN_TABLE_HEADER_OFFSET, OVERALL_MAIN_TABLE_START_COL, 11, 1).setFontWeight("bold");

  s1.getRange(OVERALL_PLAYERS_START_ROW+OVERALL_MAIN_TABLE_HEADER_OFFSET+OVERALL_PLAYERS_HEADER_OFFSET, OVERALL_MAIN_TABLE_START_COL, 1, num_players+1).setBackgroundColor(OVERALL_GOALS_COLOR);
  s1.getRange(OVERALL_PLAYERS_START_ROW+OVERALL_MAIN_TABLE_HEADER_OFFSET+OVERALL_PLAYERS_HEADER_OFFSET+1, OVERALL_MAIN_TABLE_START_COL, 1, num_players+1).setBackgroundColor(OVERALL_ASSISTS_COLOR);
  s1.getRange(OVERALL_PLAYERS_START_ROW+OVERALL_MAIN_TABLE_HEADER_OFFSET+OVERALL_PLAYERS_HEADER_OFFSET+2, OVERALL_MAIN_TABLE_START_COL, 1, num_players+1).setBackgroundColor(OVERALL_SAVES_COLOR);
  s1.getRange(OVERALL_PLAYERS_START_ROW+OVERALL_MAIN_TABLE_HEADER_OFFSET+OVERALL_PLAYERS_HEADER_OFFSET+3, OVERALL_MAIN_TABLE_START_COL, 1, num_players+1).setBackgroundColor(OVERALL_SHOTS_COLOR);
  s1.getRange(OVERALL_PLAYERS_START_ROW+OVERALL_MAIN_TABLE_HEADER_OFFSET+OVERALL_PLAYERS_HEADER_OFFSET+4, OVERALL_MAIN_TABLE_START_COL, 1, num_players+1).setBackgroundColor(OVERALL_MVPS_COLOR);
  s1.getRange(OVERALL_PLAYERS_START_ROW+OVERALL_MAIN_TABLE_HEADER_OFFSET+OVERALL_PLAYERS_HEADER_OFFSET+5, OVERALL_MAIN_TABLE_START_COL, 1, num_players+1).setBackgroundColor(OVERALL_RECORD_COLOR);
  s1.getRange(OVERALL_PLAYERS_START_ROW+OVERALL_MAIN_TABLE_HEADER_OFFSET+OVERALL_PLAYERS_HEADER_OFFSET+6, OVERALL_MAIN_TABLE_START_COL, 1, num_players+1).setBackgroundColor(OVERALL_GPG_COLOR);
  s1.getRange(OVERALL_PLAYERS_START_ROW+OVERALL_MAIN_TABLE_HEADER_OFFSET+OVERALL_PLAYERS_HEADER_OFFSET+7, OVERALL_MAIN_TABLE_START_COL, 1, num_players+1).setBackgroundColor(OVERALL_APG_COLOR);
  s1.getRange(OVERALL_PLAYERS_START_ROW+OVERALL_MAIN_TABLE_HEADER_OFFSET+OVERALL_PLAYERS_HEADER_OFFSET+8, OVERALL_MAIN_TABLE_START_COL, 1, num_players+1).setBackgroundColor(OVERALL_SAPG_COLOR);
  s1.getRange(OVERALL_PLAYERS_START_ROW+OVERALL_MAIN_TABLE_HEADER_OFFSET+OVERALL_PLAYERS_HEADER_OFFSET+9, OVERALL_MAIN_TABLE_START_COL, 1, num_players+1).setBackgroundColor(OVERALL_ACC_COLOR);
  s1.getRange(OVERALL_PLAYERS_START_ROW+OVERALL_MAIN_TABLE_HEADER_OFFSET+OVERALL_PLAYERS_HEADER_OFFSET+10, OVERALL_MAIN_TABLE_START_COL, 1, num_players+1).setBackgroundColor(OVERALL_SHPG_COLOR);

  s1.getRange(OVERALL_PLAYERS_START_ROW+OVERALL_MAIN_TABLE_HEADER_OFFSET, OVERALL_MAIN_TABLE_START_COL, 1, num_players+1).setBorder(false, false, true, false, true, false, "black", SpreadsheetApp.BorderStyle.SOLID);

  s1.getRange(OVERALL_PLAYERS_START_ROW+OVERALL_MAIN_TABLE_HEADER_OFFSET, OVERALL_MAIN_TABLE_START_COL, 12, 1).setBorder(null, null, null, true, null, true, "black", SpreadsheetApp.BorderStyle.SOLID);

  s1.getRange(OVERALL_PLAYERS_START_ROW+OVERALL_MAIN_TABLE_HEADER_OFFSET, OVERALL_MAIN_TABLE_START_COL, 7, num_players+1).setBorder(null, null, true, null, null, null, "black", SpreadsheetApp.BorderStyle.SOLID);;
  
  s1.getRange(OVERALL_PLAYERS_START_ROW, OVERALL_MAIN_TABLE_START_COL, OVERALL_MAIN_TABLE_HEADER_OFFSET, num_players+1).setBorder(true, true, true, true, null, null, "black", SpreadsheetApp.BorderStyle.SOLID_THICK);
  s1.getRange(OVERALL_PLAYERS_START_ROW, OVERALL_MAIN_TABLE_START_COL, 15, num_players+1).setBorder(true, true, true, true, null, null, "black", SpreadsheetApp.BorderStyle.SOLID_THICK);
}

function fillHeaders(num_players) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var s1 = ss.getActiveSheet();

  s1.getRange(OVERALL_PLAYERS_START_ROW, OVERALL_MAIN_TABLE_START_COL, OVERALL_MAIN_TABLE_HEADER_OFFSET, num_players+1).merge();

  s1.getRange(OVERALL_PLAYERS_START_ROW, OVERALL_MAIN_TABLE_START_COL, 1, 1).setValue("Overall MVP: ");
  s1.getRange(OVERALL_PLAYERS_START_ROW, OVERALL_MAIN_TABLE_START_COL, 1, 1).setVerticalAlignment("middle");

  s1.getRange(OVERALL_PLAYERS_START_ROW+OVERALL_MAIN_TABLE_HEADER_OFFSET, OVERALL_MAIN_TABLE_START_COL, 12, 1).setValues([["Stats"], ["Goals"], ["Assists"], ["Saves"], ["Shots"], ["MVP"], ["Record"], ["Go/G"], ["A/G"], ["Sa/G"], ["Acc. "], ["Sh/G"]]);

}

function printPlayersStats(player, offset) {
  var matches_played = 0;

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var s1 = ss.getActiveSheet();

  matches_played = player.getMatchesPlayed()

  s1.getRange(OVERALL_PLAYERS_START_ROW+OVERALL_MAIN_TABLE_HEADER_OFFSET, OVERALL_PLAYERS_START_COL+offset, 1, 1).setValue(player.name);

  s1.getRange(OVERALL_PLAYERS_START_ROW+OVERALL_MAIN_TABLE_HEADER_OFFSET+OVERALL_PLAYERS_HEADER_OFFSET, OVERALL_PLAYERS_START_COL+offset, 1, 1).setValue(player.goals);
  s1.getRange(OVERALL_PLAYERS_START_ROW+OVERALL_MAIN_TABLE_HEADER_OFFSET+OVERALL_PLAYERS_HEADER_OFFSET+1, OVERALL_PLAYERS_START_COL+offset, 1, 1).setValue(player.assists);
  s1.getRange(OVERALL_PLAYERS_START_ROW+OVERALL_MAIN_TABLE_HEADER_OFFSET+OVERALL_PLAYERS_HEADER_OFFSET+2, OVERALL_PLAYERS_START_COL+offset, 1, 1).setValue(player.saves);
  s1.getRange(OVERALL_PLAYERS_START_ROW+OVERALL_MAIN_TABLE_HEADER_OFFSET+OVERALL_PLAYERS_HEADER_OFFSET+3, OVERALL_PLAYERS_START_COL+offset, 1, 1).setValue(player.shots);
  s1.getRange(OVERALL_PLAYERS_START_ROW+OVERALL_MAIN_TABLE_HEADER_OFFSET+OVERALL_PLAYERS_HEADER_OFFSET+4, OVERALL_PLAYERS_START_COL+offset, 1, 1).setValue(player.mvp);

  s1.getRange(OVERALL_PLAYERS_START_ROW+OVERALL_MAIN_TABLE_HEADER_OFFSET+OVERALL_PLAYERS_HEADER_OFFSET+SEASON_PLAYER_NUM_STATS, OVERALL_PLAYERS_START_COL+offset, 1, 1).setValue(player.getPrintableRecord());

  s1.getRange(OVERALL_PLAYERS_START_ROW+OVERALL_MAIN_TABLE_HEADER_OFFSET+OVERALL_PLAYERS_HEADER_OFFSET+6, OVERALL_PLAYERS_START_COL+offset, 1, 1).setValue((player.goals/matches_played).toFixed(1));
  s1.getRange(OVERALL_PLAYERS_START_ROW+OVERALL_MAIN_TABLE_HEADER_OFFSET+OVERALL_PLAYERS_HEADER_OFFSET+7, OVERALL_PLAYERS_START_COL+offset, 1, 1).setValue((player.assists/matches_played).toFixed(1));
  s1.getRange(OVERALL_PLAYERS_START_ROW+OVERALL_MAIN_TABLE_HEADER_OFFSET+OVERALL_PLAYERS_HEADER_OFFSET+8, OVERALL_PLAYERS_START_COL+offset, 1, 1).setValue((player.saves/matches_played).toFixed(1));
  s1.getRange(OVERALL_PLAYERS_START_ROW+OVERALL_MAIN_TABLE_HEADER_OFFSET+OVERALL_PLAYERS_HEADER_OFFSET+9, OVERALL_PLAYERS_START_COL+offset, 1, 1).setValue((player.goals/player.shots).toFixed(1));
  s1.getRange(OVERALL_PLAYERS_START_ROW+OVERALL_MAIN_TABLE_HEADER_OFFSET+OVERALL_PLAYERS_HEADER_OFFSET+10, OVERALL_PLAYERS_START_COL+offset, 1, 1).setValue((player.shots/matches_played).toFixed(1));
}

function createOverallPlayers(seasons) {
  var players = [];

  players = getAllPlayers(seasons);

  // fill data
  for (var i = 0; i < players.length; i++) {
    printPlayersStats(players[i], i);
  }

  formatOverallPlayersRange(players.length);

  fillHeaders(players.length);
}