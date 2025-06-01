# Icyizere Business Management System

A comprehensive web-based stock and sales management system for Icyizere Business Ltd. This application helps manage product inventory, track sales, monitor supplier deliveries, and generate reports.

## Features

### Authentication and Security
- Admin-only access with secure login
- JWT-based authentication

### Product Management
- Add, edit, delete, and view products
- Track stock levels with low stock alerts
- Categorize products for better organization

### Stock Management
- Record and track product supplies from suppliers
- Record sales transactions
- Automatically update inventory levels

### Supplier Management
- Manage supplier information and contact details
- Track deliveries and payment status
- Monitor outstanding debts

### Sales Tracking
- Record daily sales with detailed information
- View sales history and track revenue
- Customer information tracking

### Financial Management
- Track payments to suppliers
- Monitor debt status
- Analyze profitability

### Reporting
- Comprehensive reports for sales, inventory, supplier deliveries, and profits
- Data visualization with charts and graphs
- Export capabilities for financial analysis

## Technology Stack

### Backend
- Node.js
- Express.js
- MongoDB (Database)
- JWT for authentication

### Frontend
- React.js
- Material-UI for UI components
- Chart.js for data visualization
- Formik for form handling

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. Clone the repository
```
git clone <repository-url>
cd icyizere-management-system
```

2. Install backend dependencies
```
cd server
npm install
```

3. Install frontend dependencies
```
cd ../client
npm install
```

4. Create environment variables
   - Copy `.env.example` to `.env` in the server directory
   - Configure MongoDB connection string and JWT secret

### Running the Application

1. Start the backend server
```
cd server
npm run dev
```

2. Start the frontend development server
```
cd ../client
npm start
```

3. Access the application at `http://localhost:3000`

## Initial Setup

1. Register an admin account
2. Start by adding your products and suppliers
3. Begin recording stock deliveries and sales transactions

## Deployment

The application can be deployed to any hosting service that supports Node.js applications:

### Backend
- Configure environment variables for production
- Set up MongoDB connection for production
- Deploy the Node.js server

### Frontend
- Build the React application: `npm run build`
- Deploy the build directory to a static hosting service

## Project Structure

```
icyizere-management-system/
├── client/              # React frontend
│   ├── public/          # Static files
│   └── src/             # React source files
│       ├── components/  # Reusable UI components
│       ├── context/     # React context providers
│       ├── pages/       # Page components
│       └── utils/       # Utility functions
│
├── server/              # Node.js backend
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Express middleware
│   ├── models/          # Mongoose models
│   └── routes/          # API routes
│
└── README.md            # Project documentation
```

## License

This project is licensed under the MIT License

## Support

For support, contact Icyizere Business Ltd.
