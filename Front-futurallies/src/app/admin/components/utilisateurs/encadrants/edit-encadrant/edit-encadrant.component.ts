import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditEncadrantService } from './service/list-encadrant.service';


@Component({
  selector: 'app-edit-etudiants',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-encadrant.component.html',
  styleUrl: './edit-encadrant.component.css'
})
export class EditEncadrantComponent implements OnInit {


  encadrantForm: FormGroup;
  encadrantId!: number;

  filtreEncadrants:any[]=[]
  encadrantEdit:any=''

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private editEncadrantService : EditEncadrantService

  ) {
    this.encadrantForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      specialite:['', Validators.required],
      fonction: ['', Validators.required],
      phone_number: ['', Validators.required],
      role: ['apprenant', Validators.required],

    });
  }

  ngOnInit(): void {
    this.encadrantId = this.route.snapshot.params['updateFormateur'];
    this.LoadEncadrantEdit();
  
  }

  LoadEncadrantEdit():void{
    this.editEncadrantService.getEncadrantById(this.encadrantId).subscribe((data) => {
      this.encadrantEdit = data;
      this.filtreloadEncadrant()
    });
  }
  filtreloadEncadrant():void{
      this.encadrantForm.patchValue({
        nom: this.encadrantEdit.nom,
        prenom: this.encadrantEdit.prenom,
        email: this.encadrantEdit.email,
        specialite: this.encadrantEdit.specialite,
        fonction: this.encadrantEdit.fonction,
        phone_number: this.encadrantEdit.phone_number,
        role: 'apprenant',
      });
    
  }
  updateEncadrant(): void {
    if (this.encadrantForm.valid) {
    const formData = new FormData();
    formData.append('nom', this.encadrantForm.value.nom);
    formData.append('prenom', this.encadrantForm.value.prenom);
    formData.append('email', this.encadrantForm.value.email);
    formData.append('specialite', this.encadrantForm.value.specialite);
    formData.append('fonction', this.encadrantForm.value.fonction);
    formData.append('phone_number', this.encadrantForm.value.phone_number);
    formData.append('role', this.encadrantForm.value.role);
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    
      this.editEncadrantService.updateEncadrant(this.encadrantId, this.encadrantForm.value).subscribe(() => {
        this.router.navigate(['/admin/formateurs']);
      });
    }
  }


  

}
