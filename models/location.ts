import { Product } from "./product";
import { Service } from "./service";
import { User } from "./user";

export interface Location {
  id: number;
  ownerId: User;
  address: {
    type: string;
    coordinates: number[];
    country: string;
    county: string;
    city: string;
    street: string;
    number: string;
    blockApartment: string;
  };
  imageCover: {
    url: string;
    orientation: string;
  };
  products: Product[];
  employees: User[];
  services: Service[];
  minPrice: number;
  distance: number;
}