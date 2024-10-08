export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  size: string;
  images: [string];
  isNew: boolean;
  quantity: number;
  discount: number;
  category: object;
}

export interface ICategory {
  _id: string;
  name: string;
  description: string;
}

export interface ISaved {
  _id: string;
  product: IProduct;
  user: object;
}

export interface ICart {
  _id: string;
  user: string;
  products: [{ product: IProduct; quantity: number }];
  totalAmount: number;
}

export interface ICartProducts {
  product: IProduct;
  quantity: number;
}
