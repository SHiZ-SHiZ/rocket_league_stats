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

    def getTeam(self):
        return self.team
    
    def setTeam(self, team):
        self.team = team

    def getName(self):
        return self.name

    def setName(self, name):
        self.name = name

    def getPoints(self):
        return self.points

    def addPoints(self, points):
        self.points += points
        
    def getGoals(self):
        return self.goals
    
    def addGoals(self, goals):
        self.goals += goals

    def getAssists(self):
        return self.assists

    def addAssists(self, assists):
        self.assists += assists

    def getSaves(self):
        return self.saves

    def addSaves(self, saves):
        self.saves += saves

    def getShots(self):
        return self.shots
    
    def addShots(self, shots):
        self.shots += shots

    def getMVP(self):
        return self.mvp

    def addMVP(self, mvp):
        self.mvp += mvp

    def getWin(self):
        return self.win

    def addWin(self, win):
        self.win += win
    
    
    def writeStats(self, f):
        f.write(self.getName() + ',')
        f.write("%d," % self.getPoints())
        f.write("%d," % self.getGoals())
        f.write("%d," % self.getAssists())
        f.write("%d," % self.getSaves())
        f.write("%d," % self.getShots())
        f.write("%d," % self.getMVP())
        f.write("%d,\n" % self.getWin())

