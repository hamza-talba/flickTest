import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Quiz } from '../../../models/Quiz.model';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import Result from '../../../models/Result.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseURL = environment.triviaURL
  constructor(private http:HttpClient,
    private afs: AngularFirestore,    
    ) { }

  public getCategories():Observable<any>{
    return this.http.get(this.baseURL + 'api_category.php')
  }

  public categoryQuestionCount(categoryId):Observable<any>{
    return this.http.get(this.baseURL + 'api_count.php',{params:{category:categoryId}})
  }

  public getQuiz(quiz:Quiz,token:string):Observable<any>{
    console.log(quiz)
    let params = {
      amount:quiz.amount.toString(),category:quiz.category?.toString(),
      difficulty:quiz.difficulty,type:quiz.type
    }
    for(let p in params){
      if(!params[p]){
        delete params[p]
      }
    }
    return this.http.get(this.baseURL + 'api.php',{
      params:{...params,token:token}
      }
    )
  }

  public retrieveSessionToken():Observable<any>{
    return this.http.get(this.baseURL + 'api_token.php',{params:{command:'request'}})
  }

  public saveResult(result:string,userID:string){
    console.log(result,userID)
     this.afs.collection(`results`).doc().set(Object.assign({},{
      result:result,
      userID:userID
    })).then(console.log).catch(console.log)
   }

  public getResults(userID:string):Promise<Result[]>{
    return new Promise((resolve,reject)=>{
      this.afs.collection("results").ref.where("userID","==",userID).get()
      .then((querySnapshot) => {
        let data = []
          querySnapshot.forEach((doc) => {
            console.log(doc.data());
            data.push(doc.data())
        });
        console.log(data)
        resolve(data)
       })
      .catch((error) => {
          console.log("Error getting documents: ", error);
          reject(error)
      });
    })
  }
}
