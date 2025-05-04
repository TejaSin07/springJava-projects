import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../../core/models/product.model';
import { CartService } from '../../../core/services/cart.service';
import { WishlistService } from '../../../core/services/wishlist.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="product-card">
      <div class="discount-badge" *ngIf="product.discount > 0">
        -{{product.discount}}%
      </div>
      <div class="wishlist-btn" (click)="toggleWishlist($event)">
        <span [class.wishlist-active]="isInWishlist">♥</span>
      </div>
      <a [routerLink]="['/products', product.id]" class="product-link">
        <div class="product-img-container">
          <img [src]="product.imageUrl" [alt]="product.name" class="product-img">
        </div>
        <div class="product-info">
          <h3 class="product-name">{{product.name}}</h3>
          <div class="product-rating">
            <span class="star-rating">★★★★★</span>
            <span class="rating-count">({{product.ratings.count}})</span>
          </div>
          <div class="product-price">
            <span class="current-price">₹{{product.price.current}}</span>
            <span class="original-price" *ngIf="product.price.original > product.price.current">
              ₹{{product.price.original}}
            </span>
          </div>
        </div>
      </a>
      <button class="add-to-cart-btn" (click)="addToCart($event)">
        Add to Cart
      </button>
    </div>
  `,
  styles: [`
    .product-card {
      background-color: white;
      border-radius: var(--border-radius-md);
      overflow: hidden;
      box-shadow: var(--box-shadow);
      transition: transform var(--transition-normal), box-shadow var(--transition-normal);
      position: relative;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    
    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }
    
    .discount-badge {
      position: absolute;
      top: 10px;
      left: 10px;
      background-color: var(--error);
      color: white;
      padding: 4px 8px;
      border-radius: var(--border-radius-sm);
      font-size: 12px;
      font-weight: 600;
      z-index: 1;
    }
    
    .wishlist-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      background-color: white;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 2;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      transition: transform var(--transition-fast);
    }
    
    .wishlist-btn:hover {
      transform: scale(1.1);
    }
    
    .wishlist-btn span {
      color: var(--neutral-400);
      font-size: 18px;
      line-height: 1;
      transition: color var(--transition-fast);
    }
    
    .wishlist-active {
      color: var(--error) !important;
    }
    
    .product-link {
      color: inherit;
      text-decoration: none;
      display: block;
      flex-grow: 1;
    }
    
    .product-img-container {
      height: 200px;
      overflow: hidden;
    }
    
    .product-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      padding: var(--space-2);
      transition: transform var(--transition-normal);
    }
    
    .product-card:hover .product-img {
      transform: scale(1.05);
    }
    
    .product-info {
      padding: var(--space-2);
    }
    
    .product-name {
      font-size: 14px;
      font-weight: 500;
      color: var(--neutral-800);
      margin-bottom: 8px;
      height: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    
    .product-rating {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      font-size: 12px;
    }
    
    .star-rating {
      color: #FFCA28;
      margin-right: 4px;
    }
    
    .rating-count {
      color: var(--neutral-600);
    }
    
    .product-price {
      display: flex;
      align-items: center;
    }
    
    .current-price {
      font-weight: 700;
      font-size: 16px;
      color: var(--neutral-900);
      margin-right: 8px;
    }
    
    .original-price {
      color: var(--neutral-600);
      text-decoration: line-through;
      font-size: 14px;
    }
    
    .add-to-cart-btn {
      background-color: var(--primary);
      color: white;
      border: none;
      padding: 8px 0;
      border-radius: 0;
      font-weight: 500;
      cursor: pointer;
      transition: background-color var(--transition-fast);
      width: 100%;
      margin-top: auto;
    }
    
    .add-to-cart-btn:hover {
      background-color: var(--primary-dark);
    }
  `]
})
export class ProductCardComponent {
  @Input() product!: Product;
  isInWishlist = false;
  
  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {}
  
  ngOnInit(): void {
    this.wishlistService.isInWishlist(this.product.id).subscribe(isInWishlist => {
      this.isInWishlist = isInWishlist;
    });
  }
  
  addToCart(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.addToCart(this.product);
  }
  
  toggleWishlist(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.isInWishlist) {
      this.wishlistService.removeFromWishlist(this.product.id);
    } else {
      this.wishlistService.addToWishlist(this.product);
    }
    this.isInWishlist = !this.isInWishlist;
  }
}