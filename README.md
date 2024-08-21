# FluxStore

FluxStore is a modern, feature-rich e-commerce application built with Vue 3 and styled using Tailwind CSS. This project demonstrates how to create a dynamic product catalog with advanced features such as product listing, filtering, sorting, detailed product views, wishlist, shopping cart, and more.

## FluxStore Presentation Video

[ https://youtu.be/htpSs-nm8wQ ]

## Login Credentials
**Username:** mor_2314 <br>
**Password:** 83r5^_

## Live Demo

You can view the live demo of the FluxStore application at:
https://fluxstore-ecommerce.vercel.app/

![FluxStore Home Page](./src/assets/Homepage_vue.png)
![FluxStore Product Detail](./src/assets/ProductDetail_vue.png)

## Features

### Theme

- **Dark and Light Mode**: Users can switch between dark and light themes, and their preference is remembered across sessions.
- **Default Theme**: The application has a default theme that is applied when a user first visits the site.
- **Theme Toggle**: Users can easily find and use the theme toggle switch to change the theme.
- **Responsive Styling**: The theme-specific styles are applied correctly across all pages and components, ensuring a consistent user experience on different devices and screen sizes.

### Wishlist (Protected View)

- **Add to Wishlist**: Logged-in users can add products to their wishlist.
- **View Wishlist**: Logged-in users can view all items in their wishlist on a dedicated page.
- **Wishlist Indicator**: The number of items in the user's wishlist is displayed on the wishlist icon.
- **Remove from Wishlist**: Logged-in users can remove products from their wishlist.
- **Move to Cart**: Logged-in users can add products from their wishlist to their shopping cart.
- **Sort and Filter Wishlist**: Logged-in users can sort and filter the items in their wishlist.
- **View Product Details**: Logged-in users can view detailed information about a product from their wishlist.
- **Clear Wishlist**: Logged-in users can clear all items from their wishlist at once.
- **Wishlist Carousel**: The logged-in user's wishlist is highlighted as a carousel on the home page.
- **Persistent Wishlist**: Users' wishlists are saved in local storage and synchronized with the API data.

### Shopping Cart (Protected View)

- **Add to Cart**: Users can add products to their shopping cart.
- **View Cart**: Users can view the items in their shopping cart on a dedicated page.
- **Remove from Cart**: Users can remove products from their shopping cart.
- **Update Quantity**: Users can update the quantity of products in their shopping cart.
- **Cart Summary**: Users can view a summary of their cart, including the total cost.
- **Proceed to Checkout**: Users can proceed to the checkout page from their shopping cart.

### Checkout (Protected View)

- **Auto-fill User Information**: Logged-in users' information (name, address, email) is auto-filled during checkout.
- **Modify User Information**: Logged-in users can modify their information (name, address, email) during checkout.
- **Payment Method Selection**: Logged-in users can select a payment method during checkout (e.g., PayPal sandbox integration).
- **Order Review**: Logged-in users can review the order summary before placing the order.
- **Place Order**: Logged-in users can place their order.
- **Order Confirmation**: Logged-in users see a confirmation message after a successful payment.
- **Payment Failure**: Logged-in users see an error message if the payment fails.
- **View Past Orders**: Logged-in users can view their past orders.
- **Cancel Order**: Logged-in users can cancel an order if necessary.

### Comparison Page (Protected View)

- **Compare Products**: Users can select multiple products to compare their details side-by-side.
- **Highlight Differences**: The application highlights the differences between the selected products, making it easier for users to make informed decisions.
- **Add to Cart**: Users can add products directly to their shopping cart from the comparison page.
- **Add to Wishlist**: Users can add products to their wishlist from the comparison page.

### General Features

- **Responsive Design**: The application is designed to be responsive and accessible on various devices and screen sizes.
- **Skeleton Loaders**: Skeleton loaders are used to provide a smooth loading experience while data is being fetched.
- **Search Functionality**: Users can search for specific products using the search bar.
- **Filtering and Sorting**: Users can filter products by category and sort them by price.

## Technologies Used 🛠️

- [Vue 3](https://v3.vuejs.org/) - The progressive JavaScript framework for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [Pinia](https://pinia.vuejs.org/) - The intuitive store for Vue.js
- [Vue Router](https://router.vuejs.org/) - The official router for Vue.js

## Setup Instructions 📃

1. Clone the repository:

   ```
   git clone https://github.com/MohauMushi/JSF-Portfolio_Piece_MOHMUS379_JSE2407_GroupA_Mohau-Mushi_JSF04.git
   ```

2. Navigate to the project directory:

   ```
   cd JSF-Portfolio_Piece_MOHMUS379_JSE2407_GroupA_Mohau-Mushi_JSF04
   ```

3. Install dependencies:

   ```
   npm install
   ```

4. Start the development server:

   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173` (or the port specified in your terminal).

## Usage

### Browsing Products

- The home page (`HomeView.vue`) displays a grid of product cards.
- Each card shows the product image, title, price, and category.
- Click on a product card to view more details on the ProductDetailView page.

### Filtering and Sorting

- Use the `CategoryFilter` component to filter products by category.
- Use the `PriceSort` component to sort products by price (ascending or descending).

### Searching Products

- Use the `SearchBar` component to search for specific products.

### Loading States

- The `SkeletonLoader` component is used to display loading states while data is being fetched.

### Login

- Users can log in to access protected features like the wishlist,add to cart, comparison, shopping cart and checkout.
- The login functionality is integrated with the application's state management using Pinia.

### Wishlist

- Logged-in users can add products to their wishlist.
- Users can view their wishlist on a dedicated page, where they can manage the items.
- The wishlist is synchronized with the user's local storage to persist the data across sessions.

### Shopping Cart

- Users can add products to their shopping cart.
- The shopping cart page allows users to view, update, and remove items.
- Users can proceed to the checkout page from the shopping cart, enter the information, payment option and then place an order.

### Comparison Page

- Users can select four products to compare their details side-by-side.
- The application highlights the differences between the selected products using a checkbox, making it easier for users to make informed decisions.

## State Management

- The `FilterSortStore.js` store manages the state for filtering and sorting operations using Pinia.
- The `ProductStore.js` store handles the product data and related operations using Pinia.

## Routing

- Vue Router is used for navigation between different views.
- Route definitions can be found in `src/router/router.js`.

## Styling

- Tailwind CSS is used for styling components.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Note:

Most of the help in coding this project came from https://claude.ai/, an AI assistant created by Anthropic.
