import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Component, HostListener, OnInit } from "@angular/core";
import { AuthService } from "src/app/gestion-utilisateurs/connexion/service-connexion/service-connexion.service";

@Component({
    selector: "app-headerPrincipale",
    templateUrl: './headerPrincipale.html',
    styleUrls: ['./headerPrincipale.css'],
    standalone: false
})
export class HeaderPrincipaleGestionnaireComponent implements OnInit{


  constructor(private authService: AuthService, private el: ElementRef, private router: Router, private renderer: Renderer2) {}

  showSearch = false;
  userEmail: string | null = null;

  userInfo: { email: string | null, firstName: string | null, lastName: string | null, profilePic: string | null, role: string | null } | null = null;

ngOnInit():void{
  this.userInfo = this.authService.getUserInfo();
}

  onLogout(): void {
    this.authService.logout();
  }



  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  isFixed: boolean = false;



  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollOffset = 20;  // Distance de défilement avant que la navbar ne devienne fixe

    // Ajouter la classe fixed si l'utilisateur a défilé au-delà du seuil
    if (window.pageYOffset > scrollOffset) {
      this.isFixed = true;
    } else {
      this.isFixed = false;
    }
  }



    
}