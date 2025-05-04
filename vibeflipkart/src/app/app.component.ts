import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  styles: [`
    main {
      min-height: calc(100vh - 120px);
      padding-top: var(--space-3);
      padding-bottom: var(--space-4);
    }
  `]
})
export class AppComponent {
  title = 'Flipkart Clone';
}