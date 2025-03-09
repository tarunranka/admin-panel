# Admin Panel

## Overview

This project is an admin panel built using React and Vite, designed for managing sales, inventory, and products. It includes a mock backend using `json-server` for easy API simulation.

## Features

- **Frontend**: React with Vite for fast development.
- **Styling**: Tailwind CSS and styled-components.
- **Navigation**: React Router.
- **State Management**: Redux Toolkit.
- **Mock Backend**: `json-server` with endpoints for sales, inventory, and products.

## Node and Yarn Version

- **Node**: v22.14.0
- **Yarn**: 1.22.17

## Mock Backend

To run the mock backend, use the following command:

```sh
npx json-server --watch db.json --port 5001
```

Available API Endpoints:

- `http://localhost:5173/api/sales`
- `http://localhost:5173/api/inventory`
- `http://localhost:5173/api/products`

## Setup & Usage

### Install Dependencies

```sh
yarn install
```

### Start the Application

```sh
yarn dev
```

## Redux Slices (State Management)

Each slice represents a feature module (e.g., products, sales, auth) and defines:

- **State**: Stores data relevant to the feature.
- **Async Thunks**: Handles asynchronous API calls (e.g., fetching products, sales data, login).
- **Reducers**: Defines how state updates based on dispatched actions.

### How it Works

#### Async Actions (e.g., `fetchProducts`, `addProduct`)

- Calls API functions (`fetchProductsApi`, `addProductApi`).
- Handles pending, fulfilled, and rejected states.

#### State Properties

- `items`: Stores the list of products.
- `status`: Tracks API call status (loading, succeeded, failed).
- `error`: Stores error messages.

#### Example Usage

**Dispatching an Action (`fetchProducts`)**

- `useDispatch()` gets the Redux dispatch function.
- `dispatch(fetchProducts())` triggers the API call when the component mounts.

**Accessing Redux State (`useSelector`)**

- `useSelector((state) => state.products)` gets the current state.
- `items` contains the product list.
- `status` handles loading states.
- `error` shows API errors.

**Rendering Data**

- If loading, show a message.
- If error, display an error.
- Otherwise, display product table.
