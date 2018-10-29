import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Games } from './games';

@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {
  private games: Games[] = [
    {
      _id: '1',
      name: 'Jig Saw',
      url: 'src/img',
      description: 'Description of Jig Saw game.'
    },
    {
      _id: '2',
      name: 'Card Flip',
      url: 'src/img',
      description: 'Description of Card Flip game. A memory game.'
    },
    {
      _id: '3',
      name: 'Quiz Game',
      url: 'src/img',
      description: 'Description of Quiz Game game.'
    },
    {
      _id: '4',
      name: 'Bridge',
      url: 'src/img',
      description: 'Description of Bridge game.'
    },
    {
      _id: '5',
      name: 'tic toc',
      url: 'src/img',
      description: 'Description of tic toc game.'
    }
  ];

  private behaviour = new BehaviorSubject(this.games);
  gamesList = this.behaviour.asObservable();
  constructor() {}
}
