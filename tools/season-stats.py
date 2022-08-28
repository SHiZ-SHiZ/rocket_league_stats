#Author: Ryan Woebkenberg
#Date: 08/27/2022

#Reads in csv's from a directory provided by a command-line-argument for a season, decompose data into individual stats for a player in one game, then sum
#TIMESTAMP -> 0   Game mode -> 1   Team -> 2   Player -> 3   Points -> 4   Goals -> 5   Assists -> 6   Saves -> 7   Shots -> 8   Damage -> 9   MVP -> 10   Team Score -> 11   Win -> 12   MMR -> 13 
import os, glob, sys
from Player import Player
wd = os.getcwd()

p0 = Player()
p1 = Player()
p2 = Player()
p3 = Player()
p4 = Player()
p5 = Player()

if not os.path.exists('bin'):
    os.mkdir('bin')
player_dict = {0: p0, 1: p1, 2: p2, 3: p3, 4: p4, 5: p5}  
os.chdir(str((sys.argv)[1]))
dir = os.getcwd()
for file in glob.glob("*.csv"):
    f = open(file, "r")
    stats_map = repr(f.read()).split('\\n')[1:]
    stats_map.pop()
    for i in range(len(stats_map)):
        str = stats_map[i]
        individual_stats = str.split(',')
        x = player_dict.get(i)
        x.setTeam(int(individual_stats[2]))
        x.setName(individual_stats[3])
        x.addPoints(int(individual_stats[4]))
        x.addGoals(int(individual_stats[5]))
        x.addAssists(int(individual_stats[6]))
        x.addSaves(int(individual_stats[7]))
        x.addShots(int(individual_stats[8]))
        x.addMVP(int(individual_stats[10]))
        x.addWin(int(individual_stats[12]))
    f.close()
os.chdir(wd + '\\bin')
f = open('stats.csv', "w")
for j in range(6):
    y = player_dict.get(j)
    y.writeStats(f)


