function TicTacToe() {
  this._turn = 'x'
  this.taken_by_x = []
  this.taken_by_o = []
  // to be popped off and pushed onto the current player's array
  this.untaken = ['a1', 'b1', 'c1', 'a2', 'b2', 'c2', 'a3', 'b3', 'c3']
}

TicTacToe.prototype = {

  // switches turns
  next_turn: function () {
    this._turn === 'x' ? this._turn = 'o' : this._turn = 'x'
  },

  //current player claims the given space
  take_space: function (space, callback) {
    //the space has to be untaken in order to claim it
    if (this.untaken.includes(space)) {
      var index = this.untaken.indexOf(space)
      var taken_space = this.untaken.splice(index, 1)[0]
      // add this space to the list of spots already taken by the current player
      if (this._turn === 'x') {
        this.taken_by_x.push(taken_space)
        console.log("taken by x: " + this.taken_by_x)
        callback('x')
      } else {
        this.taken_by_o.push(taken_space)
        console.log("taken by o: " + this.taken_by_o)
        callback('o')
      }
    } else {
      alert("That space is already taken!")
      callback(undefined)
    }
  },

  //determines if current player has won or not
  is_win: function (callback) {
    //matches any of the following win condition examples
      // a1, a2, a3 (all 3 letters are the same)
      // a1, b1, c1 (all 3 numbers are the same)
      // a1, b2, b3 (numbers are 1, 2, 3)

    //sets up which player's spaces we're talking about
    var taken_by_player
    if (this._turn === 'x') {
      taken_by_player = this.taken_by_x
    } else if (this._turn === 'o') {
      taken_by_player = this.taken_by_o
    }

    //win conditions:
    if (this.isCompleteRow(taken_by_player) || this.isCompleteColumn(taken_by_player) || this.isCompleteDiagonal(taken_by_player)) {
      callback(true, this._turn)
      this.resetGame()
    } else {
      callback(false, this._turn)
    }
  },

  is_draw: function(callback) {
    // if there are no more untaken spaces on the board, it's a draw
    if (this.untaken.length === 0) {
      callback(true)
      this.resetGame()
    } else {
      callback(false)
    }
  },

  // win condition: a1, b1, c1...etc.
  isCompleteRow: function (taken_by_player) {

    //counts how many times each row number appears
    var ones = 0,
        twos = 0,
        threes = 0
    for (var space of taken_by_player) {
      var row_number = space[1]
      // e.g., the number '2' in 'a2'
      if (row_number === '1') {
        ones++
      } else if (row_number === '2') {
        twos++
      } else if (row_number === '3') {
        threes++
      }
      //if the player has claimed 3 spaces with the same row number, they win!
      if (ones === 3 || twos === 3 || threes === 3) {
        return true
      }
    }
  },

  // win condition: a1, a2, a3...etc.
  isCompleteColumn: function (taken_by_player) {

    //counts how many times each row number appears
    var a = 0,
        b = 0,
        c = 0
    for (var space of taken_by_player) {
      var column_letter = space[0]
      // e.g., the number '2' in 'a2'
      if (column_letter === 'a') {
        a++
      } else if (column_letter === 'b') {
        b++
      } else if (column_letter === 'c') {
        c++ //har har
      }

      //if the player has claimed 3 spaces with the same row number, they win!
      if (a === 3 || b === 3 || c === 3) {
        return true
      }
    }
  },

  //win condition: a1, b2, c3 or c1, b2, a3
  isCompleteDiagonal: function(taken_by_player) {
    if (taken_by_player.includes('a1') && taken_by_player.includes('b2') && taken_by_player.includes('c3')) {
      return true
    } else if (taken_by_player.includes('c1') && taken_by_player.includes('b2') && taken_by_player.includes('a3')) {
      return true
    }
  },

  resetGame: function () {
    this._turn = 'x'
    this.taken_by_x = []
    this.taken_by_o = []
    this.untaken = ['a1', 'b1', 'c1', 'a2', 'b2', 'c2', 'a3', 'b3', 'c3']
  }

}
