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

interface IUser {
  _id: string;
  firstname: String;
  lastname: String;
  email: String;
  password: String;
  phoneNumber?: String;
  role: String;
  profile_img: String;
  address: String;
  otp: String;
  passwordResetToken: String;
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
