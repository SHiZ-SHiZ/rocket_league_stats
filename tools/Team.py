class Team:
    players = []
    score = 0
    win = 0
    game = 0

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

    def setGame(self, game):
        self.game = game

    def getGame(self):
        return self.game
    
    def writeStats(self, f):
        count = 0
        f.write("%d" % self.getGame())
        f.write(",\"")
        for x in range(len(self.players)):
            if count != 0:
                f.write(",")
            f.write(self.players[x])
            count += 1
        f.write("\",%d\n" % self.getScore())

    def printStats(self):
        count = 0
        print("%d" % self.getGame(), end='')
        print(",\"", end='')
        for x in range(len(self.players)):
            if count != 0:
                print(",", end='')
            print(self.players[x], end='')
            count += 1
        print("\",%d\n" % self.getScore(), end='')
        s = "%d,\"%s,%s,%s\",%d\n" % (self.getGame(), self.players[0], self.players[1], self.players[2], self.getScore())
        return s

        