// menu.gs

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("RL Stats Functions")
      .addSubMenu(ui.createMenu('Create Overall...')
        .addItem('Teams', 'menu_createOverallTeam')
        .addItem('Season Totals', 'menu_createOverallTotals'))
      .addToUi();
}

// Menu item handler for createOverallTeam()
function menu_createOverallTeam() {
  createOverallTeam(getSeasonInput());
}

// Menu item handler for createOverallTotals()
function menu_createOverallTotals() {   
  createOverallTotals(getSeasonInput());
}