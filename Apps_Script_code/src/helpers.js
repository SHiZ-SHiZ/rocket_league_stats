// helpers.gs

function countColoredCells(countRange, colorRef) {
  var activeRg = SpreadsheetApp.getActiveRange();
  var activeSht = SpreadsheetApp.getActiveSheet();
  var activeformula = activeRg.getFormula();
  var countRangeAddress = activeformula.match(/\((.*)\,/).pop().trim();
  var backGrounds = activeSht.getRange(countRangeAddress).getBackgrounds();
  var colorRefAddress = activeformula.match(/\,(.*)\)/).pop().trim();
  var BackGround = activeSht.getRange(colorRefAddress).getBackground();
  var countCells = 0;
  for (var i = 0; i < backGrounds.length; i++)
    for (var k = 0; k < backGrounds[i].length; k++)
      if ( backGrounds[i][k] == BackGround )
        countCells = countCells + 1;
  return countCells;
}