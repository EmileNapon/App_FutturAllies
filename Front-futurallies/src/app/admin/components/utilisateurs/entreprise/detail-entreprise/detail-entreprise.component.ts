import { CommonModule } from '@angular/common';
import { DetailEntrepriseService } from './service/detail-entreprise.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-etudiants',
  imports: [CommonModule,],
  templateUrl: './detail-entreprise.component.html',
  styleUrl: './detail-entreprise.component.css'
})
export class DetailEntrepriseComponent implements OnInit {

  entrepriseDetail:any=null
  entrepriseId !:number
  loading :boolean=false
  constructor(private detailEntrepriseService:DetailEntrepriseService, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.entrepriseId=this.route.snapshot.params['detailEntreprise'];
    this.LoadEntrepriseDetail()
  }

  LoadEntrepriseDetail():void{
    this.detailEntrepriseService.getEntrepriseByIds(this.entrepriseId).subscribe((data) => {
      this.entrepriseDetail = data;
      console.log('kkkkkkk',this.entrepriseDetail)
    });
  }

}
