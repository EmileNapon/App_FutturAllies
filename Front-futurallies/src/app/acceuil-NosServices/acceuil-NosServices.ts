import { AfterViewInit, Component } from '@angular/core';

@Component({
    selector: 'app-acceuil-NosServices',
    templateUrl: './acceuil-NosServices.html',
    styleUrls: ['./acceuil-NosServices.css'],
    standalone: false
})
export class AcceuilNosServicesComponent implements AfterViewInit {

    ngAfterViewInit(): void {
        // Simple counter animation for stats
        const counters = document.querySelectorAll('.countup-item p:first-child');
        const speed = 200;
    
        counters.forEach(counter => {
          const element = counter as HTMLElement;
          const target = +element.innerText.replace(/,/g, '');
          const count = +element.innerText.replace(/\D/g, '');
          const increment = target / speed;
    
          if (count !== target) {
            element.innerText = '0';
    
            const updateCount = () => {
              const current = +element.innerText.replace(/,/g, '');
              const incrementValue = Math.ceil(target / speed);
    
              if (current < target) {
                element.innerText = (current + incrementValue).toLocaleString();
                setTimeout(updateCount, 1);
              } else {
                element.innerText = target.toLocaleString();
              }
            };
    
            updateCount();
          }
        });
      }

}
