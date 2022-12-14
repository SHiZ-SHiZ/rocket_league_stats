#Author: Ryan Woebkenberg
#Date: 08/27/2022

#Reads in csv's from a directory provided by a command-line-argument for a season, decompose data into individual stats for a player in one game, then sum
#TIMESTAMP -> 0   Game mode -> 1   Team -> 2   Player -> 3   Points -> 4   Goals -> 5   Assists -> 6   Saves -> 7   Shots -> 8   Damage -> 9   MVP -> 10   Team Score -> 11   Win -> 12   MMR -> 13 
#if Team == 0 then color is BLUE, if Team == 1 then color is ORANGE, #0000ff for BLUE and #ff9900 for ORANGE
import os, glob, sys
from Player import Player
from Team import Team
wd = os.getcwd()
game = 0
p0 = Player()
p1 = Player()
p2 = Player()
p3 = Player()
p4 = Player()
p5 = Player()
winningTeam = Team(1)
losingTeam = Team(0)
match_table = []

if not os.path.exists('bin'):
    os.mkdir('bin')
player_dict = {0: p0, 1: p1, 2: p2, 3: p3, 4: p4, 5: p5}  
os.chdir(str((sys.argv)[1]))
dir = os.getcwd()
for file in glob.glob("*.csv"):
    game += 1
    f = open(file, "r")
    stats_map = repr(f.read()).split('\\n')[1:]
    stats_map.pop()
    for i in range(len(stats_map)):
        str = stats_map[i]
        individual_stats = str.split(',')
        x = player_dict.get(i)
        x.setTeam(int(individual_stats[2]))#TODO: Clean up with add'l constructor definitions
        x.setName(individual_stats[3])
        x.addPoints(int(individual_stats[4]))
        x.addGoals(int(individual_stats[5]))
        x.addAssists(int(individual_stats[6]))
        x.addSaves(int(individual_stats[7]))
        x.addShots(int(individual_stats[8]))
        x.addMVP(int(individual_stats[10]))
        x.setTeamPoints(int(individual_stats[11]))
        x.addWin(int(individual_stats[12]))
        if (int(individual_stats[12])):
            winningTeam.addPlayer(x.getName())
            winningTeam.setScore(x.getTeamPoints())
            if x.getTeam():
                winningTeam.setColor("#ff9900")
            else:
                winningTeam.setColor("#0000ff")
        else:
            losingTeam.addPlayer(x.getName())
            losingTeam.setScore(x.getTeamPoints())
            if x.getTeam():
                losingTeam.setColor("#ff9900")
            else:
                losingTeam.setColor("#0000ff")
    s = ("%d" + ',' + winningTeam.strPrintStats() + ',' + losingTeam.strPrintStats() + "\n") % game
    match_table.append(s)
    winningTeam.clearPlayers()
    losingTeam.clearPlayers()
    f.close()

os.chdir(wd + '\\bin')
f = open('stats.csv', "w")
for j in range(6):
    y = player_dict.get(j)
    y.writeStats(f)
for k in match_table:
    f.write(k)
f.close()
#CSV output for individual stats is:
#1 -> name, 2 -> points, 3 -> goals, 4 -> assists, 5 -> saves, 6 -> shots, 7 -> mvps, 8 -> wins (rows 1-6)
#CSV output for team statistics is:
#1 -> match number, 2 -> winning roster, 3 -> winning goals, 4 -> winning color, 5 -> losing roster, 6 -> losing goals, 7 -> losing color (rows 7-16)

