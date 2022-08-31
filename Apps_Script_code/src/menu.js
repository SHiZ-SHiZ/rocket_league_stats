// menu.gs

function onOpen() {
    var ui = SpreadsheetApp.getUi();
    ui.createMenu("Don't Touch {WIP}")
        .addSubMenu(ui.createMenu('Create Overall...')
          .addItem('Teams', 'menu_createOverallTeam'))
        .addToUi();
  }
  
  // Menu item handler for createOverallTeam()
  function menu_createOverallTeam() {   
    var new_arr = [];
    var ui = SpreadsheetApp.getUi();
    
    var response = ui.alert("**IMPORTANT** This should only be selected while creating an 'overall' sheet. If you're on a sheet that has data already that data WILL be OVERWITTEN. Are you sure you want to continue?", ui.ButtonSet.YES_NO);
  
    if (response == ui.Button.NO) { return; }
  
    response = ui.prompt("Enter the seasons (sheet names) you want to include.")
    const seasons_arr = response.getResponseText().split(',');
  
    for (season in seasons_arr) {
      new_arr[season] = seasons_arr[season].trim();
    }
  
    createOverallTeam(new_arr);
  }
  