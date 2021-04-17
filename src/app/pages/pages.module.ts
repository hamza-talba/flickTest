import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { QuizComponent } from './quiz/quiz.component';
import { ResultsComponent } from './results/results.component';
import { QuestionsComponent } from './questions/questions.component';
import { SharedModule } from '../shared/shared.module';
import { QuestionCardComponent } from './questions/question-card/question-card.component';
 

@NgModule({
  declarations: [
    QuizComponent,
    ResultsComponent,
    QuestionsComponent,
    QuestionCardComponent 
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
