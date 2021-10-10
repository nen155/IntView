import { User } from './user';

export interface BusinessInterface {
    id: number;
    name: string;
    email: string;
    cif: string;
    address: string;
    phone: string;
    payment_mode: string;
    presentation_video: string;
    activated: boolean;
    created_at: Date;
  }
