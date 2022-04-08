<template>
  <header>
    <input type="number" id="rows" v-model="row" />
     * 
    <input type="number" v-model="column" />
    <button @click="startGame()">start</button>
  </header>
  <div class="main-board">
    <table :class="{ shake }">
      <TransitionGroup
        name="item"
        tag="tr"
        :css="slide"
        v-for="(i, index) in rows"
        :key="index"
      >
        <template v-for="(j, index1) in columns" :key="index1">
          <td class="blank" v-if="mainArray[index][index1] == 0"></td>

          <td v-else class="tile" @click="moveThisTile(index, index1)">
            {{ mainArray[index][index1] }}
          </td>
        </template>
      </TransitionGroup>
    </table>
  </div>
</template>
<script>
export default {
  data: () => ({
    row: 4,
    column: 4,
    rows: null,
    columns: null,
    mainArray: [],
    uniqueArrayTest: [],
    arrayHasNumberBeenUsed: [],
    randomNumber: 0,
    shake: false,
    slide: false,
    //moves : 0
  }),

  created() {
    this.startGame();
  },
  methods: {
    startGame() {
      if (this.row > 30 || this.column > 30) {
        alert("please set <= 30");
        return;
      }
      this.mainArray = [];
      this.uniqueArrayTest = [];
      this.arrayHasNumberBeenUsed = [];
      this.rows = this.row;
      this.columns = this.column;

      for (let i = 0; i < this.rows; i++) {
        this.mainArray[i] = [];
      }
      for (let i = 0; i < this.rows * this.columns; i++) {
        this.arrayHasNumberBeenUsed[i] = 0;
      }

      for (let i = 0; i < this.rows * this.columns; i++) {
        this.randomNumber = Math.floor(
          Math.random() * this.rows * this.columns
        );
        // If our random numer is unique, add it to the board.
        if (this.arrayHasNumberBeenUsed[this.randomNumber] == 0) {
          this.arrayHasNumberBeenUsed[this.randomNumber] = 1;
          this.uniqueArrayTest.push(this.randomNumber);
        } // Our number is not unique. Try again.
        else {
          i--;
        }
      }

      let count = 0;

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.mainArray[i][j] = this.uniqueArrayTest[count];

          count++;
        }
      }
    },
    moveThisTile(tableRow, tableColumn) {
      if (
        // console.log(tableRow, tableColumn);
        this.checkIfMoveable(tableRow, tableColumn, "up") ||
        this.checkIfMoveable(tableRow, tableColumn, "down") ||
        this.checkIfMoveable(tableRow, tableColumn, "left") ||
        this.checkIfMoveable(tableRow, tableColumn, "right")
      ) {
        // this.incrementMoves();
      } else {
        this.shake = true;
        setTimeout(() => {
          this.shake = false;
        }, 1500);
      }

      if (this.checkIfWinner()) {
        alert("Congratulations! You solved the puzzle in " + moves + " moves.");
        this.startNewGame();
      }
    },

    checkIfMoveable(rowCoordinate, columnCoordinate, direction) {
      // The following variables an if else statements
      // make the function work for all directions.
      let rowOffset = 0;
      let columnOffset = 0;
      if (direction == "up") {
        rowOffset = -1;
        this.slide = false;
      } else if (direction == "down") {
        rowOffset = 1;
        this.slide = false;
      } else if (direction == "left") {
        columnOffset = -1;
        this.slide = true;
      } else if (direction == "right") {
        columnOffset = 1;
        this.slide = true;
      }

      // Check if the tile can be moved to the spot.
      // If it can, move it and return true.
      if (
        rowCoordinate + rowOffset >= 0 &&
        columnCoordinate + columnOffset >= 0 &&
        rowCoordinate + rowOffset < this.rows &&
        columnCoordinate + columnOffset < this.columns
      ) {
        if (
          this.mainArray[rowCoordinate + rowOffset][
            columnCoordinate + columnOffset
          ] == 0
        ) {
          this.mainArray[rowCoordinate + rowOffset][
            columnCoordinate + columnOffset
          ] = this.mainArray[rowCoordinate][columnCoordinate];
          this.mainArray[rowCoordinate][columnCoordinate] = 0;
          // this.showTable();
          return true;
        }
      }
      return false;
    },
    checkIfWinner() {
      var count = 1;
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          if (this.mainArray[i][j] != count) {
            if (
              !(
                count === this.rows * this.columns && this.mainArray[i][j] === 0
              )
            ) {
              return false;
            }
          }
          count++;
        }
      }

      return true;
    },

    // incrementMoves() {
    //   this.moves++;
    //   //   if (textMoves) {
    //   //     // This is nessessary.
    //   //     textMoves.innerHTML = moves;
    //   //   }
    // },
  },
};
</script>

<style>
body {
  margin: 0;
  background: #e6e7ee;
}

header {
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: inset 2px 2px 5px #b8b9be, inset -3px -3px 7px #fff !important;
  background-color: #e6e7ee !important;
  background-clip: padding-box !important;
  border: 0.0625rem solid #d1d9e6 !important;
  flex-wrap: wrap;
  padding: 20px;
}

input {
  /* display: block !important;
    width: 100% !important; */
  padding: 0.6rem 0.75rem ;
  font-size: 1rem ;
  font-weight: 300 ;
  line-height: 1.5 ;
  color: #44476a ;
  background-color: #e6e7ee ;
  background-clip: padding-box ;
  border: 0.0625rem solid #d1d9e6 ;
  border-radius: 0.55rem ;
  box-shadow: inset 2px 2px 5px #b8b9be, inset -3px -3px 7px #fff ;
  transition: all 0.3s ease-in-out ;
  outline: none;
   width: 90px;
  margin:10px
}

td {
  padding: 20px;
  transition: 0.4s all;
  box-shadow: 6px 6px 12px #b8b9be, -6px -6px 12px #fff;
  background-clip: border-box;
  border: 0.0625rem solid rgba(243, 247, 250, 0.05);
  border-radius: 5px;
  width: 60px;
  height: 60px;
}

tr {
  transition: 0.4s all !important;
}

.tile {
  background-color: #e6e7ee;
}

.blank {
  box-shadow: none;
}

.main-board {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
  overflow-x: scroll;
}
/* Hide scrollbar for Chrome, Safari and Opera */
.main-board::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.main-board {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
table {
  border-collapse: separate;
  border-spacing: 10px;
}

button {
  box-shadow: 3px 3px 6px #b8b9be, -3px -3px 6px #fff;
  width: 100px;
  border: 0.0625rem solid transparent;
  padding: 5px 10px;
  height: 40px;
  border-radius: 5px;
  margin: 10px;
  background-color: #ff7058;
  cursor: pointer;
}

button:hover {
  color: #31344b;
  background-color: #e6e7ee;
  border-color: #e6e7ee;
  box-shadow: inset 2px 2px 5px #b8b9be, inset -3px -3px 7px #fff;
  /* text-decoration: none; */
}

.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
