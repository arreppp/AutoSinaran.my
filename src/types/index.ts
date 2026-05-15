export interface ServiceItem {
  id: string;
  name: string;
}

export interface Package {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  services: ServiceItem[];
  isActive: boolean;
  isMostPopular?: boolean;
  createdAt: string;
}

export type TimeSlotStatus = 'available' | 'booked' | 'blocked';

export interface TimeSlot {
  time: string;
  status: TimeSlotStatus;
}

export interface DayAvailability {
  date: string;
  slots: TimeSlot[];
}

export type BookingStatus = 'pending_payment' | 'confirmed' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  vehicleNo: string;
  packageId: string;
  packageName: string;
  packagePrice: number;
  packageServices: ServiceItem[];
  date: string;
  time: string;
  status: BookingStatus;
  billplzBillId?: string;
  billplzUrl?: string;
  paidAt?: string;
  createdAt: string;
}

export interface CustomerInfo {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  vehicleNo: string;
}

export interface AdminUser {
  username: string;
  password: string;
}

export interface BillplzBillRequest {
  collection_id: string;
  email: string;
  mobile?: string;
  name: string;
  amount: number;
  callback_url: string;
  redirect_url: string;
  description: string;
  reference_1_label?: string;
  reference_1?: string;
}

export interface BillplzBillResponse {
  id: string;
  collection_id: string;
  paid: boolean;
  state: string;
  amount: number;
  paid_amount: number;
  due_at: string;
  email: string;
  mobile?: string;
  name: string;
  url: string;
  reference_1?: string;
}

export interface BookingStats {
  todayCount: number;
  monthCount: number;
  monthRevenue: number;
}
