// testGetAllTeams.gs
// Author: Josh Dye
// 08/27/2022

// Test for function getAllTeams()
function test_getAllTeams() {

  correct_outputs = ["Adam, Alec, Alex",
  "Adam, Alec, Eric",
  "Adam, Alec, Josh",
  "Adam, Alec, Ryan",
  "Adam, Alex, Eric",
  "Adam, Alex, Josh",
  "Adam, Alex, Ryan",
  "Adam, Eric, Josh",
  "Adam, Eric, Ryan",
  "Adam, Josh, Ryan",
  "Alec, Alex, Brendan",
  "Alec, Alex, Eric",
  "Alec, Alex, Josh",
  "Alec, Alex, Ryan",
  "Alec, Brendan, Eric",
  "Alec, Brendan, Josh",
  "Alec, Brendan, Ryan",
  "Alec, Eric, Josh",
  "Alec, Eric, Ryan",
  "Alec, Josh, Ryan",
  "Alex, Brendan, Eric",
  "Alex, Brendan, Josh",
  "Alex, Brendan, Ryan",
  "Alex, Eric, Josh",
  "Alex, Eric, Ryan",
  "Alex, Josh, Ryan",
  "Brendan, Eric, Josh",
  "Brendan, Eric, Ryan",
  "Brendan, Josh, Ryan",
  "Eric, Josh, Ryan"]

  var all_unique_teams_arr = [];
  var num_correct = 0;

  all_unique_teams_arr = getAllTeams(["'Season 1'!D4:E13", 
                                       "'Season 2'!D4:E13",  
                                       "NC_S4!D4:E13"])

  if (all_unique_teams_arr.length != correct_outputs.length) { 
    return "Error: Nuber of inputs does not match truths list length";
  }

  for (team in all_unique_teams_arr) {
    sorted_true_team = get_sorted_team(correct_outputs[team]);
    sorted_test_team = get_sorted_team(all_unique_teams_arr[team]);

    if (JSON.stringify(sorted_test_team) == JSON.stringify(sorted_true_team)) {
      num_correct += 1;
    }
  }

  return num_correct / all_unique_teams_arr.length;
}