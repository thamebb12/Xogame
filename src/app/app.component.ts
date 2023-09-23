import { Component } from '@angular/core';
import {  MessageService } from 'primeng/api';
import { BrowserModule } from '@angular/platform-browser';

interface Cell {
  value: 'X' | 'O' | '';
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  squares: string[] = Array(9).fill(null);
  xIsNext: boolean = true;
  winner: string | null = null;
  displayDialog: boolean = false;
  namesArray: string[] = [];
  nameIn1: string = '';
  nameIn2: string = '';
  currentPlayer: number = 0;
  names: string[] = [];
  
  constructor(
    private messageService: MessageService

    // @Inject(LOCALE_ID) private locale: string,
  ) { }

  ngOnInit() {
  }

  makeMove(index: number) {
    if (!this.squares[index] && !this.winner && this.namesArray.length > 0) {
      console.log("player",index)

      this.squares[index] = this.xIsNext ? 'X' : 'O';
      this.xIsNext = !this.xIsNext;
      this.calculateWinner();
      this.currentPlayer = (this.currentPlayer + 1) % this.namesArray.length;
    }else
      this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Warn', detail: 'โปรดใส่ชื่อก่อนเล่น' });
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const line of lines) {
      const [a, b, c] = line;
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        this.winner = this.namesArray[this.currentPlayer]
      }
    }
  }
  reset() {
    this.squares = Array(9).fill(null); 
    this.xIsNext = true; 
    this.winner = null;
    this.namesArray = []
  }

  showDialog() {
    this.displayDialog = true;
  }

  saveInputText() {
    this.namesArray = [this.nameIn1, this.nameIn2];

  // Iterate through the nameInputs array
  for (const input of this.namesArray) {
    const trimmedInput = input.trim(); // Trim leading and trailing whitespace
    if (trimmedInput !== '') {
      this.names.push(trimmedInput); // Push non-empty values into the names array
    }
    this.displayDialog = false;
  }

  // Clear the input fields
  this.nameIn1 = '';
  this.nameIn2 = '';
  }

  closeDialog() {
    this.displayDialog = false;
  }
  
}
function showTopCenter() {
  throw new Error('Function not implemented.');
}

