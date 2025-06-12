import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OfferService } from '../../services/offer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Offer } from '../../models/offer.models';
import { OfferApplication } from '../../models/offer.models';

@Component({
  selector: 'app-offer-application',
  templateUrl: './offer-application.component.html',
  styleUrls: ['./offer-application.component.css'],
  standalone:false
})
export class OfferApplicationComponent implements OnInit {
  applicationForm!: FormGroup;
  offerId!: string; 
  userId: string = '671cb559e6bff63f72443d9c'; // ID utilisateur simulé
  offer!: Offer;
  cvFile?: { file: File; progress: number; name: string };
  lmFile?: { file: File; progress: number; name: string };
  otherFiles: { file: File; progress: number; name: string }[] = [];
  canAddOthersDoc: boolean = false;
  isRequiredCvDoc: boolean = false;
  isRequiredMlDoc: boolean = false;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private offerService: OfferService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.offerId = this.route.snapshot.paramMap.get('id') || '';
    if (!this.offerId) {
      this.snackBar.open('ID de l\'offre manquant.', 'Fermer', {
        duration: 3000,
        verticalPosition: 'top',
      });
      return;
    }
    this.initializeForm();
    this.getOfferDetails();
  }

  getOfferDetails(): void {
    this.offerService.getOfferById(this.offerId).subscribe({
      next: (offer) => {
        this.offer = offer;
        this.isRequiredCvDoc = offer.isCvDocRequired;
        this.isRequiredMlDoc = offer.isMlDocRequired;
        this.canAddOthersDoc = offer.canAddAdditionalDocs;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de l\'offre:', err);
        this.snackBar.open('Erreur lors de la récupération des détails de l\'offre.', 'Fermer', {
          duration: 3000,
          verticalPosition: 'top',
        });
      },
    });
  }

  initializeForm(): void {
    this.applicationForm = this.fb.group({
      message: ['', [Validators.required, Validators.maxLength(500)]],
      acceptTerms: [false, Validators.requiredTrue],
    });
  }

  onFileSelected(event: Event, type: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const fileData = { file, progress: 0, name: file.name };

      switch (type) {
        case 'CV':
          this.cvFile = fileData;
          this.uploadFile(fileData);
          break;
        case 'LM':
          this.lmFile = fileData;
          this.uploadFile(fileData);
          break;
        case 'OTHER':
          this.otherFiles.push(fileData);
          this.uploadFile(fileData);
          break;
        default:
          console.warn('Type de fichier inconnu:', type);
      }
    }
  }

  uploadFile(fileData: { file: File; progress: number; name: string }): void {
    const reader = new FileReader();
    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        fileData.progress = Math.round((event.loaded / event.total) * 100);
      }
    };
    reader.onload = () => {
      fileData.progress = 100;
    };
    reader.readAsArrayBuffer(fileData.file);
  }

  addOtherFileField(): void {
    const newFileInput = document.createElement('input');
    newFileInput.type = 'file';
    newFileInput.accept = '.pdf,.doc,.docx';
    newFileInput.classList.add('hidden');
    newFileInput.addEventListener('change', (event) => this.onFileSelected(event, 'OTHER'));
    const container = document.getElementById('otherFilesContainer');
    if (container) {
      container.insertBefore(newFileInput, document.getElementById('addFileButton'));
      newFileInput.click();
    }
  }

  onSubmit(): void {
    // if (this.applicationForm.invalid || (this.isRequiredCvDoc && !this.cvFile) || (this.isRequiredMlDoc && !this.lmFile)) {
    //   this.snackBar.open('Veuillez remplir tous les champs obligatoires et télécharger les fichiers nécessaires.', 'Fermer', {
    //     duration: 3000,
    //     verticalPosition: 'top',
    //   });
    //   return;
    // }

    // this.isSubmitting = true;
    // const offerApplication: OfferApplication = {
    //   _id: '',
    //   offerId: this.offerId,
    //   candidatId: this.userId,
    //   message: this.applicationForm.value.message,
    //   applicationDate: new Date(),
    //   status: 'Pending',
    //   lastUpdated: new Date(),
    //   submittedDocumentsIds: [],
    // };

    // const files: File[] = [
    //   this.cvFile?.file,
    //   this.lmFile?.file,
    //   ...this.otherFiles.map(f => f.file),
    // ].filter(file => file !== undefined);

    // this.offerService.submitApplication(offerApplication, files).subscribe({
    //   next: (response) => {
    //     this.snackBar.open('Candidature soumise avec succès !', 'Fermer', {
    //       duration: 3000,
    //       verticalPosition: 'top',
    //     });
    //     this.isSubmitting = false;
    //     this.router.navigate(['/offers']);
    //   },
    //   error: (err) => {
    //     console.error('Erreur lors de la soumission de la candidature:', err);
    //     this.snackBar.open('Erreur lors de la soumission de la candidature.', 'Fermer', {
    //       duration: 3000,
    //       verticalPosition: 'top',
    //     });
    //     this.isSubmitting = false;
    //   },
    // });
  }
}
