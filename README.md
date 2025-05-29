
---

# 📦 ERP Module

A simple Inventory Management module built with .NET 8 Web API, Entity Framework Core, MySQL, and a React frontend. This is part of a modular ERP system, combining a robust backend with a user-friendly web interface.

---

## ✅ Features

- 🔐 **JWT Authentication** for secure access
- Add and retrieve products from inventory
- Built using .NET 8 and ASP.NET Core Web API
- Uses MySQL as the relational database
- Swagger UI enabled for testing endpoints
- React-based frontend for a dynamic user interface
- Real-time product listing and addition via the web app

---

## 🔧 Tech Stack

Backend:
- ASP.NET Core 8 Web API
- C# 12
- Entity Framework Core
- Pomelo MySQL Provider
- MySQL 8.x
- Swagger (Swashbuckle)
- JWT Authentication

Frontend:
- React 18.3.1
- Vite 5.3.1
- Axios for HTTP requests
- React Router DOM for client-side routing
- JavaScript (JSX)

---

## 🖥️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/mehedibu2013/ERPSystem.API.git  
cd ERPSystem.API
```

### 2. Update MySQL Configuration

Edit `appsettings.json` with your local MySQL credentials:

```json
"ConnectionStrings": {
  "DefaultConnection": "server=localhost;port=3306;database=erp_db;user=root;password=yourpassword"
}
```

### 3. Configure JWT Settings

Add this section to your `appsettings.json`:

```json
"JwtSettings": {
  "SecretKey": "your-secret-key-here-must-be-long-and-secure",
  "Issuer": "InventoryAPI",
  "Audience": "InventoryUsers",
  "TokenExpirationMinutes": 30
}
```

### 4. Run Database Migration

Make sure [EF Tools](https://learn.microsoft.com/en-us/ef/core/cli/dotnet) are installed:

```bash
dotnet new tool-manifest
dotnet tool install dotnet-ef --version 8.0.14
```

Then run:

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### 5. Run the Project

```bash
dotnet run
```

Swagger UI will be available at:

* 🔗 `http://localhost:5240/swagger` (HTTP)  

---

## 🔐 Authentication

This API now supports **JWT Bearer Token Authentication**.

### 📤 Login Endpoint

Use the `/Auth/login` endpoint to get a token:

```json
{
  "username": "admin",
  "password": "password"
}
```

You'll receive a response like:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx",
  "expiration": "2025-06-05T12:30:00Z"
}
```
### 🔐 Use the Token in Swagger

1. Click the **Authorize** button at the top-right of Swagger UI.
2. Paste the token like this:
   ```
   Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx
   ```
3. All secured endpoints will now accept authenticated requests.

---

## 📦 API Endpoints

| Method | Endpoint         | Description               |
| ------ | ---------------- | ------------------------- |
| POST   | `/Auth/login`    | Get JWT token             |
| GET    | `/api/inventory` | Get all products *(secured)* |
| POST   | `/api/inventory` | Add a new product *(secured)* |

### 📥 Sample POST Body

```json
{
  "sku": "PRD001",
  "name": "Wireless Mouse",
  "quantityInStock": 50,
  "unitPrice": 20.99
}
```
---

## 🖥️ Frontend Setup (React)

The frontend of the application is built using **React** and resides inside the `ClientApp` directory.

### 🔧 Getting Started

#### 1. Navigate to the ClientApp Directory
```bash
cd ClientApp
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Configure Environment Variables

Create or edit the `.env` file in the `ClientApp` directory with the following content:
```env
VITE_API_URL=http://localhost:5240
```
This ensures the frontend communicates correctly with the backend API running on port `5240`.

---

## 🌐 Application Features

### 🔐 Login Page (`/login`)
- Allows users to log in using default credentials: `admin/password`.
- On successful login, a JWT token is obtained and stored in `localStorage`.
- Redirects the user to the `/inventory` page.

### 📦 Inventory Page (`/inventory`)
- Displays a list of products fetched from the `/api/inventory` endpoint.
- Provides a form to add new products via a POST request.
- Automatically updates the product list after a successful addition.
  
### 🔐 Authentication Management
- Uses **AuthContext** to manage authentication state and JWT token.
- Token is persisted across sessions using `localStorage`.

### 🧭 Routing
- Navigation between pages is handled using `react-router-dom`.
- Available routes:
  - `/login`
  - `/inventory`
---

## 🛠️ Future Enhancements

- ✅ Implement role-based authorization (`[Authorize(Roles = "Admin")]`)
- 🧾 Add user registration and secure password hashing
- ♻️ Support for refresh tokens
- ✏️ Add support for editing and deleting products in the frontend
- 💬 Display success messages or loading spinners during API calls
- 🔔 Add stock level alerts
- 🗂️ Introduce product categories
- 📈 Extend the system into a full ERP suite (Finance, Procurement, HR)

---

## 🪪 License

This project is open-source and available under the [MIT License](LICENSE).

---
