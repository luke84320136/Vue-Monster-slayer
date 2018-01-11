new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame: function() {
      this.gameIsRunning = true
      this.playerHealth = 100
      this.monsterHealth = 100
    },
    attack: function() {
      var damage = this.calculateDamage(2, 10)
      this.monsterHealth -= damage
      this.turns.unshift({
        isPlayer: true,
        text: '小蝦米攻擊魔王' + damage + '生命值'
      })
      if (this.checkWin()) {
        return
      }
      this.monsterAttacks()
    },
    specialAttack: function() {
      this.monsterHealth -= this.calculateDamage(7, 22)
      if (this.checkWin()) {
        return
      }
      this.monsterAttacks()
    },
    heal: function() {
      if(this.playerHealth <= 90) {
        this.playerHealth += 10
      } else {
        this.playerHealth = 100
      }
      this.monsterAttacks()
    },
    giveUp: function() {
      this.gameIsRunning = false
    },
    monsterAttacks: function() {
      var damage = this.calculateDamage(5, 15)
      this.playerHealth -= damage
      this.turns.unshift({
        isPlayer: false,
        text: '魔王攻擊小蝦米' + damage + '生命值'
      })
      this.checkWin()
    },
    calculateDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min)
    },
    checkWin: function() {
      if (this.monsterHealth <= 0) {
        if (confirm("你贏了！再來一場嗎？")) {
          this.startGame()
        } else {
          this.gameIsRunning = false
        }
        return true
      } else if (this.playerHealth <= 0) {
        if (confirm("輸到脫褲子！再來一場嗎？")) {
          this.startGame()
        } else {
          this.gameIsRunning = false
        }
        return true
      }
      return false
    }
  }
})
