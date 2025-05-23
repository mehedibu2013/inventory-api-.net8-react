using Microsoft.AspNetCore.Mvc;
using ERPSystem.API.Models;
using ERPSystem.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace ERPSystem.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize] 
public class InventoryController : ControllerBase
{
    private readonly ERPDbContext _context;

    public InventoryController(ERPDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> Get() => Ok(await _context.Products.ToListAsync());

    [HttpPost]
    public async Task<IActionResult> Post(Product product)
    {
        _context.Products.Add(product);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = product.Id }, product);
    }
}
