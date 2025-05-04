import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h4 class="footer-heading">ABOUT</h4>
            <ul class="footer-links">
              <li><a routerLink="/about/contact">Contact Us</a></li>
              <li><a routerLink="/about/about-us">About Us</a></li>
              <li><a routerLink="/about/careers">Careers</a></li>
              <li><a routerLink="/about/press">Press</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4 class="footer-heading">HELP</h4>
            <ul class="footer-links">
              <li><a routerLink="/help/payments">Payments</a></li>
              <li><a routerLink="/help/shipping">Shipping</a></li>
              <li><a routerLink="/help/cancellation">Cancellation & Returns</a></li>
              <li><a routerLink="/help/faq">FAQ</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4 class="footer-heading">POLICY</h4>
            <ul class="footer-links">
              <li><a routerLink="/policy/return">Return Policy</a></li>
              <li><a routerLink="/policy/terms">Terms Of Use</a></li>
              <li><a routerLink="/policy/security">Security</a></li>
              <li><a routerLink="/policy/privacy">Privacy</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4 class="footer-heading">SOCIAL</h4>
            <ul class="footer-links">
              <li><a href="https://facebook.com" target="_blank">Facebook</a></li>
              <li><a href="https://twitter.com" target="_blank">Twitter</a></li>
              <li><a href="https://youtube.com" target="_blank">YouTube</a></li>
              <li><a href="https://instagram.com" target="_blank">Instagram</a></li>
            </ul>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p class="copyright">© 2025 Flipkart Clone</p>
          <p>This is a demo project and not the real Flipkart website.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: var(--neutral-800);
      color: var(--neutral-400);
      padding: var(--space-4) 0 var(--space-2);
      margin-top: var(--space-4);
    }
    
    .footer-content {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-3);
      padding-bottom: var(--space-3);
      border-bottom: 1px solid var(--neutral-700);
    }
    
    .footer-heading {
      color: var(--neutral-300);
      font-size: 12px;
      margin-bottom: var(--space-2);
      font-weight: 500;
    }
    
    .footer-links {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .footer-links li {
      margin-bottom: 8px;
    }
    
    .footer-links a {
      color: var(--neutral-400);
      font-size: 12px;
      text-decoration: none;
      transition: color var(--transition-fast);
    }
    
    .footer-links a:hover {
      color: var(--neutral-100);
    }
    
    .footer-bottom {
      padding-top: var(--space-2);
      text-align: center;
      font-size: 12px;
    }
    
    .copyright {
      font-weight: 500;
    }
    
    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (max-width: 480px) {
      .footer-content {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class FooterComponent {}