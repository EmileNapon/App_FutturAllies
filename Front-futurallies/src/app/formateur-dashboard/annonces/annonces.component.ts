import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnonceService } from '../services/annonce.service';

@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrl: './annonces.component.css',
  standalone:false
})
export class AnnoncesComponent implements OnInit {
  annonceForm!: FormGroup;
  annonces:any[]=[]
  filtereAnnonces:any[]=[]
  dasbordId!:number
  nombreAffichage: number = 5; 
  optionsAffichage: number[] = [3, 5, 10, 100, 0]; 
  FormationId!:number

  constructor(
    private router: Router, private route: ActivatedRoute,
    private fb: FormBuilder, 
    private annonceService: AnnonceService, 
    
  ) { }
  ngOnInit(): void {
    // this.annonceForm.patchValue({
    //   date_publication: new Date(),
    //   heure: new Date().getTime
    // });
    this.loadAnnonces() 
    this.FormationId = Number(this.route.snapshot.paramMap.get('dasbordFormateurId'));
    
  }

      loadAnnonces(): void {
        this.annonceService.getAnnonces().subscribe(data => {
          this.annonces = data;
          console.log('annonces', this.annonces)
          this.filtereAnnonces= this.annonces.filter(annon => annon.formation==this.FormationId);
        });
      }

      supprimerAnnonce(id: number): void {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
          this.annonceService.deleteAnnonce(id).subscribe(() =>  {
            this.loadAnnonces();
          });
          
        }
      }
       annoncesAffichees() {
        if (this.nombreAffichage == 0) {
          return this.filtereAnnonces;
        }
        return this.filtereAnnonces.slice(0, this.nombreAffichage);
      }
}
