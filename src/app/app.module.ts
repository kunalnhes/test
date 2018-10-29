import { MaterialModule } from './material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { PlayGameComponent } from './play-game/play-game.component';
import { GameListComponent } from './game-list/game-list.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { GameStartComponent } from './game-start/game-start.component';
import { ResultComponent } from './result/result.component';
import { JigSawComponent } from './jig-saw/jig-saw.component';
import { CardFlipComponent } from './card-flip/card-flip.component';
import { PlayGroundComponent } from './play-ground/play-ground.component';
import { QueriesComponent } from './queries/queries.component';
import { QuizQuestionComponent } from './quiz-question/quiz-question.component';
import { QuestionDialogComponent } from './question-dialog/question-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    PlayGameComponent,
    GameListComponent,
    GameDetailComponent,
    GameStartComponent,
    ResultComponent,
    JigSawComponent,
    CardFlipComponent,
    PlayGroundComponent,
    QueriesComponent,
    QuizQuestionComponent,
    QuestionDialogComponent
  ],
  imports: [
    CommonModule,
    NgtUniversalModule,
    MaterialModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  entryComponents: [QuestionDialogComponent],
  providers: []
})
export class AppModule {}
