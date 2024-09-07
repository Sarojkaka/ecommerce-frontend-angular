import { Category } from "./category";

export interface Product {
  productId: number;
  productName: string;
  description: string;
  price: number;
  quantity: number;
  date: string;
  imagePath: string;
  category:Category;
  categoryId?:number;
  categoryName:string;
  
}