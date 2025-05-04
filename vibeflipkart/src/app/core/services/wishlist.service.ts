import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistKey = 'wishlist';
  private _wishlistItems = new BehaviorSubject<Product[]>(this.getWishlistFromStorage());
  
  wishlistItems$ = this._wishlistItems.asObservable();
  
  constructor() {}
  
  getWishlistItems(): Product[] {
    return this._wishlistItems.value;
  }
  
  addToWishlist(product: Product): void {
    const currentWishlist = this._wishlistItems.value;
    if (!currentWishlist.some(item => item.id === product.id)) {
      const updatedWishlist = [...currentWishlist, product];
      this.updateWishlist(updatedWishlist);
    }
  }
  
  removeFromWishlist(productId: string): void {
    const updatedWishlist = this._wishlistItems.value.filter(item => item.id !== productId);
    this.updateWishlist(updatedWishlist);
  }
  
  isInWishlist(productId: string): Observable<boolean> {
    return of(this._wishlistItems.value.some(item => item.id === productId));
  }
  
  clearWishlist(): void {
    this.updateWishlist([]);
  }
  
  private updateWishlist(wishlist: Product[]): void {
    localStorage.setItem(this.wishlistKey, JSON.stringify(wishlist));
    this._wishlistItems.next(wishlist);
  }
  
  private getWishlistFromStorage(): Product[] {
    const wishlistData = localStorage.getItem(this.wishlistKey);
    return wishlistData ? JSON.parse(wishlistData) : [];
  }
}