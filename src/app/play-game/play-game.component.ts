import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayingGame } from '../playing-game';
import { PlayingGameService } from '../playing-game.service';
import { Games } from '../games';
import { GlobalServiceService } from '../global-service.service';

@Component({
  selector: 'play-game',
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.css'],
  outputs: ['runningGame']
})

export class PlayGameComponent implements OnInit {

  public idMatched = false;
  public idAdded:string;
  public playerId:string;
  public currentGame:Array<PlayingGame>=[];
  public gameName:string;
  games: Games[];
  message="";

  constructor(private router:Router,private _playingGameservice:PlayingGameService,private _globalService: GlobalServiceService) { }

  ngOnInit() {
    this._globalService.gamesList.subscribe(res=>this.games=res);
  }

  checkGameId(form:any){
    console.log(this.idAdded);
    this._playingGameservice.getGameWithId(this.idAdded).subscribe(res => {
      this.currentGame=res;
      this.currentGame.forEach(element => {
        if(element.id == this.idAdded && (element.GameStatus == "NS" || element.GameStatus == "GS")){
          console.log(element.GameStatus);
          this.idMatched=true;
          this.gameName=element.GameName;
        }
      });
    });

  }

  enterGame(){
    this.currentGame.forEach(element => {
      if(element.id == this.idAdded && (element.PlayersJoined.indexOf(this.playerId)==-1) && (element.GameStatus == "NS" || element.GameStatus == "GS")){
        element.PlayersJoined.push(this.playerId);
        element.PlayersJoiningTime.push(new Date());
        element.PlayersSubmittingTime.push(null);
        element.PlayersScore.push("0");
        this._playingGameservice.UpdateGameEntry(element).subscribe(res=>{
          element=res;
          this.router.navigateByUrl('playgames/'+this.gameName+'/'+this.idAdded+'/'+this.playerId);
        });

      }else{
        this.message="Id Already exist. try with a new one";
      }
    });
  }

}
