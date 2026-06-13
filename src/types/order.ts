export interface OrderListItem {
  id: string;
  orderId: string;
  totalAmount: number;
  deliveryFee: number;
  gst: number;
  status: string;
  createdAt: string;
  shippingAddress: {
    houseNo: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: {
    id: string;
    quantity: number;
    priceAtPurchase: number;
    product: {
      id: string;
      title: string;
      fileUrl: string[];
      price: number;
    };
  }[];
}

export interface OrderItem {
  id: string;
  quantity: number;
  priceAtPurchase: string;
  product: {
    id: string;
    title: string;
    description: string;
    fileUrl: string[];
    thumbnailUrl: string | null;
    price: string;
    category: string;
    user: {
      firstName: string;
      lastName: string;
      businessName?: string;
      associateProfile?: {
        businessName: string;
        city: string;
        category: string;
        businessDetails: { businessMobile: string };
      };
    };
  };
}

export interface OrderDetailResponse {
  id: string;
  orderId: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  buyer: {
    fullName: string;
    phoneNumber: string;
    email: string;
  };
  shippingAddress: {
    houseNo: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: OrderItem[];
  invoiceUrl: string | null;
}
