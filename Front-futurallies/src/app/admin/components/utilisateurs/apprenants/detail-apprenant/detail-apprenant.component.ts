import { CommonModule } from '@angular/common';
import { CustomUser } from '../../../../../admin/models/tousModel';
import { DetailApprenantsService } from './service/detail-apprenants.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-etudiants',
  imports: [CommonModule,],
  templateUrl: './detail-apprenant.component.html',
  styleUrl: './detail-apprenant.component.css'
})
export class DetailEtudiantsComponent implements OnInit {

  apprenantDetail:any=null
  apprenantId !:number
  loading :boolean=false
  constructor(private detailApprenantsService:DetailApprenantsService, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.apprenantId=this.route.snapshot.params['detailApprenant'];
    this.LoadApprenantDetail()
  }

  LoadApprenantDetail():void{
    this.detailApprenantsService.getApprenantById(this.apprenantId).subscribe((data) => {
      this.apprenantDetail = data;
      console.log('kkkkkkk',this.apprenantDetail)
    });
  }

}
