import os, re, glob, sys

class Player:
    team = 2
    name = ''
    points = 0
    goals = 0
    assists = 0
    saves = 0
    shots = 0
    mvp = 0
    win = 0

p0 = Player()
p1 = Player()
p2 = Player()
p3 = Player()
p4 = Player()
p5 = Player()
player_dict = {0: p0, 1: p1, 2: p2, 3: p3, 4: p4, 5: p5}

#TIMESTAMP -> 0   Game mode -> 1   Team -> 2   Player -> 3   Points -> 4   Goals -> 5   Assists -> 6   Saves -> 7   Shots -> 8   Damage -> 9   MVP -> 10   Team Score -> 11   Win -> 12   MMR -> 13   
dir = os.getcwd()
print(dir)
path = 'D:\\rocket_league_statistics\\' + str((sys.argv)[1])
os.chdir(path)
dir = os.getcwd()
print(dir)
for file in glob.glob("*.csv"):
    f = open(file, "r")
    stats_map = repr(f.read()).split('\\n')[1:]
    stats_map.pop()
    #print(stats_map)
    i = 0
    for entry in stats_map:
        str = stats_map[i]
        individual_stats = str.split(',')
        print(individual_stats)

        i += 1
