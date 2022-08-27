import os, re, glob, sys

dir = os.getcwd()
print(dir)
path = 'D:\\rocket_league_statistics\\' + str((sys.argv)[1])
os.chdir(path)
dir = os.getcwd()
print(dir)
i = 1
for file in glob.glob("*.csv"):
    f = open(file, "r")
    print(file)
    print(repr(f.read()))