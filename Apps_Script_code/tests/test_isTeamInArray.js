// test_isTeamInArray.gs
// Author: Josh Dye
// 08/27/2022

// Test for function isTeamInArray()
function test_isTeamInArray() {
  big_arr_1 = [["Alec", "Alex", "Josh"]["Eric", "Josh", "Ryan"]];
  big_arr_2 = [];
  test_arr_1 = ["Alec", "Alex", "Josh"];
  test_arr_2 = ["Alex", "Josh", "Ryan"];
  var num_correct = 0;

  if (isTeamInArray(big_arr_1,test_arr_1)) {
    num_correct += 1;
  }

  if (!isTeamInArray(big_arr_1, test_arr_2)) {
    num_correct += 1;
  }

  if (!isTeamInArray(big_arr_2, test_arr_1)) {
    num_correct += 1;
  }

  return num_correct / 3;
}