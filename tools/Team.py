class Team:
    players = []
    score = 0
    win = 0

    def __init__(self, isWin):
        self.players = []
        self.score = 0
        if isWin:
            self.win = 1
        else:
            self.win = 0

    def clearPlayers(self):
        self.players.clear()

    def getPlayers(self):
        return self.players

    def addPlayer(self, player):
        self.players.append(player)

    def setScore(self, points):
        self.score = points

    def getScore(self):
        return self.score

    def strPrintStats(self):
        s = "\"%s,%s,%s\",%d" % (self.players[0], self.players[1], self.players[2], self.getScore())
        return s

        