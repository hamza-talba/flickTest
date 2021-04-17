import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';
import { ResultsComponent } from './results/results.component';
import { QuestionsComponent } from './questions/questions.component';

const routes: Routes = [
  {
    path:"",
    redirectTo:"results",
    pathMatch:"full"
    },
   {
    path:"results",
    component:ResultsComponent
    },
    {
    path:"quiz",
    component:QuizComponent
    },
    {
    path:"questions",
    component:QuestionsComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
