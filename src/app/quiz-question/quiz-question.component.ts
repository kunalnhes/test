import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.css']
})
export class QuizQuestionComponent implements OnInit {

  @Input() gamePlayingId: string;

  ar: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  seasons = ['Winter', 'Summer', 'Spring', 'Monsoon'];
  favoriteSeason = '';

  constructor() { }

  ngOnInit() {
  }

}
