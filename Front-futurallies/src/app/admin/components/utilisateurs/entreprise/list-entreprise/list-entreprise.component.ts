import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  Router, RouterLink } from '@angular/router';
import { ListEntrepriseService } from './service/list-entreprise.service';

@Component({
  selector: 'app-list-etudiants',
  imports: [CommonModule,RouterLink,],
  templateUrl: './list-entreprise.component.html',
  styleUrl: './list-entreprise.component.css'
})
export class ListEntrepriseComponent implements OnInit{

  // public baseUrl = 'http://127.0.0.1:8000';
  entreprises: any[] = [];
  loading:boolean=false


  page: number = 1; // Current page
  size: number = 5; // Default items per page
  sizeOptions: number[] = [5, 10, 20, 100]; // Page size options
  totalPages: number = 0; // Total number of pages
  paginatedEntreprise: any[] = []; // Paginated apprenants for display


  constructor(private listEntrepriseService:ListEntrepriseService,  private route:Router ) { }

  ngOnInit():void{ 
    this.loadEntreprises()
  }

  // loadEntreprises():void{
  //   this.listEntrepriseService.getEntreprises().subscribe((data) => {
  //     this.entreprises = data;
  //   });
  // }

  // allerDetail(entrepriseId:number):void{
  //   this.route.navigate([`/admin/entreprises/${entrepriseId}/detail/`])
  // }
  // allerEdit(updateentrepriseId:number):void{
  //   this.route.navigate([`/admin/entreprises/${updateentrepriseId}/update/`])
  // }


  // onDeleteEntreprise(userId: number) {
  //   if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
  //     this.listEntrepriseService.deleteEntreprise(userId).subscribe({
  //       next: () => {
  //         alert("Utilisateur supprimé avec succès !");
  //         this.loadEntreprises(); // Rafraîchir la liste après suppression
  //       },
  //       error: (err) => {
  //         console.error("Erreur de suppression :", err);
  //         alert("Échec de la suppression.");
  //       }
  //     });
  //   }
  // }
  




  loadEntreprises(): void {
    this.loading = true;
    this.listEntrepriseService.getEntreprises().subscribe((data: any[]) => {
      this.entreprises = data;
      this.totalPages = Math.ceil(this.entreprises.length / this.size);
      this.updatePaginatedEntreprise();
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }

  updatePaginatedEntreprise(): void {
    const startIndex = (this.page - 1) * this.size;
    const endIndex = startIndex + this.size;
    this.paginatedEntreprise = this.entreprises.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.updatePaginatedEntreprise();
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.updatePaginatedEntreprise();
    }
  }

  changePageSize(newSize: number): void {
    if (this.sizeOptions.includes(newSize)) {
      this.size = newSize;
      this.page = 1; // Reset to first page
      this.totalPages = Math.ceil(this.entreprises.length / this.size);
      this.updatePaginatedEntreprise();
    }
  }

  onPageSizeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const newSize = parseInt(selectElement.value, 10);
    this.changePageSize(newSize);
  }



  allerDetail(encadrantId:number):void{
    this.route.navigate([`/admin/entreprises/${encadrantId}/detail/`])
  }
  allerEdit(updateEncadrantId:number):void{
    this.route.navigate([`/admin/entreprises/${updateEncadrantId}/update/`])
  }


  onDeleteEntreprise(userId: number): void{
    if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
      this.listEntrepriseService.deleteEntreprise(userId).subscribe(() =>{
        this.entreprises = this.entreprises.filter(apprenant => apprenant.id !== userId);
        this.totalPages = Math.ceil(this.entreprises.length / this.size);
        this.page = Math.min(this.page, this.totalPages || 1);
        this.updatePaginatedEntreprise();
      });
    }
  }

}
