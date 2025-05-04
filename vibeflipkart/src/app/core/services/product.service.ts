import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;
  
  // Temporary mock data for development
  private mockProducts: Product[] = [
    {
      id: '1',
      name: 'iPhone 15 Pro (128GB) - Natural Titanium',
      description: 'The iPhone 15 Pro features a titanium design that's strong yet light, A17 Pro chip for impressive performance, and a customizable Action button.',
      price: {
        current: 119900,
        original: 129900
      },
      discount: 8,
      imageUrl: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=600',
      images: [
        'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg?auto=compress&cs=tinysrgb&w=600'
      ],
      category: 'electronics',
      brand: 'Apple',
      ratings: {
        average: 4.8,
        count: 2432
      },
      specs: {
        'Display': '6.1-inch Super Retina XDR',
        'Processor': 'A17 Pro chip',
        'Camera': '48MP main camera',
        'Battery': 'Up to 23 hours video playback'
      },
      inStock: true
    },
    {
      id: '2',
      name: 'Samsung Galaxy S23 Ultra (256GB) - Phantom Black',
      description: 'The Galaxy S23 Ultra features a built-in S Pen, epic camera, and a powerful processor to keep you creating.',
      price: {
        current: 99999,
        original: 124999
      },
      discount: 20,
      imageUrl: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=600',
      images: [
        'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1447254/pexels-photo-1447254.jpeg?auto=compress&cs=tinysrgb&w=600'
      ],
      category: 'electronics',
      brand: 'Samsung',
      ratings: {
        average: 4.6,
        count: 1875
      },
      specs: {
        'Display': '6.8-inch Dynamic AMOLED 2X',
        'Processor': 'Snapdragon 8 Gen 2',
        'Camera': '200MP main camera',
        'Battery': '5000mAh'
      },
      inStock: true
    },
    {
      id: '3',
      name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
      description: 'Industry-leading noise cancellation optimized for you with multiple noise cancelling microphones.',
      price: {
        current: 29990,
        original: 34990
      },
      discount: 14,
      imageUrl: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=600',
      images: [
        'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=600'
      ],
      category: 'electronics',
      brand: 'Sony',
      ratings: {
        average: 4.7,
        count: 1243
      },
      specs: {
        'Type': 'Over-ear',
        'Noise Cancellation': 'Yes',
        'Battery Life': 'Up to 30 hours',
        'Connectivity': 'Bluetooth 5.2'
      },
      inStock: true
    },
    {
      id: '4',
      name: 'Apple MacBook Air M2 (8GB/256GB)',
      description: 'The new MacBook Air with M2 chip features a strikingly thin design and exceptional battery life.',
      price: {
        current: 92900,
        original: 99900
      },
      discount: 7,
      imageUrl: 'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=600',
      images: [
        'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=600'
      ],
      category: 'electronics',
      brand: 'Apple',
      ratings: {
        average: 4.8,
        count: 1985
      },
      specs: {
        'Processor': 'Apple M2',
        'RAM': '8GB',
        'Storage': '256GB SSD',
        'Display': '13.6-inch Liquid Retina'
      },
      inStock: true
    },
    {
      id: '5',
      name: 'Nike Air Jordan 1 Retro High OG',
      description: 'The Air Jordan 1 Retro High OG is crafted with premium materials and classic design elements.',
      price: {
        current: 16995,
        original: 16995
      },
      discount: 0,
      imageUrl: 'https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=600',
      images: [
        'https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=600'
      ],
      category: 'fashion',
      brand: 'Nike',
      ratings: {
        average: 4.9,
        count: 2543
      },
      specs: {
        'Material': 'Full-grain leather',
        'Style': 'High-top',
        'Closure': 'Lace-up',
        'Color': 'University Blue/White-Black'
      },
      inStock: true
    },
    {
      id: '6',
      name: 'Dyson V15 Detect Cordless Vacuum Cleaner',
      description: 'The Dyson V15 Detect reveals dust you cannot normally see with a precisely-angled laser.',
      price: {
        current: 56900,
        original: 65900
      },
      discount: 14,
      imageUrl: 'https://images.pexels.com/photos/4909821/pexels-photo-4909821.jpeg?auto=compress&cs=tinysrgb&w=600',
      images: [
        'https://images.pexels.com/photos/4909821/pexels-photo-4909821.jpeg?auto=compress&cs=tinysrgb&w=600'
      ],
      category: 'appliances',
      brand: 'Dyson',
      ratings: {
        average: 4.7,
        count: 876
      },
      specs: {
        'Suction Power': 'Up to 230 AW',
        'Run Time': 'Up to 60 minutes',
        'Weight': '3 kg',
        'Bin Volume': '0.76 L'
      },
      inStock: true
    },
    {
      id: '7',
      name: 'Kindle Paperwhite (16 GB) – Now with a 6.8" display',
      description: 'Kindle Paperwhite delivers premium features with a 6.8" display, adjustable warm light, and up to 10 weeks of battery life.',
      price: {
        current: 13999,
        original: 16999
      },
      discount: 18,
      imageUrl: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=600',
      images: [
        'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=600'
      ],
      category: 'electronics',
      brand: 'Amazon',
      ratings: {
        average: 4.6,
        count: 1234
      },
      specs: {
        'Storage': '16 GB',
        'Display': '6.8-inch 300 ppi',
        'Front Light': '17 LEDs',
        'Waterproof': 'IPX8 rated'
      },
      inStock: true
    },
    {
      id: '8',
      name: 'Samsung 65" Neo QLED 4K Smart TV',
      description: 'Experience stunning 4K resolution and immersive sound with this state-of-the-art Neo QLED Smart TV.',
      price: {
        current: 159990,
        original: 189990
      },
      discount: 16,
      imageUrl: 'https://images.pexels.com/photos/6782354/pexels-photo-6782354.jpeg?auto=compress&cs=tinysrgb&w=600',
      images: [
        'https://images.pexels.com/photos/6782354/pexels-photo-6782354.jpeg?auto=compress&cs=tinysrgb&w=600'
      ],
      category: 'electronics',
      brand: 'Samsung',
      ratings: {
        average: 4.5,
        count: 879
      },
      specs: {
        'Display': '65" Neo QLED 4K',
        'Resolution': '3840 x 2160',
        'Smart TV': 'Tizen OS',
        'HDR': 'Quantum HDR 32X'
      },
      inStock: true
    }
  ];
  
  constructor(private http: HttpClient) {}
  
  getProducts(params?: any): Observable<Product[]> {
    // For development, use mock data
    // In production, this would call the API
    return of(this.mockProducts).pipe(
      map(products => {
        if (!params) return products;
        
        let filteredProducts = [...products];
        
        // Filter by category
        if (params.category) {
          filteredProducts = filteredProducts.filter(p => p.category === params.category);
        }
        
        // Filter by search term
        if (params.search) {
          const searchTerm = params.search.toLowerCase();
          filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(searchTerm) || 
            p.description.toLowerCase().includes(searchTerm)
          );
        }
        
        // Filter by price range
        if (params.minPrice) {
          filteredProducts = filteredProducts.filter(p => p.price.current >= params.minPrice);
        }
        if (params.maxPrice) {
          filteredProducts = filteredProducts.filter(p => p.price.current <= params.maxPrice);
        }
        
        // Filter by deals
        if (params.deal === 'today') {
          filteredProducts = filteredProducts.filter(p => p.discount >= 5);
        }
        
        // Sort products
        if (params.sort) {
          switch (params.sort) {
            case 'price_asc':
              filteredProducts.sort((a, b) => a.price.current - b.price.current);
              break;
            case 'price_desc':
              filteredProducts.sort((a, b) => b.price.current - a.price.current);
              break;
            case 'newest':
              // For mock data, just assuming lower IDs are newer
              filteredProducts.sort((a, b) => parseInt(b.id) - parseInt(a.id));
              break;
            case 'popular':
              filteredProducts.sort((a, b) => b.ratings.count - a.ratings.count);
              break;
            default:
              break;
          }
        }
        
        return filteredProducts;
      })
    );
    
    // In production:
    // return this.http.get<Product[]>(this.apiUrl, { params });
  }
  
  getProductById(id: string): Observable<Product | undefined> {
    // For development, use mock data
    return of(this.mockProducts.find(p => p.id === id));
    
    // In production:
    // return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}