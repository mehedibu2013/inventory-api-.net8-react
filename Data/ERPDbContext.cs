using Microsoft.EntityFrameworkCore;
using ERPSystem.API.Models;

namespace ERPSystem.API.Data;

public class ERPDbContext : DbContext
{
    public ERPDbContext(DbContextOptions<ERPDbContext> options) : base(options) {}

    public DbSet<Product> Products => Set<Product>();
}
