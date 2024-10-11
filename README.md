# 🏪 NEXT.JS CHALLENGE | FSJ 03👔

## Link to my deployed app

[Her Store Shopping](https://her-store-shopping.vercel.app/)

## 🛒 Introduction

In this project, I built an e-commerce store that features a product browsing system with pagination, detailed product views, refinement functionalities such as filter, sort and search, and robust error handling. This experience allowed me to dive into essential web development concepts such as server-side rendering and efficient data fetching, all while ensuring a smooth and engaging user experience for exploring products and handling potential issues.

## 🤖 Technologies

- Next.js: Framework for building the React application with server-side rendering
- React: Utilized React's state management with useState for handling the image gallery
- Firestore: Firestore was used as the database for managing and storing the e-commerce data, including products, users, and orders.
- API Endpoints: Custom API endpoints were created within the Next.js app to handle CRUD operations for the products, user authentication, and shopping cart functionality.
- CSS3: Styling with Tailwind CSS for a utility-first approach
- Error Boundaries: Implemented error boundaries or similar mechanisms to manage and display errors gracefully during data fetching
- Authentication: User authentication is managed using Firestore

## Setup Instructions 🚀

Requirements - Ensure you have Node.js installed.

1. Clone the Repository & Open Terminal
2. Install Dependencies: `npm install`
3. Start the Development Server: `npm run dev`
4. View the Live App: Follow the provided link to see the application in action.

## Usage Examples 🛍️

### Home Page 🏠

The main page functions as the landing page for the shopping app, featuring a welcoming heading and a description of the store. It includes a prominent `Shop Now` button that directs users to a page displaying a list of products.

### Products Page 🛒

This page presents a grid of 20 product cards. Each card features the product’s image, title, description, price, and category, along with a `View Details` button. Clicking this button takes you to a page with comprehensive information about the product.

### Pagination

Use the pagination controls to navigate through product pages. The URL updates to show the current page, and the page number is displayed next to the navigation buttons.

### Search, Filter, Sort & Reset

- **Search Products by Title:** Users can search for products by entering a title or part of a title in the search bar. The application dynamically updates the product list based on the search query, allowing users to find items easily.
- **Filter by Categories:** Users can filter products by selecting a category from a dropdown menu. The application will update the displayed products to show only those that belong to the chosen category.
- **Sort Products by Price:** The product list can be sorted in ascending or descending order based on price, providing flexibility for users looking for either budget-friendly or premium products.
- **URL Persistence for Search, Filter & Sort:** The search, filter, and sort parameters are reflected in the URL. This ensures that users can share or bookmark the current view, and others can access the exact product listing they are viewing.
- **Pagination of Filtered Results:** If filtered and sorted results exceed 20 products, pagination controls will be shown to navigate through the results while preserving the selected filters and sorts.
- **Retain Search, Filter & Sort on Navigation:** When users navigate to a detailed product view and return to the product listing, their previously applied search, filter, and sort selections will be retained, avoiding the need to reapply them.
- **Reset Search, Filter & Sort:** A reset option is available, allowing users to clear all search, filtering, and sorting options at once. This will revert the product list to its default state.

### Product Detail Page 📃

To access the detail page, click on the `View Details` button from the products page . This page displays the product image on the left (with scrolling controls for multiple images) and includes the title, brand, description, price, category, tags, rating, and stock availability on the right. Below this, the reviews section lists each reviewer's name, the date the review was added, the comment, and the rating given.

#### Reviews

- **Sort Reviews by Date:** Users can sort the reviews on the product detail page by the date they were added. Options are provided to sort from the latest added review to the earliest, helping users read the most recent feedback or focus on older reviews.
- **Sort Reviews by Rating:** Reviews can also be sorted by the rating provided by customers. Users can choose to see the highest-rated or lowest-rated reviews first, allowing them to evaluate products based on positive or negative experiences.

### Error Handling ❗

Loading State: A loading indicator is shown while fetching data.
Error Messages: Friendly error messages are displayed if product data fails to load.

### Register, Login, and Logout 👤

#### Register (Sign Up)

Users can create a new account by navigating to the Sign Up page, where they are prompted to enter their email and password. After submitting the form, the system checks for valid input and processes the registration. Upon successful registration, users are redirected to the login page where they can sign in.

#### Login

The Login page allows registered users to sign in by providing their email and password. If the credentials match an existing user, they are logged in and redirected to the homepage or their last accessed page. User authentication is handled securely, and their login session persists until they log out or the session expires.
If users attempt to log in with invalid credentials, they are notified with an error message.

#### Logout

A Logout button is conveniently located in the navbar for easy access. Clicking the logout button clears the user’s session and JWT token from firestore, effectively logging them out of the system.
After logging out, users are redirected to the homepage and notified that they have successfully logged out.
