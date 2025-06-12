import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { OfferService } from '../../../services/offer.service';
import { Offer } from '../../../models/offer.models';

@Component({
    selector: 'app-create-offer',
    templateUrl: './create-offer.component.html',
    styleUrls: ['./create-offer.component.css'],
    standalone: false
})
export class CreateOfferComponent implements OnInit {
  offerForm: FormGroup;
  isLoading = false;
  isJob = false;
  isInternship = false;
  isCDD = false;

  constructor(
    private offerService: OfferService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.offerForm = this.fb.group({
      title: ['', Validators.required],
      enterpriseName: ['', Validators.required],
      enterpriseLocation: ['', Validators.required],
      enterpriseWebsite: [''],
      description: ['', Validators.required],
      domain: ['', Validators.required],
      location: ['', Validators.required],
      salary: [null],
      duration: [null],
      type: ['Job', Validators.required],
      contratType: ['CDI', Validators.required],
      recruitmentEmail: ['', [Validators.required, Validators.email]],
      expirationDate: [null],
      isRemote: [false],
      applicationMode: ['Online', Validators.required],
      isRequiredCvDoc: [true],
      isRequiredMlDoc: [true],
      canAddOthersDoc: [false],
      requirement: [''],
      responsabilities: [''],
      status: ['Open', Validators.required],
      educationLevel: [''],
      experienceLevel: [''],
      benefits: [''],
      applicationLink: [''],
      additionalInfo: ['']
    });
  }

  onSubmit(): void {
    if (this.offerForm.invalid) {
      console.error('Le formulaire est invalide.');
      return;
    }

    this.isLoading = true;
    const formValues = this.offerForm.value;

    const newOffer: Partial<any> = {
      title: formValues.title,
      enterprise: formValues.enterpriseName,
      enterpriseLocation: formValues.enterpriseLocation,
      enterpriseWebsite: formValues.enterpriseWebsite,
      description: formValues.description,
      domain: formValues.domain,
      location: formValues.location,
      salary: formValues.salary,
      duration: formValues.duration,
      type: formValues.type,
      contractType: formValues.contratType,
      contactEmail: formValues.recruitmentEmail,
      expirationDate: new Date(formValues.expirationDate),
      isRemote: formValues.isRemote,
      applicationMode: formValues.applicationMode,
      onlineSubmission: formValues.applicationMode === 'Online',
      isRequiredCvDoc: formValues.isRequiredCvDoc,
      isRequiredMlDoc: formValues.isRequiredMlDoc,
      canAddOthersDoc: formValues.canAddOthersDoc,
      requirements: formValues.requirement,
      responsibilities: formValues.responsabilities,
      status: formValues.status,
      educationLevel: formValues.educationLevel,
      experienceLevel: formValues.experienceLevel,
      benefits: formValues.benefits,
      applicationLink: formValues.applicationLink,
      additionalInfo: formValues.additionalInfo,
      createdBy: 'currentUser', // à remplacer dynamiquement
      postedDate: new Date(),
      updatedDate: new Date()
    };

    this.offerService.createOffer(newOffer).subscribe({
      next: () => {
        console.log('Offre créée avec succès.');
        this.isLoading = false;
        this.offerForm.reset();
      },
      error: (err) => {
        console.error('Erreur lors de la création de l\'offre:', err);
        this.isLoading = false;
      }
    });
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const offerType = params['type'];
      if (offerType) {
        this.offerForm.patchValue({ type: offerType });
        this.onTypeChange(offerType);
      }
    });
  }

  onTypeChange(type: string): void {
    this.isJob = type === 'Job';
    this.isInternship = type === 'Internship';
    this.isCDD = false;

    if (this.isJob) {
      this.setValidators(['salary', 'experienceLevel', 'contratType'], [Validators.required]);
      this.clearValidators(['duration']);
    } else if (this.isInternship) {
      this.setValidators(['duration'], [Validators.required, Validators.min(1), Validators.max(12)]);
      this.clearValidators(['salary', 'experienceLevel', 'contratType']);
    } else {
      this.clearValidators(['salary', 'experienceLevel', 'duration', 'contratType']);
    }
  }

  onContratTypeChange(value: string): void {
    this.isCDD = value === 'CDD';
    if (this.isCDD) {
      this.setValidators(['duration'], [Validators.required, Validators.min(1)]);
    } else {
      this.clearValidators(['duration']);
      this.offerForm.patchValue({ duration: null });
    }
  }

  

  private setValidators(fields: string[], validators: any[]): void {
    fields.forEach(field => {
      this.offerForm.get(field)?.setValidators(validators);
      this.offerForm.get(field)?.updateValueAndValidity();
    });
  }

  private clearValidators(fields: string[]): void {
    fields.forEach(field => {
      this.offerForm.get(field)?.clearValidators();
      this.offerForm.get(field)?.updateValueAndValidity();
    });
  }
}