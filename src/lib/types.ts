export type User = {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Dispatcher' | 'Driver';
  avatar: string;
};

export type Order = {
  id: string;
  customer: string;
  destination: string;
  status: 'Pending' | 'In-Transit' | 'Delivered' | 'Delayed';
  eta: string;
};

export type Kpi = {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  description: string;
};

export type DispatchesData = {
  name: string;
  dispatches: number;
};

export type OnTimeDeliveriesData = {
  month: string;
  onTime: number;
  total: number;
};
