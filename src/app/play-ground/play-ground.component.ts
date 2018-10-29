import { Component, OnInit } from '@angular/core';
import { PlayingGameService } from '../playing-game.service';
import { PlayingGame } from '../playing-game';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'play-ground',
  templateUrl: './play-ground.component.html',
  styleUrls: ['./play-ground.component.css']
})
export class PlayGroundComponent implements OnInit {
  constructor(
    private _playingGameservice: PlayingGameService,
    private _Activatedroute: ActivatedRoute
  ) {}
  interval: any;
  gamePlayingId: string;
  playerId: string;
  gameId: string;
  public currentGame: Array<PlayingGame> = [];
  public startGame = false;

  ngOnInit() {
    this._Activatedroute.params.subscribe(params => {
      this.gamePlayingId = params['id'];
    });
    this._Activatedroute.params.subscribe(params => {
      this.gameId = params['gameid'];
    });
    this._Activatedroute.params.subscribe(params => {
      this.playerId = params['name'];
    });
    this.getGame();
    this.interval = setInterval(() => {
      this.getGame();
      this.currentGame.forEach(element => {
        if (element.GameStatus === 'GS' && element.id === this.gamePlayingId) {
          this.startGame = true;
          clearInterval(this.interval);
        }
      });
      console.log(this.startGame);
    }, 3000);
  }
  getGame() {
    this._playingGameservice
      .getGameWithId(this.gamePlayingId)
      .subscribe(res => {
        this.currentGame = res;
      });
  }

  onGameComplete(abc) {
    this._playingGameservice
      .getGameWithId(this.gamePlayingId)
      .subscribe(res => {
        this.currentGame = res;
        this.currentGame.forEach(element => {
          if (element.id == this.gamePlayingId) {
            element.PlayersJoined.forEach(player => {
              if (player == this.playerId) {
                var a = element.PlayersJoined.indexOf(player);
                element.PlayersScore[a] = abc[1];
                element.PlayersSubmittingTime[a] = abc[0];
                this._playingGameservice
                  .UpdateGameEntry(element)
                  .subscribe(res => {
                    console.log('game details saved!!! Thank you');
                    this.gameId = '404';
                  });
              }
            });
          }
        });
      });
  }
}
