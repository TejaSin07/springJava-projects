import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCardComponent],
  template: `
    <div class="container">
      <!-- Hero Banner -->
      <div class="hero-banner">
        <div class="hero-content">
          <h1 class="hero-title">Big Savings, Big Selection</h1>
          <p class="hero-subtitle">Shop the latest products at incredible prices!</p>
          <a routerLink="/products" class="hero-cta btn btn-primary">Shop Now</a>
        </div>
      </div>
      
      <!-- Featured Categories -->
      <section class="section">
        <h2 class="section-title">Shop by Category</h2>
        <div class="category-grid">
          <div *ngFor="let category of categories" class="category-card">
            <a [routerLink]="['/products']" [queryParams]="{category: category.id}">
              <div class="category-img-container">
                <img [src]="category.imageUrl" [alt]="category.name" class="category-img">
              </div>
              <h3 class="category-name">{{category.name}}</h3>
            </a>
          </div>
        </div>
      </section>
      
      <!-- Deal of the Day -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">Deals of the Day</h2>
          <a routerLink="/products" [queryParams]="{deal: 'today'}" class="view-all">View All</a>
        </div>
        <div class="product-slider">
          <div *ngFor="let product of dealProducts" class="product-slider-item">
            <app-product-card [product]="product"></app-product-card>
          </div>
        </div>
      </section>
      
      <!-- New Arrivals -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">New Arrivals</h2>
          <a routerLink="/products" [queryParams]="{sort: 'newest'}" class="view-all">View All</a>
        </div>
        <div class="product-slider">
          <div *ngFor="let product of newProducts" class="product-slider-item">
            <app-product-card [product]="product"></app-product-card>
          </div>
        </div>
      </section>
      
      <!-- Top Brands -->
      <section class="section">
        <h2 class="section-title">Top Brands</h2>
        <div class="brands-container">
          <div *ngFor="let brand of topBrands" class="brand-item">
            <img [src]="brand.logoUrl" [alt]="brand.name" class="brand-logo">
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .hero-banner {
      height: 400px;
      background: linear-gradient(135deg, var(--primary-dark), var(--primary));
      border-radius: var(--border-radius-lg);
      margin-bottom: var(--space-4);
      display: flex;
      align-items: center;
      position: relative;
      overflow: hidden;
    }
    
    .hero-banner::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 50%;
      height: 100%;
      background-image: url('https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
      background-size: cover;
      background-position: center left;
      opacity: 0.85;
    }
    
    .hero-content {
      padding: var(--space-4);
      width: 50%;
      z-index: 1;
      animation: fadeInUp 0.8s ease;
    }
    
    .hero-title {
      color: white;
      font-size: 2.5rem;
      margin-bottom: var(--space-2);
      font-weight: 700;
    }
    
    .hero-subtitle {
      color: rgba(255, 255, 255, 0.9);
      font-size: 1.1rem;
      margin-bottom: var(--space-3);
    }
    
    .hero-cta {
      background-color: var(--accent);
      color: var(--neutral-900);
      padding: 12px 24px;
      font-weight: 600;
      transition: transform var(--transition-normal);
    }
    
    .hero-cta:hover {
      background-color: var(--accent-dark);
      transform: translateY(-2px);
    }
    
    .section {
      margin-bottom: var(--space-5);
    }
    
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-3);
    }
    
    .section-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--neutral-900);
      position: relative;
      display: inline-block;
    }
    
    .view-all {
      color: var(--primary);
      font-weight: 500;
      font-size: 14px;
    }
    
    .view-all:hover {
      text-decoration: underline;
    }
    
    .category-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-3);
    }
    
    .category-card {
      background-color: white;
      border-radius: var(--border-radius-md);
      overflow: hidden;
      box-shadow: var(--box-shadow);
      transition: transform var(--transition-normal);
    }
    
    .category-card:hover {
      transform: translateY(-5px);
    }
    
    .category-img-container {
      height: 120px;
      overflow: hidden;
    }
    
    .category-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--transition-normal);
    }
    
    .category-card:hover .category-img {
      transform: scale(1.05);
    }
    
    .category-name {
      padding: var(--space-2);
      text-align: center;
      font-size: 14px;
      font-weight: 500;
    }
    
    .product-slider {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: var(--space-2);
      overflow-x: auto;
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    
    .product-slider::-webkit-scrollbar {
      display: none;
    }
    
    .product-slider-item {
      min-width: 200px;
    }
    
    .brands-container {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      gap: var(--space-3);
    }
    
    .brand-item {
      background-color: white;
      border-radius: var(--border-radius-md);
      width: 120px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--box-shadow);
      padding: var(--space-1);
      transition: transform var(--transition-fast);
    }
    
    .brand-item:hover {
      transform: scale(1.05);
    }
    
    .brand-logo {
      max-width: 80%;
      max-height: 60%;
      object-fit: contain;
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @media (max-width: 992px) {
      .category-grid {
        grid-template-columns: repeat(3, 1fr);
      }
      
      .product-slider {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    
    @media (max-width: 768px) {
      .hero-banner {
        height: 300px;
      }
      
      .hero-banner::after {
        width: 100%;
        opacity: 0.2;
      }
      
      .hero-content {
        width: 100%;
        text-align: center;
      }
      
      .category-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .product-slider {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (max-width: 480px) {
      .hero-title {
        font-size: 2rem;
      }
      
      .category-grid {
        grid-template-columns: 1fr 1fr;
      }
      
      .product-slider-item {
        min-width: 150px;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  categories = [
    { 
      id: 'electronics', 
      name: 'Electronics', 
      imageUrl: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' 
    },
    { 
      id: 'fashion', 
      name: 'Fashion', 
      imageUrl: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' 
    },
    { 
      id: 'home', 
      name: 'Home & Furniture', 
      imageUrl: 'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' 
    },
    { 
      id: 'appliances', 
      name: 'Appliances', 
      imageUrl: 'https://images.pexels.com/photos/6996084/pexels-photo-6996084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' 
    }
  ];
  
  dealProducts: Product[] = [];
  newProducts: Product[] = [];
  
  topBrands = [
    { name: 'Samsung', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/1280px-Samsung_Logo.svg.png' },
    { name: 'Apple', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png' },
    { name: 'Sony', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Sony_logo.svg/1024px-Sony_logo.svg.png' },
    { name: 'Nike', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/800px-Logo_NIKE.svg.png' },
    { name: 'Adidas', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/1280px-Adidas_Logo.svg.png' }
  ];
  
  constructor(private productService: ProductService) {}
  
  ngOnInit(): void {
    // Get deal products
    this.productService.getProducts({ deal: 'today' }).subscribe(products => {
      this.dealProducts = products.slice(0, 5);
    });
    
    // Get new arrivals
    this.productService.getProducts({ sort: 'newest' }).subscribe(products => {
      this.newProducts = products.slice(0, 5);
    });
  }
}