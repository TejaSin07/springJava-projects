import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'shopping_cart';
  private _cartItems = new BehaviorSubject<Product[]>(this.getCartFromStorage());
  private _cartTotal = new BehaviorSubject<number>(0);
  
  cartItems$ = this._cartItems.asObservable();
  cartTotal$ = this._cartTotal.asObservable();
  
  constructor() {
    this.calculateCartTotal();
  }
  
  getCartItems(): Product[] {
    return this._cartItems.value;
  }
  
  addToCart(product: Product): void {
    const currentCart = this._cartItems.value;
    const existingItem = currentCart.find(item => item.id === product.id);
    
    let updatedCart: Product[];
    
    if (existingItem) {
      // Update quantity of existing item
      updatedCart = currentCart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
    } else {
      // Add new item with quantity of 1
      updatedCart = [...currentCart, { ...product, quantity: 1 }];
    }
    
    this.updateCart(updatedCart);
  }
  
  removeFromCart(productId: string): void {
    const updatedCart = this._cartItems.value.filter(item => item.id !== productId);
    this.updateCart(updatedCart);
  }
  
  updateQuantity(productId: string, quantity: number): void {
    if (quantity < 1) return;
    
    const updatedCart = this._cartItems.value.map(item => 
      item.id === productId ? { ...item, quantity } : item
    );
    
    this.updateCart(updatedCart);
  }
  
  clearCart(): void {
    this.updateCart([]);
  }
  
  private updateCart(cart: Product[]): void {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this._cartItems.next(cart);
    this.calculateCartTotal();
  }
  
  private getCartFromStorage(): Product[] {
    const cartData = localStorage.getItem(this.cartKey);
    return cartData ? JSON.parse(cartData) : [];
  }
  
  private calculateCartTotal(): void {
    const total = this._cartItems.value.reduce((sum, item) => {
      return sum + (item.price.current * (item.quantity || 1));
    }, 0);
    
    this._cartTotal.next(total);
  }
}