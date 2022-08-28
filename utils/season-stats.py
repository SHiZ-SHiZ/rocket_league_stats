#Author: Ryan Woebkenberg
#Date: 08/27/2022

#Reads in csv's from a directory provided by a command-line-argument for a season, decompose data into individual stats for a player in one game, then sum
#TIMESTAMP -> 0   Game mode -> 1   Team -> 2   Player -> 3   Points -> 4   Goals -> 5   Assists -> 6   Saves -> 7   Shots -> 8   Damage -> 9   MVP -> 10   Team Score -> 11   Win -> 12   MMR -> 13 
import os, re, glob, sys

def writeStats(file, name, points, goals, assists, saves, shots, mvp, win):
    f.write(name + ',')
    f.write("%d," % points)
    f.write("%d," % goals)
    f.write("%d," % assists)
    f.write("%d," % saves)
    f.write("%d," % shots)
    f.write("%d," % mvp)
    f.write("%d,\n" % win)

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
dir = os.getcwd()
print(dir)
path = 'D:\\rocket_league_statistics\\' + str((sys.argv)[1]) #TODO: make more modular
os.chdir(path)
dir = os.getcwd()
print(dir)
for file in glob.glob("*.csv"):
    f = open(file, "r")
    stats_map = repr(f.read()).split('\\n')[1:]
    stats_map.pop()
    #print(stats_map)
    for i in range(len(stats_map)):
        str = stats_map[i]
        individual_stats = str.split(',')
        x = player_dict.get(i)
        x.team = int(individual_stats[2])
        x.name = individual_stats[3]
        x.points += int(individual_stats[4])
        x.goals += int(individual_stats[5])
        x.assists += int(individual_stats[6])
        x.saves += int(individual_stats[7])
        x.shots += int(individual_stats[8])
        x.mvp += int(individual_stats[10])
        x.win += int(individual_stats[12])
    f.close()
j = 0
path = 'D:\\rocket_league_statistics\\build'
os.chdir(path)
f = open('stats.csv', "w")
for j in range(6):
    y = player_dict.get(j)
    writeStats(f, y.name, y.points, y.goals, y.assists, y.saves, y.shots, y.mvp, y.win)


