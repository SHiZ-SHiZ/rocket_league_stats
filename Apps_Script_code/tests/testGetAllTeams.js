// testGetAllTeams.gs
// Author: Josh Dye
// 08/27/2022

// Test for function getAllTeams()
function test_getAllTeams() {

  correct_output = ["Alec, Alex, Eric",
                    "Alex, Eric, Ryan",
                    "Alec, Alex, Ryan",
                    "Alec, Alex, Josh",
                    "Alec, Eric, Josh",
                    "Alec, Josh, Ryan",
                    "Alex, Eric, Josh",
                    "Alec, Eric, Ryan",
                    "Eric, Josh, Ryan",
                    "Alex, Josh, Ryan",
                    "Adam, Alec, Alex",
                    "Adam, Alec, Eric",
                    "Adam, Alex, Josh",
                    "Adam, Eric, Josh",
                    "Adam, Eric, Ryan",
                    "Adam, Alex, Eric",
                    "Adam, Alec, Ryan",
                    "Adam, Alex, Ryan",
                    "Adam, Alec, Josh",
                    "Adam, Josh, Ryan",
                    "Brendan, Eric, Ryan",
                    "Alec, Brendan, Ryan",
                    "Brendan, Josh, Ryan",
                    "Alex, Brendan, Josh",
                    "Alec, Eric, Brendan",
                    "Alex, Brendan, Eric",
                    "Alex, Brendan, Ryan",
                    "Brendan, Eric, Josh",
                    "Alec, Brendan, Josh",
                    "Alec, Alex, Brendan"]

  var all_unique_teams_arr = [];
  var num_correct = 0;

  all_unique_teams_arr = getAllTeams("'Season 1'!D4:E13", 
                                       "'Season 2'!D4:E13",  
                                       "NC_S4!D4:E13")

  if (all_unique_teams_arr.length != correct_output.length) { 
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