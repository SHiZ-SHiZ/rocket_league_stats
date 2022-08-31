// helpers.gs

// Function to count the nummber of cells that have the specified background color
// Arguments:
//     arg[0]: range of cells to check 
//     arg[1]: color (string) to check for
//
// Returns:
//     number of occurences
//
function countBackgroundColoredCells(rangeSpec, color) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  const colorsToCheck = sheet.getRange(rangeSpec).getBackgrounds();
  // const doneColor = sheet.getRange(colorCellSpec).getBackgrounds()[0][0];
  const doneColor = color;
  let count = 0;
  for ( let i = 0; i < colorsToCheck.length; i++ ) {
    for ( let j = 0; j < colorsToCheck[i].length; j++ ) {
      const color = colorsToCheck[i][j];
      if ( color === doneColor ) {
        count++;
      }
    }
  }
  return count;
};