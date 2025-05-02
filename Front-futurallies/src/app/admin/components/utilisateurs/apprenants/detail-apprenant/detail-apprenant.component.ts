import { CommonModule, DatePipe } from '@angular/common';
import { CustomUser } from '../../../../../admin/models/tousModel';
import { DetailApprenantsService } from './service/detail-apprenants.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-etudiants',
  imports: [CommonModule,],
  providers: [DatePipe]  ,
  templateUrl: './detail-apprenant.component.html',
  styleUrl: './detail-apprenant.component.css'
})
export class DetailEtudiantsComponent implements OnInit {

  apprenantDetail:any=null
  apprenantId !:number
  loading :boolean=false
  constructor(private detailApprenantsService:DetailApprenantsService, private route: ActivatedRoute, private datePipe: DatePipe ) { }

  formatDate(date: string | Date): string {
    return this.datePipe.transform(date, 'MMMM d, y') || '';
  }


  ngOnInit(): void {
    this.apprenantId=this.route.snapshot.params['detailApprenant'];
    this.LoadApprenantDetail()
    this.LoadInscritWebinar()
    this.LoadInscritTalent()
  }

  LoadApprenantDetail():void{
    this.detailApprenantsService.getApprenantById(this.apprenantId).subscribe((data) => {
      this.apprenantDetail = data;
      console.log('kkkkkk',this.apprenantDetail)
    });
  }


  nombreInscrit:number=0
  LoadInscritWebinar():void{
    this.detailApprenantsService.getNombreWebinarSuivi(this.apprenantId).subscribe((data) => {
      this.nombreInscrit = data;
    });
  }


  nombreTalent:number=0
  LoadInscritTalent():void{
    this.detailApprenantsService.getNombreProgrammeTalentSuivi(this.apprenantId).subscribe((data) => {
      this.nombreTalent = data;
      console.log('this.apprenantId', this.apprenantId)
    });
  }
}
