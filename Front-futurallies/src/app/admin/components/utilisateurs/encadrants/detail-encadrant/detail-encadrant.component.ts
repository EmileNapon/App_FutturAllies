import { CommonModule } from '@angular/common';
import { DetailEncadrantService } from './service/detail-encadrant.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailApprenantsService } from '../../apprenants/detail-apprenant/service/detail-apprenants.service';

@Component({
  selector: 'app-detail-etudiants',
  imports: [CommonModule,],
  templateUrl: './detail-encadrant.component.html',
  styleUrl: './detail-encadrant.component.css'
})
export class DetailEncadrantComponent implements OnInit {

  encadrantDetail:any=null
  encadrantId !:number
  loading :boolean=false
  constructor(private detailApprenantsService:DetailApprenantsService,private detailEncadrantService:DetailEncadrantService, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.encadrantId=this.route.snapshot.params['detailFormateur'];
    this.LoadEncadrantDetail()
  }

  LoadEncadrantDetail():void{
    this.detailEncadrantService.getEncadrantByIds(this.encadrantId).subscribe((data) => {
      this.encadrantDetail = data;
      console.log('kkkkkkk',this.encadrantDetail)
    });
  }

  nombreInscrit:number=0
  LoadInscritWebinar():void{
    this.detailApprenantsService.getNombreWebinarSuivi(this.encadrantId).subscribe((data) => {
      this.nombreInscrit = data;
    });
  }

}
