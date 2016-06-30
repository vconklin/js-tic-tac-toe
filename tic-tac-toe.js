function TicTacToe() {
  this._turn = 'x'
  this.taken_by_x = []
  this.taken_by_o = []
  // to be popped off and pushed onto the current player's array
  this.untaken = ['a1', 'b1', 'c1', 'a2', 'b2', 'c2', 'a3', 'b3', 'c3']
}

TicTacToe.prototype = {
  take_space: function (space) {
    //the space has to be untaken in order to claim it
    if (this.untaken.includes(space)) {
      var index = this.untaken.indexOf(space)
      var taken_space = this.untaken.splice(index, 1)
      // add this space to the list of spots already taken by the current player
      if (this._turn === 'x') {
        this.taken_by_x.push(taken_space)
      } else if (this._turn === 'o') {
        this.taken_by_o.push(taken_space)
      }
    } else {
      alert("That space is already taken!")
      //alert is annoying, do something else later
    }
  },


  is_win: function () {
    //matches any of the following win condition examples
      // a1, a2, a3 (all 3 letters are the same)
      // a1, b1, c1 (all 3 numbers are the same)
      // a1, b2, b3 (numbers are 1, 2, 3)

  }

}
