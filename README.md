# 📦 Inventory API - ERP Module

A simple Inventory Management module built with **.NET 8 Web API**, **Entity Framework Core**, and **MySQL**. This is part of a modular ERP system.

---

## ✅ Features

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

---

## 🖥️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/mehedibu2013/InventoryAPI.git
cd InventoryAPI
````

### 2. Update MySQL Configuration

Edit `appsettings.json` with your local MySQL credentials:

```json
"ConnectionStrings": {
  "DefaultConnection": "server=localhost;port=3306;database=erp_db;user=root;password=yourpassword"
}
```

### 3. Run Database Migration

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

### 4. Run the Project

```bash
dotnet run
```

Swagger UI will be available at:

* 🔗 `http://localhost:5000/swagger` (HTTP)
* 🔐 `https://localhost:5001/swagger` (HTTPS)

---

## 📦 API Endpoints

| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| GET    | /api/inventory | Get all products  |
| POST   | /api/inventory | Add a new product |

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