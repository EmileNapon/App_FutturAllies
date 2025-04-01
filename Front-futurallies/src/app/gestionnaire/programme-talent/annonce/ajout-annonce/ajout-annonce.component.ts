import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnonceService } from '../../services/annonce.service';
import { Annonce } from '../../models/tousModel';

@Component({
    selector: 'app-ajout-annonce',
    standalone:false,
    templateUrl: './ajout-annonce.component.html',
    styleUrls: ['./ajout-annonce.component.css'],
    
  
})
export class AjoutAnnonceComponent implements OnInit {
  formationId!:number
  annonceForm: FormGroup;

  constructor(private fb: FormBuilder, private annonceService: AnnonceService, private router: Router, private route:ActivatedRoute) {
    // Initialisation du formulaire avec validation
    this.annonceForm = this.fb.group({
      titre: ['', Validators.required],
      lieu: ['', Validators.required],
      date_cours: ['', Validators.required],
      description: ['', Validators.required],
      date_publication: ['', Validators.required],
      heure: ['', Validators.required],
      formation : this.formationId
    });
  }

  ngOnInit(): void {
    this.annonceForm.patchValue({
      datePublication: new Date(),
      heure: new Date().getTime,
      // heure: new Date().getTime,
    });
    this.formationId = this.route.snapshot.params['dasbordId'];
  }

  // Méthode pour ajouter une nouvelle annonce
  ajouterAnnonce(): void {
    if (this.annonceForm.valid) {
      const newAnnonce ={
        titre:this.annonceForm.value['titre'],
        lieu:this.annonceForm.value['lieu'],
        date_cours:this.annonceForm.value['date_cours'],
        description:this.annonceForm.value['description'],
        date_publication:this.annonceForm.value['date_publication'],
        heure:this.annonceForm.value['heure'],
        formation : this.formationId};
        console.log('annonce ajouter avec succes',this.formationId)
        console.log('annonce ajouter avec succes',newAnnonce)
      this.annonceService.addAnnonce(newAnnonce).subscribe(() => {
        
          this.router.navigate(['/admin/dasbord-prog-talent']); // Redirection après ajout
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de annonce', error); // Gérer les erreurs
        }
      );
    }
  }
}
