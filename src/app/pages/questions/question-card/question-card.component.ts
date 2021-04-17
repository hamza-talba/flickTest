import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import Question from '../../../models/Question.mode';
 
@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnInit {
  selectedAnswer:any
  answers:any

  _question:Question
  @Input()
  set question(value){
    this.answers = value?.incorrect_answers.map((i)=>
     {
       return(
        {
        isCorrect:false,
        value:i
       } 
     )
    })
    this.answers?.push(
      {
      isCorrect:true,
      value:value.correct_answer
      }
    )
    this.answers?.sort(this.shuffle)
     this._question = value
  }
  get question(){
    return this._question
  }
  @Output()next:EventEmitter<any> = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
 

  _next(){
     this.next.emit(this.selectedAnswer)
     this.selectedAnswer = null
  }

  shuffle(a, b) {  
    return 0.5 - Math.random();
  }

  getSelectedAnswer(data){
   return this.selectedAnswer={...data.value}
  }
}
