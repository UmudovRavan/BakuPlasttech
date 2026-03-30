using System.Threading.Tasks;
using BakuPlastTech.Contract.DTOs.Product;
using BakuPlastTech.Contract.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BakuPlastTech.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var products = await _productService.GetAllAsync();
        return Ok(products);
    }

    [HttpGet("featured")]
    public async Task<IActionResult> GetFeatured()
    {
        var products = await _productService.GetFeaturedProductsAsync();
        return Ok(products);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var product = await _productService.GetByIdAsync(id);
        if (product == null) return NotFound(new { Message = "Məhsul tapılmadı." });

        return Ok(product);
    }

    [HttpGet("slug/{slug}")]
    public async Task<IActionResult> GetBySlug(string slug)
    {
        var product = await _productService.GetBySlugAsync(slug);
        if (product == null) return NotFound(new { Message = "Məhsul tapılmadı." });

        return Ok(product);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Create([FromForm] ProductCreateDto createDto)
    {
        var result = await _productService.CreateAsync(createDto);
        if (!result) return BadRequest(new { Message = "Məhsul yaradılarkən xəta baş verdi." });

        return Ok(new { Message = "Məhsul uğurla yaradıldı." });
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(int id, [FromForm] ProductUpdateDto updateDto)
    {
        if (id != updateDto.Id)
            return BadRequest(new { Message = "ID uyğunsuzluğu." });

        var result = await _productService.UpdateAsync(updateDto);
        if (!result) return NotFound(new { Message = "Məhsul tapılmadı və ya yenilənə bilmədi." });

        return Ok(new { Message = "Məhsul uğurla yeniləndi." });
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _productService.DeleteAsync(id);
        if (!result) return NotFound(new { Message = "Məhsul tapılmadı və ya silinə bilmədi." });

        return Ok(new { Message = "Məhsul uğurla silindi." });
    }
}
