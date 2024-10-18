export interface IProduct {
  _id: string;
  name: string;
  description?: string;
  price: number;
  size?: string;
  images: [string];
  isNew?: boolean;
  quantity?: number;
  discount: number;
  category?: object;
}

interface IUser {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phoneNumber?: string;
  role: string;
  profile_img: string;
  address: string;
  otp: string;
  passwordResetToken: string;
  passwordResetTokenExpire: Date;
  created_at: Date;
  updated_at: Date;
}

export interface ICategory {
  _id: string;
  name: string;
  description: string;
}

export interface ISaved {
  _id: string;
  user: IUser;
  products: [{ product: IProduct }];
}

export interface ISavedProducts {
  product: IProduct;
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

export interface IComment {
  _id: string;
  user: IUser;
  products: [{ product: IProduct; comment: string; rate: number }];
}
