import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferService } from '../../services/offer.service';
import { Offer } from '../../models/offer.models';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css'],
  standalone:false
})
export class OfferDetailsComponent implements OnInit {
  offer!: Offer;
  offerId!: string;
  loading: boolean = true;

  requirementsList: string[] = [];
  responsibilitiesList: string[] = [];
  benefitsList: string[] = [];
  additionalInfoList: string[] = [];
  requiredDocuments: string[] = []; // Liste des documents requis

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private offerService: OfferService
  ) {}

  ngOnInit(): void {
    this.getOfferDetails();
  }

  getOfferDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.offerId = id;
      this.loading = true;
      this.offerService.getOfferById(id).subscribe(
        (data: Offer) => {
          this.offer = data;

          // Transformer les champs en tableaux pour l'affichage
          this.requirementsList = this.offer.requirements ? this.offer.requirements.split('\n') : [];
          this.responsibilitiesList = this.offer.responsibilities ? this.offer.responsibilities.split('\n') : [];
          this.benefitsList = this.offer.benefits ? this.offer.benefits.split('\n') : [];
          this.additionalInfoList = this.offer.additionalInfo ? this.offer.additionalInfo.split('\n') : [];

          // Définir les documents requis
          this.requiredDocuments = [];
          if (this.offer.isCvDocRequired) {
            this.requiredDocuments.push('CV');
          }
          if (this.offer.isMlDocRequired) {
            this.requiredDocuments.push('Lettre de motivation');
          }
          if (this.offer.canAddAdditionalDocs) {
            this.requiredDocuments.push('Autres documents');
          }

          this.loading = false;
        },
        (error) => {
          console.error('Erreur lors de la récupération des détails de l\'offre', error);
          this.loading = false;
        }
      );
    } else {
      console.error('Aucun ID d\'offre fourni.');
    }
  }

  register(): void {
    this.router.navigate(['/offers/application', this.offerId]);
  }
}
