// createOverallTotals.gs
// Author: Josh Dye
// 09/17/2022

// ROW/COL offsets
const OVERALL_TOTALS_START_COL     = 3;
const OVERALL_TOTALS_END_COL       = 7;
const OVERALL_TOTALS_START_ROW     = 23;
const OVERALL_TOTALS_END_ROW       = 29;
const OVERALL_TOTALS_HEADER_OFFSET = 2;

// Colors
const OVERALL_TOTALS_HEADER_COLOR  = "#f1c232";
const OVERALL_TOTALS_HEADER_COLOR_ALT  = "#d0e0e3";
const OVERALL_TOTALS_SEASONS_COLOR = "#a2c4c9";
const OVERALL_TOTALS_GOALS_COLOR = "#cfe2f3";
const OVERALL_TOTALS_ASSISTS_COLOR = "#fff2cc";
const OVERALL_TOTALS_SAVES_COLOR = "#f4cccc";
const OVERALL_TOTALS_SHOTS_COLOR = "#ead1dc";

const TOTALS_RANGE = "M4:M7"

//Function to format the font and cells of the overall totals table
//
function formatOverallTotalsRange(num_seasons) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var s1 = ss.getActiveSheet();

  s1.getRange(OVERALL_TOTALS_START_ROW, OVERALL_TOTALS_START_COL, OVERALL_TOTALS_HEADER_OFFSET+num_seasons, 5).setHorizontalAlignment('center');

  // merge top cell
  s1.getRange(OVERALL_TOTALS_START_ROW, OVERALL_TOTALS_START_COL, 1, 5).setBackgroundColor(OVERALL_TOTALS_HEADER_COLOR);
  s1.getRange(OVERALL_TOTALS_START_ROW, OVERALL_TOTALS_START_COL, 1, 5).setFontWeight("bold");
  s1.getRange(OVERALL_TOTALS_START_ROW, OVERALL_TOTALS_START_COL, 1, 5).setFontSize(14);
  s1.getRange(OVERALL_TOTALS_START_ROW, OVERALL_TOTALS_START_COL, 1, 5).merge();

  s1.getRange(OVERALL_TOTALS_START_ROW+1, OVERALL_TOTALS_START_COL, 1, 5).setBackgroundColor(OVERALL_TOTALS_HEADER_COLOR_ALT);
  s1.getRange(OVERALL_TOTALS_START_ROW+1, OVERALL_TOTALS_START_COL, 1, 5).setFontWeight("bold");

  s1.getRange(OVERALL_TOTALS_START_ROW+OVERALL_TOTALS_HEADER_OFFSET, OVERALL_TOTALS_START_COL, num_seasons, 1).setBackgroundColor(OVERALL_TOTALS_SEASONS_COLOR);
  s1.getRange(OVERALL_TOTALS_START_ROW+OVERALL_TOTALS_HEADER_OFFSET, OVERALL_TOTALS_START_COL+1, num_seasons, 1).setBackgroundColor(OVERALL_TOTALS_GOALS_COLOR);
  s1.getRange(OVERALL_TOTALS_START_ROW+OVERALL_TOTALS_HEADER_OFFSET, OVERALL_TOTALS_START_COL+2, num_seasons, 1).setBackgroundColor(OVERALL_TOTALS_ASSISTS_COLOR);
  s1.getRange(OVERALL_TOTALS_START_ROW+OVERALL_TOTALS_HEADER_OFFSET, OVERALL_TOTALS_START_COL+3, num_seasons, 1).setBackgroundColor(OVERALL_TOTALS_SAVES_COLOR);
  s1.getRange(OVERALL_TOTALS_START_ROW+OVERALL_TOTALS_HEADER_OFFSET, OVERALL_TOTALS_START_COL+4, num_seasons, 1).setBackgroundColor(OVERALL_TOTALS_SHOTS_COLOR);


  s1.getRange(OVERALL_TOTALS_START_ROW, OVERALL_TOTALS_START_COL, OVERALL_TOTALS_HEADER_OFFSET, 5).setBorder(false, false, true, false, false, true, "black", SpreadsheetApp.BorderStyle.SOLID)

  s1.getRange(OVERALL_TOTALS_START_ROW+OVERALL_TOTALS_HEADER_OFFSET, OVERALL_TOTALS_START_COL, num_seasons, 5).setBorder(null, null, null, null, true, false, "black", SpreadsheetApp.BorderStyle.SOLID);

  s1.getRange(OVERALL_TOTALS_START_ROW, OVERALL_TOTALS_START_COL, OVERALL_TOTALS_HEADER_OFFSET+num_seasons, 5).setBorder(true, true, true, true, null, null, "black", SpreadsheetApp.BorderStyle.SOLID_THICK);
}

// Function to create the overall totals table
// Arguments:
//     arg[0]: array seasons (sheet names) to be included
//
function createOverallTotals(seasons) {
  var totals = [];
  var seasons_plain = seasons.map((x) => x);;
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var s1 = ss.getActiveSheet();

  seasons = getFullRange(seasons, TOTALS_RANGE);

  formatOverallTotalsRange(seasons.length)

  //fill header
  s1.getRange(OVERALL_TOTALS_START_ROW, OVERALL_TOTALS_START_COL, 1, 1).setValue("Season Totals");
  s1.getRange(OVERALL_TOTALS_START_ROW+1, OVERALL_TOTALS_START_COL, 1, 5).setValues([["Season", "Goals", "Assists", "Saves", "Shots"]]);
  

  // fill data
  for (var i = 0; i< seasons.length; i++){
    totals = ss.getRange(seasons[i]).getDisplayValues();

    s1.getRange(OVERALL_TOTALS_START_ROW+OVERALL_TOTALS_HEADER_OFFSET+i, OVERALL_TOTALS_START_COL, 1, 1).setValue(seasons_plain[i]);
    s1.getRange(OVERALL_TOTALS_START_ROW+OVERALL_TOTALS_HEADER_OFFSET+i, OVERALL_TOTALS_START_COL+1, 1, 4).setValues([totals]);
  }
}
