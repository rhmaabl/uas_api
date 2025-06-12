# Order History Page Backend Integration

## Overview
The order history page has been successfully integrated with the backend API to dynamically load and display order history with detailed information.

## Features
- **Dynamic Order Loading**: Orders are fetched from the backend API (`/api/orders`)
- **Order Details Modal**: Click "View Details" to see complete order information
- **Status Badges**: Visual status indicators (Pending, Processing, Completed, Cancelled)
- **Real-time Data**: Orders display with real data from the database
- **Error Handling**: Proper error handling for API failures
- **Loading States**: Loading indicators while fetching data
- **Empty State**: Friendly message when no orders exist

## API Endpoints Used
- `GET /api/orders` - Fetches all orders with order items, menu details, and user information
- `GET /api/orders/:id` - Fetches specific order details for modal view

## Data Structure
Orders from the backend include:
- `id_order` - Order ID
- `id_user` - User ID who placed the order
- `status` - Order status (pending, diproses, selesai, dibatalkan)
- `total` - Total order amount
- `created_at` - Order creation date
- `updated_at` - Last update date
- `order_items` - Array of order items with menu details
- `user` - User information who placed the order

Order items include:
- `id_order_item` - Order item ID
- `id_menu` - Menu item ID
- `jumlah` - Quantity ordered
- `harga_satuan` - Unit price
- `subtotal` - Item subtotal
- `menu` - Menu item details (nama, harga, etc.)

## Status Mapping
- `pending` → "Pending" (Yellow badge)
- `diproses` → "Processing" (Blue badge)
- `selesai` → "Completed" (Green badge)
- `dibatalkan` → "Cancelled" (Red badge)

## Setup Instructions
1. Ensure the backend server is running on `http://localhost:3000`
2. Open `order.html` in a web browser
3. The page will automatically load order history from the backend

## Configuration
The API base URL can be modified in `order.js`:
```javascript
const API_BASE_URL = 'http://localhost:3000/api';
```

## Features
- **Order List**: Displays all orders with basic information
- **Order Details Modal**: Shows complete order information including all items
- **Status Tracking**: Visual status indicators for each order
- **Date Formatting**: Proper Indonesian date formatting
- **Currency Formatting**: IDR currency formatting
- **Responsive Design**: Works on all device sizes

## Error Handling
- If orders fail to load, an error message is displayed with retry button
- Network errors are logged to the console
- Graceful handling of missing data

## Future Enhancements
- Order filtering by status
- Date range filtering
- Search functionality
- Order cancellation (if status allows)
- Reorder functionality 