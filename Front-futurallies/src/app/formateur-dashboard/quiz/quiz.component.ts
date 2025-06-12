import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-quiz',
  standalone:false ,
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit{

  quizzes: any[] = [];

  // Pour stocker les réponses sélectionnées
  userResponses: { [questionId: number]: string[] } = {};

  constructor(private http: HttpClient, private quizService: QuizService ) {}

  ngOnInit(): void {
    this.quizService.getQuizzes().subscribe(data => {
      this.quizzes = data;
    });
  }



}
