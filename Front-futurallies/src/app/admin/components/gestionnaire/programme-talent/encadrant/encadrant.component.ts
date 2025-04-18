import { Component, OnInit } from '@angular/core';
import { CustomUser } from '../models/tousModel';
import { UtilisateurService } from '../services/utilisateur.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-encadrant',
    templateUrl: './encadrant.component.html',
    styleUrls: ['./encadrant.component.css'],
    standalone: false
})
export class EncadrantComponent implements OnInit {

  encadrants: CustomUser[] = [];
  public baseUrl = 'http://127.0.0.1:8000';
  constructor(private utilisateurService: UtilisateurService, private route:Router) { }
  

  ngOnInit(): void {
    this.loadEncadrants();
  }

  loadEncadrants(): void {
    this.utilisateurService.getFormateurs().subscribe((data) => {
      this.encadrants = data;
      console.log('ppppp',this.encadrants)
    });
  }

  deleteEncadrant(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet encadrant ?')) {
      this.utilisateurService.deleteUser(id).subscribe(() => {
        this.loadEncadrants(); 
      });
    }
  }

  onSelectEncadrant(encadrantId: number): void {
    this.route.navigate([`/admin/modification-encadrant/${encadrantId}`]); // Redirection vers la page des matières du domaine sélectionné
  }

}