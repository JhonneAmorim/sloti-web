export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
  providerId: string;
  createdAt: string;
  updatedAt: string;
}

export type ServiceDto = Omit<Service, 'id' | 'providerId' | 'createdAt' | 'updatedAt'>;
