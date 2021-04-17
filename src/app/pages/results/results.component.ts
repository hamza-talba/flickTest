import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api/api.service';
import Result from 'src/app/models/Result.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  results:Result[]
  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    const userID = JSON.parse(localStorage.getItem('user')).user.uid 
    this.apiService.getResults(userID).then(res => {this.results = res, console.log(this.results)})
      
  }

}
