// rl_stats_utils.gs
// Author: Josh Dye
// 08/27/2022

// Test for function test_get_sorted_team()
function test_get_sorted_team() {
    sorted_inputs = [["Alec", "Alex", "Eric"],
                     ["Alec", "Alex", "Ryan"],
                     ["Alec", "Alex", "Josh"],
                     ["Alec", "Eric", "Josh"],
                     ["Alec", "Josh", "Ryan"]];
  
    unsorted_inputs = ["Alex, Eric, Alec",
                       "Ryan, Alec, Alex",
                       "Alec, Alex, Josh",
                       "Eric, Alec, Josh",
                       "Ryan, Alec, Josh"];
  
    var num_correct = 0;
  
    for (team in unsorted_inputs) {
      sorted_team = get_sorted_team(unsorted_inputs[team]);
  
      if (JSON.stringify(sorted_team) == JSON.stringify(sorted_inputs[team])) {
        num_correct += 1;
      }
    }
  
    return num_correct / unsorted_inputs.length;
  }
  