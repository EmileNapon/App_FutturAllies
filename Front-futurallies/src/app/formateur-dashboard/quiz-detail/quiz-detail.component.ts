import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-quiz-detail',
  standalone:false,
  templateUrl: './quiz-detail.component.html',
  styleUrl: './quiz-detail.component.css'
})
export class QuizDetailComponent implements OnInit{

  quiz: any;
  userAnswers: { [key: number]: string[] } = {};
  score: number | null = null;
  total: number | null = null;

  constructor(private route: ActivatedRoute, private quizService: QuizService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('idQuiz'));
    this.quizService.getQuizDetails(id).subscribe(data => {
      this.quiz = data;
      console.log('mmmmm',this.quiz)
    });
  }

  toggleAnswer(questionId: number, optionId: string): void {
    if (!this.userAnswers[questionId]) this.userAnswers[questionId] = [];
    const index = this.userAnswers[questionId].indexOf(optionId);
    if (index === -1) {
      this.userAnswers[questionId].push(optionId);
    } else {
      this.userAnswers[questionId].splice(index, 1);
    }
  }

  submit(): void {
    this.quizService.submitQuiz(this.quiz.id, this.userAnswers).subscribe(result => {
      this.score = result.score;
      this.total = result.total;
    });
  }
  

}
