import os, re, glob, sys

#TIMESTAMP -> 0   Game mode -> 1   Team -> 2   Player -> 3   Points -> 4   Goals -> 5   Assists -> 6   Saves -> 7   Shots -> 8   Damage -> 9   MVP -> 10   Team Score -> 11   Win -> 12   MMR -> 13   
dir = os.getcwd()
print(dir)
path = 'D:\\rocket_league_statistics\\' + str((sys.argv)[1])
os.chdir(path)
dir = os.getcwd()
print(dir)
for file in glob.glob("*.csv"):
    f = open(file, "r")
    stats_map = (repr(f.read()).split('\\n', 1)[1]).split('\\n')
    #print(stats_map)
    i = 0
    for entry in stats_map:
        str = stats_map[i]
        individual_stats = str.split(',')
        print(individual_stats)
        i = i+1
    