# Menu Page Backend Integration

## Overview
The menu page has been successfully integrated with the backend API to dynamically load menu items and categories, and create orders through the checkout process.

## Features
- **Dynamic Menu Loading**: Menu items are fetched from the backend API (`/api/menu`)
- **Category Filtering**: Categories are loaded from the backend API (`/api/kategori`) and used for filtering
- **Real-time Cart Management**: Cart functionality works with backend data
- **Order Creation**: Checkout process creates orders in the backend (`/api/orders`)
- **Error Handling**: Proper error handling for API failures
- **Loading States**: Loading indicators while fetching data

## API Endpoints Used
- `GET /api/menu` - Fetches all menu items with category and user information
- `GET /api/kategori` - Fetches all categories for filtering
- `POST /api/orders` - Creates new orders from cart items

## Data Structure
Menu items from the backend include:
- `id` - Menu item ID
- `nama` - Menu item name
- `harga` - Price in IDR
- `gambar` - Image URL
- `jumlah` - Available quantity
- `id_kategori` - Category ID
- `kategori` - Category object with `nama_kategori`
- `user` - User object who created the menu item

## Checkout Process
When a user checks out:
1. Cart items are formatted for the backend API
2. Order is created via `POST /api/orders`
3. Order includes:
   - `id_user` - User ID (currently hardcoded as 1)
   - `items` - Array of cart items with `id_menu`, `jumlah`, `harga_satuan`
4. Success message shows the created order ID
5. Cart is cleared and modal is closed

## Setup Instructions
1. Ensure the backend server is running on `http://localhost:3000`
2. Open `menu.html` in a web browser
3. The page will automatically load menu items and categories from the backend
4. Add items to cart and checkout to create orders

## Configuration
The API base URL can be modified in `menu.js`:
```javascript
const API_BASE_URL = 'http://localhost:3000/api';
```

## Error Handling
- If menu items fail to load, an error message is displayed
- If categories fail to load, the page continues without category filtering
- If checkout fails, an error message is shown
- Network errors are logged to the console

## Cart Functionality
- Cart items are stored locally in the browser
- Prices are displayed in IDR format
- Tax calculation (10%) is applied to the total
- Checkout creates real orders in the backend database
- Orders can be viewed in the order history page

## Integration with Order History
- Orders created through checkout appear in the order history page
- Order history page shows all orders with status tracking
- Complete order flow from menu → cart → checkout → order history 

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