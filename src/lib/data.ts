import type { Kpi, User, Order, DispatchesData, OnTimeDeliveriesData } from './types';
import { PlaceHolderImages } from './placeholder-images';

export const kpis: Kpi[] = [
  {
    title: 'Average Load Time',
    value: '28 min',
    change: '-12.5%',
    changeType: 'decrease',
    description: 'from last week',
  },
  {
    title: 'Dispatches per Employee',
    value: '21.5',
    change: '+5.2%',
    changeType: 'increase',
    description: 'from last week',
  },
  {
    title: 'Reported Incidents',
    value: '3',
    change: '+20%',
    changeType: 'increase',
    description: 'from last week',
  },
  {
    title: 'On-Time Deliveries',
    value: '96.2%',
    change: '+2.1%',
    changeType: 'increase',
    description: 'from last month',
  },
];

export const users: User[] = [
  { id: '1', name: 'Alex Johnson', email: 'alex.j@example.com', role: 'Admin', avatar: PlaceHolderImages.find(img => img.id === 'user-1')?.imageUrl || '' },
  { id: '2', name: 'Maria Garcia', email: 'maria.g@example.com', role: 'Dispatcher', avatar: PlaceHolderImages.find(img => img.id === 'user-2')?.imageUrl || '' },
  { id: '3', name: 'James Smith', email: 'james.s@example.com', role: 'Driver', avatar: PlaceHolderImages.find(img => img.id === 'user-3')?.imageUrl || '' },
  { id: '4', name: 'Patricia Brown', email: 'patricia.b@example.com', role: 'Dispatcher', avatar: PlaceHolderImages.find(img => img.id === 'user-4')?.imageUrl || '' },
  { id: '5', name: 'Robert Davis', email: 'robert.d@example.com', role: 'Driver', avatar: PlaceHolderImages.find(img => img.id === 'user-5')?.imageUrl || '' },
];

export const orders: Order[] = [
  { id: 'ORD-001', customer: 'Globex Corp', destination: 'Springfield, IL', status: 'In-Transit', eta: '2024-08-15 14:30' },
  { id: 'ORD-002', customer: 'Stark Industries', destination: 'New York, NY', status: 'Delivered', eta: '2024-08-12 11:00' },
  { id: 'ORD-003', customer: 'Wayne Enterprises', destination: 'Gotham City, NJ', status: 'Pending', eta: '2024-08-16 09:00' },
  { id: 'ORD-004', customer: 'Acme Corporation', destination: 'Albuquerque, NM', status: 'Delayed', eta: '2024-08-14 18:00' },
  { id: 'ORD-005', customer: 'Cyberdyne Systems', destination: 'Sunnyvale, CA', status: 'In-Transit', eta: '2024-08-15 10:00' },
];

export const dispatchesData: DispatchesData[] = [
    { name: 'Maria G.', dispatches: 32 },
    { name: 'Patricia B.', dispatches: 28 },
    { name: 'John D.', dispatches: 25 },
    { name: 'Michael P.', dispatches: 22 },
    { name: 'Sarah W.', dispatches: 18 },
];

export const onTimeDeliveriesData: OnTimeDeliveriesData[] = [
  { month: 'Mar', onTime: 92, total: 100 },
  { month: 'Apr', onTime: 94, total: 100 },
  { month: 'May', onTime: 93, total: 100 },
  { month: 'Jun', onTime: 95, total: 100 },
  { month: 'Jul', onTime: 97, total: 100 },
  { month: 'Aug', onTime: 96, total: 100 },
];
