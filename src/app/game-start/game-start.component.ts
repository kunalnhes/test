import { Component, OnInit, Injectable, Input } from '@angular/core';
import { PlayingGameService } from '../playing-game.service';
import { PlayingGame } from '../playing-game';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Question } from '../question';
import { QuestionService } from '../question.service';
import { QuestionDialogComponent } from '../question-dialog/question-dialog.component';




@Component({
  selector: 'game-start',
  templateUrl: './game-start.component.html',
  styleUrls: ['./game-start.component.css'],
  inputs: ['playId'],
  providers: [PlayingGameService]
})

export class GameStartComponent implements OnInit {
  @Input()
  newGamePlay: PlayingGame;
  @Input()
  playId: string;

  errorMsg = '';
  quizGame = false;
  questionsArray: Array<Question> = [];
  constructor(
    public dialog: MatDialog,
    private _questionService: QuestionService, private _gameService: PlayingGameService, public snackBar: MatSnackBar) {}

  ngOnInit() {
    console.log(this.playId);
    if (this.newGamePlay.GameName === '3') {
      this.quizGame = true;
    }
  }

  startGame(game: PlayingGame) {
    this._gameService.getGameWithId(this.playId).subscribe(res => {
      res.forEach(element => {
        if (element.id === this.playId) {
          this.newGamePlay = element;
          if (this.newGamePlay.GameName === '3') {
            console.log(this.newGamePlay.QuestionIds.length);
            if (this.newGamePlay.QuestionIds.length > 0) {
              this.newGamePlay.GameStatus = 'GS';
              this.newGamePlay.StartTime = new Date();
              this._gameService
                .UpdateGameEntry(this.newGamePlay)
                .subscribe(res1 => {
                  console.log('Game statrted');
                  this.snackBar.open('Game Has Been Started', 'Thanks', {
                    duration: 1000,
                  });
                });
            } else {
              this.errorMsg = 'Please Add Atleast one question';
              this.snackBar.open(this.errorMsg, 'Thanks', {
                duration: 500,
              });
            }
          } else {
            this.newGamePlay.GameStatus = 'GS';
            this.newGamePlay.StartTime = new Date();
            this._gameService
              .UpdateGameEntry(this.newGamePlay)
              .subscribe(res1 => {
                console.log('Game statrted');
                this.snackBar.open('Game Has Been Started', 'Thanks', {
                  duration: 1000,
                });
              });
          }
        }
      });
    });
  }

  endGame(game: PlayingGame) {
    this._gameService.getGameWithId(this.playId).subscribe(res => {
      res.forEach(element => {
        if (element.id === this.playId) {
          this.newGamePlay = element;
          this.newGamePlay.GameStatus = 'GE';
          this.newGamePlay.EndTime = new Date();
          this._gameService
            .UpdateGameEntry(this.newGamePlay)
            .subscribe(res1 => console.log('Game ended'));
          console.log('pushed');
        }
      });
    });
  }

  AddQuestion(): void {
    const dialogRef = this.dialog.open(QuestionDialogComponent, {
      width: '500px',
      height: '600px',
      data: {
        myVar: 'Admin'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result !== '' && result !== undefined) {
        this.questionsArray.push(result);
        this._questionService.addNewQuestion(result).subscribe(res => {
          console.log('Question Added');
          this._gameService.getGameWithId(this.playId).subscribe(res1 => {
            res1.forEach(element => {
              if (element.id === this.playId) {
                this.newGamePlay = element;
                this.newGamePlay.QuestionIds.push(result.QuestionId);
                this._gameService
                  .UpdateGameEntry(this.newGamePlay)
                  .subscribe(res2 => console.log('New Question linked with the game'));
              }
            });
          });
        });
      }
    });
  }

}
