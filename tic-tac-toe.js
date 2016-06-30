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
  take_space: function (space) {
    //the space has to be untaken in order to claim it
    if (this.untaken.includes(space)) {
      var index = this.untaken.indexOf(space)
      var taken_space = this.untaken.splice(index, 1)[0]
      // add this space to the list of spots already taken by the current player
      if (this._turn === 'x') {
        this.taken_by_x.push(taken_space)
        console.log("taken by x: " + this.taken_by_x)
      } else {
        this.taken_by_o.push(taken_space)
        console.log("taken by o: " + this.taken_by_o)
      }
    } else {
      alert("That space is already taken!")
      //alert is annoying, do something else later
    }
  },

  //determines if current player has won or not
  is_win: function (callback) {
    //matches any of the following win condition examples
      // a1, a2, a3 (all 3 letters are the same)
      // a1, b1, c1 (all 3 numbers are the same)
      // a1, b2, b3 (numbers are 1, 2, 3)

    //win conditions:
    // if (this.threeSameNumbers() || this.threeSameLetters() || this.threeSequentialNumbers()) {
    if (this.threeSameNumbers()) {
      callback(true, this._turn)
    } else {
      callback(false, this._turn)
    }
  },

  // win condition: a1, b1, c1...etc.
  threeSameNumbers: function () {
    // sets up which player's spaces we're talking about
    var taken_by_player
    if (this._turn === 'x') {
      taken_by_player = this.taken_by_x
      console.log(taken_by_player)
    } else if (this._turn === 'o') {
      taken_by_player = this.taken_by_o
    }

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
  }

}
