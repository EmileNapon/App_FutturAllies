import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilisateurService } from '../../services/utilisateur.service';

@Component({
    selector: 'app-modif-encadrant',
    templateUrl: './modif-encadrant.component.html',
    styleUrls: ['./modif-encadrant.component.css'],
    standalone: false
})
export class ModifEncadrantComponent implements OnInit{

  encadrantForm: FormGroup;
  encadrantId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private utilisateurService: UtilisateurService,
    private route: ActivatedRoute,
    private router: Router,

  ) {
    this.encadrantForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      role: ['encadrant', Validators.required],
      specialite: ['', Validators.required],
      // annee_experience: ['', [Validators.required, Validators.min(0)]],
      fonction: ['', Validators.required],
      // statut: ['', Validators.required]
    });
  }

  ngOnInit(): void {

    this.encadrantId = this.route.snapshot.params['id'];
    this.loadEncadrants();
    // this.encadrantForm.patchValue({role: "encadrant"});
  
  }
  filtreEncadrants:any[]=[]
  encadrants:any[]=[]
  loadEncadrants(): void {
    this.utilisateurService.getFormateurs().subscribe((data) => {
      this.encadrants = data;
      this.filtreloadEncadrants()
    });
  }

  filtreloadEncadrants():void{
    this.filtreEncadrants=this.encadrants.filter(user=>user.id==this.encadrantId)
    console.log('mmmmm',this.filtreEncadrants)
    if (this.filtreEncadrants.length > 0) {
      const encadrant = this.filtreEncadrants[0];
      this.encadrantForm.patchValue({
        nom: encadrant.nom,
        prenom: encadrant.prenom,
        email: encadrant.email,
        phone_number: encadrant.phone_number,
        role: ['formateur'],
        fonction: encadrant.fonction,
        specialite: encadrant.specialite
      });
    }
  }


  updateEncadrant(): void {
    if (this.encadrantForm.valid) {
    const formData = new FormData();

    formData.append('email', this.encadrantForm.value.nom);
    formData.append('prenom', this.encadrantForm.value.prenom);
    formData.append('email', this.encadrantForm.value.email);
    formData.append('phone_number', this.encadrantForm.value.phone_number);
    formData.append('fonction', this.encadrantForm.value.fonction);
    formData.append('specialite', this.encadrantForm.value.specialite);
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    
      this.utilisateurService.updateEncadrant(this.encadrantId, this.encadrantForm.value).subscribe(() => {
        this.router.navigate(['/admin/formateur']);
      });
    }
  }

}


