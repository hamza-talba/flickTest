import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiService } from '../../shared/services/api/api.service';
import {map, mergeMap, switchMap, tap} from 'rxjs/operators'
import generalObjects, { difficulties, types } from 'src/app/models/generalObjects.interface';
import { Quiz } from '../../models/Quiz.model';
import { Router } from '@angular/router';

 @Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  form: FormGroup;
  categories$:Observable<generalObjects>

  difficulties:string[]=[
    ...difficulties
  ]

  types:generalObjects[]=[
    ...types
  ]
  
  constructor(private fb: FormBuilder,private apiService:ApiService,private router:Router) { 
    this.form = this.fb.group({
      amount: [10,Validators.compose([Validators.required,Validators.min(1),Validators.max(50)])],
      category: [null],
      difficulty:[null],
      type:[null]
    });
  }

  ngOnInit(): void {
    this.categories$ = this.apiService.getCategories().pipe(map(res => res['trivia_categories']))
  }

  onSubmit(){
    if(this.form.valid){
      const quiz:Quiz = {...this.form.value}
      this.router.navigate(['/pages/questions'],
      {queryParams:{amount:quiz.amount.toString(),category:quiz.category?.toString(),difficulty:quiz.difficulty,type:quiz.type}})
    }
  }
}
