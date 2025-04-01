import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditEncadrantService } from './service/list-entreprise.service';


@Component({
  selector: 'app-edit-etudiants',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-entreprise.component.html',
  styleUrl: './edit-entreprise.component.css'
})
export class EditEntrepriseComponent implements OnInit {


  entrepriseForm: FormGroup;
  entrepriseId!: number;

  entrepriseEdit:any=''
  status:boolean=true
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private editEncadrantService : EditEncadrantService

  ) {
    this.entrepriseForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: [null],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      role: ['employeur', Validators.required],

    });
  }

  ngOnInit(): void {
    this.entrepriseId = this.route.snapshot.params['updateEntreprise'];
    this.LoadEntrepriseEdit();
  
  }

  LoadEntrepriseEdit():void{
    this.editEncadrantService.getEntrepsiseById(this.entrepriseId).subscribe((data) => {
      this.entrepriseEdit = data;
      this.filtreloadEntreprise()
    });
  }
  filtreloadEntreprise():void{
      this.entrepriseForm.patchValue({
        nom: this.entrepriseEdit.nom,
        prenom: this.entrepriseEdit.prenom,
        email: this.entrepriseEdit.email,
        phone_number: this.entrepriseEdit.phone_number,
        role: 'employeur',
      });
    
  }
  updateEntreprise(): void {
    if (this.entrepriseForm.valid) {
    const formData = new FormData();
    formData.append('nom', this.entrepriseForm.value.nom);
    formData.append('prenom', this.entrepriseForm.value.prenom);
    formData.append('email', this.entrepriseForm.value.email);
    formData.append('phone_number', this.entrepriseForm.value.phone_number);
    formData.append('role', this.entrepriseForm.value.role);
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    
      this.editEncadrantService.updateEntreprise(this.entrepriseId, this.entrepriseForm.value).subscribe(() => {
        this.router.navigate(['/admin/entreprises']);
      });
    }
  }


  

}
