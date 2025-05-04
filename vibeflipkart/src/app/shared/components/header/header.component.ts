import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  template: `
    <header class="header">
      <div class="container header-container">
        <div class="logo-search">
          <a routerLink="/" class="logo">
            <span class="logo-text">Flipkart</span>
            <span class="logo-subtext">Clone</span>
          </a>
          <div class="search-container">
            <input 
              type="text" 
              placeholder="Search for products, brands and more" 
              [(ngModel)]="searchTerm"
              (keyup.enter)="search()"
              class="search-input"
            />
            <button class="search-btn" (click)="search()">
              <span class="search-icon">🔍</span>
            </button>
          </div>
        </div>
        <nav class="nav-links">
          <a 
            routerLink="/login" 
            routerLinkActive="active-link" 
            class="nav-item" 
            *ngIf="!isLoggedIn"
          >
            Login
          </a>
          <div class="dropdown" *ngIf="isLoggedIn">
            <button class="dropdown-btn nav-item">
              {{userName}}
              <span class="dropdown-icon">▼</span>
            </button>
            <div class="dropdown-content">
              <a routerLink="/account/profile">My Profile</a>
              <a routerLink="/account/orders">Orders</a>
              <a routerLink="/account/wishlist">Wishlist</a>
              <a (click)="logout()" class="logout-btn">Logout</a>
            </div>
          </div>
          <a routerLink="/cart" routerLinkActive="active-link" class="nav-item cart-link">
            Cart
            <span class="cart-count" *ngIf="cartItemCount > 0">{{cartItemCount}}</span>
          </a>
        </nav>
      </div>
    </header>
    <div class="category-nav">
      <div class="container">
        <div class="category-list">
          <a *ngFor="let category of categories" 
             [routerLink]="['/products']" 
             [queryParams]="{category: category.id}"
             class="category-item">
            {{category.name}}
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .header {
      background-color: var(--primary);
      color: white;
      padding: var(--space-2) 0;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    
    .header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .logo-search {
      display: flex;
      align-items: center;
      flex: 1;
    }
    
    .logo {
      display: flex;
      flex-direction: column;
      margin-right: var(--space-3);
      color: white;
      text-decoration: none;
    }
    
    .logo-text {
      font-size: 20px;
      font-weight: 700;
      font-style: italic;
    }
    
    .logo-subtext {
      font-size: 10px;
      font-style: italic;
      color: var(--accent);
    }
    
    .search-container {
      position: relative;
      flex: 1;
      max-width: 560px;
    }
    
    .search-input {
      width: 100%;
      padding: 8px 40px 8px 16px;
      border-radius: var(--border-radius-sm);
      border: none;
      font-size: 14px;
    }
    
    .search-btn {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      width: 40px;
      background: none;
      border: none;
      cursor: pointer;
      color: var(--neutral-600);
    }
    
    .nav-links {
      display: flex;
      align-items: center;
    }
    
    .nav-item {
      margin-left: var(--space-3);
      color: white;
      text-decoration: none;
      font-weight: 500;
      cursor: pointer;
      position: relative;
    }
    
    .active-link {
      font-weight: 700;
    }
    
    .cart-link {
      position: relative;
    }
    
    .cart-count {
      position: absolute;
      top: -8px;
      right: -8px;
      background-color: var(--accent);
      color: var(--neutral-900);
      border-radius: 50%;
      width: 18px;
      height: 18px;
      font-size: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 700;
    }
    
    .dropdown {
      position: relative;
    }
    
    .dropdown-btn {
      background: none;
      border: none;
      color: white;
      display: flex;
      align-items: center;
      font-weight: 500;
      cursor: pointer;
      font-size: 14px;
    }
    
    .dropdown-icon {
      font-size: 10px;
      margin-left: 4px;
    }
    
    .dropdown-content {
      display: none;
      position: absolute;
      right: 0;
      background-color: white;
      min-width: 160px;
      box-shadow: var(--box-shadow);
      z-index: 1;
      border-radius: var(--border-radius-sm);
    }
    
    .dropdown-content a {
      color: var(--neutral-900);
      padding: 12px 16px;
      text-decoration: none;
      display: block;
      font-size: 14px;
    }
    
    .dropdown-content a:hover {
      background-color: var(--neutral-200);
    }
    
    .dropdown:hover .dropdown-content {
      display: block;
      animation: fadeIn 0.2s ease;
    }
    
    .logout-btn {
      color: var(--error) !important;
      border-top: 1px solid var(--neutral-300);
    }
    
    .category-nav {
      background-color: white;
      padding: var(--space-1) 0;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
    
    .category-list {
      display: flex;
      justify-content: space-between;
      overflow-x: auto;
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    
    .category-list::-webkit-scrollbar {
      display: none;
    }
    
    .category-item {
      white-space: nowrap;
      padding: 8px 12px;
      color: var(--neutral-800);
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      transition: color var(--transition-fast);
    }
    
    .category-item:hover {
      color: var(--primary);
    }
    
    @media (max-width: 768px) {
      .header-container {
        flex-direction: column;
        align-items: stretch;
      }
      
      .logo-search {
        margin-bottom: var(--space-2);
      }
      
      .nav-links {
        justify-content: space-around;
      }
      
      .nav-item {
        margin-left: 0;
      }
      
      .search-container {
        max-width: 100%;
      }
    }
  `]
})
export class HeaderComponent {
  searchTerm: string = '';
  isLoggedIn: boolean = false;
  userName: string = 'User';
  cartItemCount: number = 0;
  
  categories = [
    { id: 'electronics', name: 'Electronics' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'home', name: 'Home' },
    { id: 'appliances', name: 'Appliances' },
    { id: 'beauty', name: 'Beauty' },
    { id: 'toys', name: 'Toys & Baby' },
    { id: 'grocery', name: 'Grocery' },
    { id: 'sports', name: 'Sports' }
  ];
  
  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        this.authService.user$.subscribe(user => {
          if (user) {
            this.userName = user.name;
          }
        });
      }
    });
    
    this.cartService.cartItems$.subscribe(items => {
      this.cartItemCount = items.length;
    });
  }
  
  search(): void {
    if (this.searchTerm.trim()) {
      // Implement search navigation
      console.log('Searching for:', this.searchTerm);
      // Example:
      // this.router.navigate(['/products'], { 
      //   queryParams: { search: this.searchTerm } 
      // });
    }
  }
  
  logout(): void {
    this.authService.logout();
  }
}