import { Component, OnDestroy, ViewChild, ElementRef, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AuthService } from '../../../gestion-utilisateurs/connexion/service-connexion/service-connexion.service';


@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css'],
    standalone: false
})
export class AdminComponent implements OnDestroy, OnInit{

  @ViewChild('sidenav') sidenav: any;
  tooltips: any[] = [];  // Liste des tooltips à gérer

  loading:boolean=false

  userInfo: { email: string | null, firstName: string | null, lastName: string | null, profilePic: string | null, id: string | null, role: string | null, is_superuser:boolean | null  } | null = null;

  constructor(
    private overlayContainer: OverlayContainer, 
    private authService: AuthService,
    private el: ElementRef,
  ) {}

  ngOnDestroy(): void {
    this.tooltips.forEach((tooltip) => tooltip.hide(0));
    this.overlayContainer.getContainerElement().innerHTML = '';
    const tooltips = this.el.nativeElement.querySelectorAll('.mat-tooltip');
    tooltips.forEach((tooltip: HTMLElement) => {
      if (tooltip && tooltip.parentNode) {
        tooltip.parentNode.removeChild(tooltip);
      }
    });
  }

  ngOnInit():void{
    this.userInfo = this.authService.getUserInfo();
  }  

  onLogout(): void {
    this.authService.logout();
  }
}