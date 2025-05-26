import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailEncadrantService } from './service/detail-encadrant.service';
import { AuthService } from 'src/app/gestion-utilisateurs/connexion/service-connexion/service-connexion.service';

@Component({
  selector: 'app-detail-encadrant',
  templateUrl: './detail-encadrant.component.html',
  styleUrl: './detail-encadrant.component.css',
  standalone:false
})
export class DetailEncadrantComponent implements OnInit {

  encadrantDetail:any=null
  loading :boolean=false

  userInfo: { email: string | null, firstName: string | null, lastName: string | null, profilePic: string | null, id: string | null, role: string | null, is_superuser:boolean | null  } | null = null;

  IisVisibleDetail: boolean = false;
  constructor(private detailEncadrantService: DetailEncadrantService, private route: ActivatedRoute, private serviceAuth: AuthService,) { }


  @Input() encadrantId!: number  |null;
  @Output() fermer = new EventEmitter<void>();

  ngOnInit(): void {
    this.userInfo = (this.serviceAuth.getUserInfo());
    this.LoadEncadrantDetail()
    console.log("Chargement des détails pour", this.encadrantId)
  }
  
    fermerDetail() {
    this.fermer.emit();
  }

  LoadEncadrantDetail():void{
    this.detailEncadrantService.getEncadrantByIds(Number(this.userInfo?.id)).subscribe((data) => {
      this.encadrantDetail = data;
      console.log('kkkkkkk',this.encadrantDetail)
    });
  }

}
