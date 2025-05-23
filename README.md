
---

# 📦 Inventory API - ERP Module

A simple Inventory Management module built with **.NET 8 Web API**, **Entity Framework Core**, and **MySQL**.  
This is part of a modular ERP system.

---

## ✅ Features

- 🔐 **JWT Authentication** for secure access
- Add and retrieve products from inventory
- Built using .NET 8 and ASP.NET Core Web API
- Uses MySQL as the relational database
- Swagger UI enabled for testing endpoints

---

## 🔧 Tech Stack

- ASP.NET Core 8 Web API
- C# 12
- Entity Framework Core
- Pomelo MySQL Provider
- MySQL 8.x
- Swagger (Swashbuckle)
- JWT Authentication

---

## 🖥️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/mehedibu2013/InventoryAPI.git  
cd InventoryAPI
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

* 🔗 `http://localhost:5000/swagger` (HTTP)  
* 🔐 `https://localhost:5001/swagger` (HTTPS)

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

## 🛠 Future Enhancements

* Implement role-based authorization (`[Authorize(Roles = "Admin")]`)
* Add user registration and password hashing
* Support for refresh tokens
* Update/Delete product support
* Stock level alerts
* Product categories
* Extend to full ERP (Finance, Procurement, HR)

---

## 🪪 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 👤 Author

Made by [Mehedi](https://github.com/mehedibu2013)

---

Let me know if you'd like a downloadable version of this README or want to generate a ZIP of the full working project!