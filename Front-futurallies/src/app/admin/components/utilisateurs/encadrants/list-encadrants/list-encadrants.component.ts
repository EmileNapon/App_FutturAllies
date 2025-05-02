import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  Router, RouterLink } from '@angular/router';
import { ListEncadrantService } from './service/list-encadrant.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-etudiants',
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './list-encadrants.component.html',
  styleUrl: './list-encadrants.component.css'
})
export class ListEncadrantComponent implements OnInit{

  // public baseUrl = 'http://127.0.0.1:8000';
  encadrants: any[] = [];
  loading:boolean=false
  encadrantsActifs:number=0
  encadrantsNotActifs:number=0
  searchTerm: string = '';
  sortOrder: string = '';

  page: number = 1; // Current page
  size: number = 5; // Default items per page
  sizeOptions: number[] = [5, 10, 20, 100]; // Page size options
  totalPages: number = 0; // Total number of pages
  paginatedEncadrants: any[] = []; // Paginated apprenants for display
  
  constructor(private listEncadrantService:ListEncadrantService,  private route:Router ) { }

  ngOnInit():void{ 
    this.loadEncadrants()
  }


  


  // loadEncadrants(): void {
  //   this.loading = true;
  //   this.listEncadrantService.getEncadrants().subscribe((data: any[]) => {
  //     this.encadrants = data;
  //     this.totalPages = Math.ceil(this.encadrants.length / this.size);
  //     this.updatePaginatedEncadrant();
  //     this.loading = false;
  //   }, () => {
  //     this.loading = false;
  //   });
  // }

  loadEncadrants(): void {
    this.loading = true;
    const filters: any = { role: 'formateur' };
  
    if (this.searchTerm) filters.search = this.searchTerm;
    if (this.sortOrder) filters.ordering = this.sortOrder;
  
    this.listEncadrantService.getEncadrants(filters).subscribe((data: any[]) => {
      this.encadrants = data;
      console.log('mmmmmm',this.encadrants)
      this.totalPages = Math.ceil(this.encadrants.length / this.size);
      this.updatePaginatedEncadrant();
  
      // ✅ Recalcul des totaux visibles
      this.encadrantsActifs = this.encadrants.filter(a => a.is_active).length;
      this.encadrantsNotActifs = this.encadrants.filter(a => !a.is_active).length;
  
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }


  updatePaginatedEncadrant(): void {
    const startIndex = (this.page - 1) * this.size;
    const endIndex = startIndex + this.size;
    this.paginatedEncadrants = this.encadrants.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.updatePaginatedEncadrant();
    }

  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.updatePaginatedEncadrant();
    }
  }

  changePageSize(newSize: number): void {
    if (this.sizeOptions.includes(newSize)) {
      this.size = newSize;
      this.page = 1; // Reset to first page
      this.totalPages = Math.ceil(this.encadrants.length / this.size);
      this.updatePaginatedEncadrant();
    }
  }

  onPageSizeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const newSize = parseInt(selectElement.value, 10);
    this.changePageSize(newSize);
  }



  allerDetail(encadrantId:number):void{
    this.route.navigate([`/admin/formateurs/${encadrantId}/detail/`])
  }
  allerEdit(updateEncadrantId:number):void{
    this.route.navigate([`/admin/formateurs/${updateEncadrantId}/update/`])
  }


  onDeleteEncadrant(userId: number): void{
    if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
      this.listEncadrantService.deleteEncadrant(userId).subscribe(() =>{
        this.encadrants = this.encadrants.filter(apprenant => apprenant.id !== userId);
        this.totalPages = Math.ceil(this.encadrants.length / this.size);
        this.page = Math.min(this.page, this.totalPages || 1);
        this.updatePaginatedEncadrant();
      });
    }
  }
  


}
