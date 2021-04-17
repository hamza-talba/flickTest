import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from, Observable, zip } from 'rxjs';
import { switchMap, map, tap, shareReplay } from 'rxjs/operators';
import { ApiService } from '../../shared/services/api/api.service';
import Question from '../../models/Question.mode';
import Result from 'src/app/models/Result.model';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
   questions$:Observable<Question>
   questionNum:number = 0
   questionslength:number = 0
   result:Result = new Result()
  constructor(private route:ActivatedRoute,private apiService:ApiService,private router:Router) { }

  ngOnInit(): void {
   this.questions$ = zip(this.route.queryParams,this.apiService.retrieveSessionToken()).pipe(
       switchMap(res => {
         return this.apiService.getQuiz(res[0],res[1].token)
      }),
      map(res => {return res['results']}),
      shareReplay(),
      tap(res => {
        console.log(res)
       this.questionslength = res.length
      this.result.questionsAmount = res.length 
      } 
      )
    )
  }

  nextQuestion(data){
    console.log('next',data)
    console.log(this.questionNum + 1, this.questionslength)
    if(data?.isCorrect){
      this.result.successAmount += 1
      if(this.questionNum + 1 < this.questionslength){
        this.questionNum += 1
      }else{
        const userID = JSON.parse(localStorage.getItem('user')).user.uid
        const result = `${this.result.successAmount}/${this.result.questionsAmount}`
        this.apiService.saveResult(result,userID)
        this.router.navigate(["/pages/results"])
      }
    }else{
      const userID = JSON.parse(localStorage.getItem('user')).user.uid
      const result = `${this.result.successAmount}/${this.result.questionsAmount}`
      this.apiService.saveResult(result,userID)
      this.router.navigate(["/pages/results"])
    }
  }
}
