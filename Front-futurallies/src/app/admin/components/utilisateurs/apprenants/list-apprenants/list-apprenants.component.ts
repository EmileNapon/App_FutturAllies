import { Component, NgModule, OnInit } from '@angular/core';
import { ListApprenantsService } from './service/list-apprenants-service';
import { CommonModule } from '@angular/common';
import {  Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-etudiants',
  imports: [CommonModule,FormsModule],
  templateUrl: './list-apprenants.component.html',
  styleUrl: './list-apprenants.component.css'
})
export class ListEtudiantsComponent implements OnInit{

  apprenantsActifs:number=0
  apprenantsNotActifs:number=0
  apprenants: any[] = [];
  loading:boolean=false

  page: number = 1; // Current page
  size: number = 5; // Default items per page
  sizeOptions: number[] = [5, 10, 20, 100]; // Page size options
  totalPages: number = 1; // Total number of pages
  paginatedApprenants: any[] = []; // Paginated apprenants for display

  constructor(private apprenantsService:ListApprenantsService,  private route:Router ) { }

  ngOnInit():void{ 
    this.loadApprenants()

   
  }





  searchTerm: string = '';
  sortOrder: string = '';
  

  loadApprenants(): void {
    this.loading = true;
    const filters: any = { role: 'apprenant' };
  
    if (this.searchTerm) filters.search = this.searchTerm;
    if (this.sortOrder) filters.ordering = this.sortOrder;
  
    this.apprenantsService.getApprenants(filters).subscribe((data: any[]) => {
      this.apprenants = data;
      this.totalPages = Math.ceil(this.apprenants.length / this.size);
      this.updatePaginatedApprenants();
  
      // ✅ Recalcul des totaux visibles
      this.apprenantsActifs = this.apprenants.filter(a => a.is_active).length;
      this.apprenantsNotActifs = this.apprenants.filter(a => !a.is_active).length;
  
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }
  


  updatePaginatedApprenants(): void {
    const startIndex = (this.page - 1) * this.size;
    const endIndex = startIndex + this.size;
    this.paginatedApprenants = this.apprenants.slice(startIndex, endIndex);
  }



  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.updatePaginatedApprenants();
    }
  }
  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.updatePaginatedApprenants();
    }

  }
  changePageSize(newSize: number): void {
    if (this.sizeOptions.includes(newSize)) {
      this.size = newSize;
      this.page = 1; // Reset to first page
      this.totalPages = Math.ceil(this.apprenants.length / this.size);
      this.updatePaginatedApprenants();
    }
  }

  onPageSizeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const newSize = parseInt(selectElement.value, 10);
    this.changePageSize(newSize);
  }




  allerDetail(apprenantId:number):void{
    this.route.navigate([`/admin/apprenants/${apprenantId}/detail/`])
  }
  allerEdit(updateApprenantId:number):void{
    this.route.navigate([`/admin/apprenants/${updateApprenantId}/update/`])
  }


  onDeleteApprenant(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet apprenant ?')) {
      this.apprenantsService.deleteApprenant(id).subscribe(() => {
        this.apprenants = this.apprenants.filter(apprenant => apprenant.id !== id);
        this.totalPages = Math.ceil(this.apprenants.length / this.size);
        this.page = Math.min(this.page, this.totalPages || 1);
        this.updatePaginatedApprenants();
      });
    }
  }
  }
 
  