using System.Threading.Tasks;
using BakuPlastTech.Contract.DTOs.Category;
using BakuPlastTech.Contract.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BakuPlastTech.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryService _categoryService;

    public CategoriesController(ICategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var categories = await _categoryService.GetAllAsync();
        return Ok(categories);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var category = await _categoryService.GetByIdAsync(id);
        if (category == null) return NotFound(new { Message = "Kateqoriya tapılmadı." });

        return Ok(category);
    }

    [HttpGet("slug/{slug}")]
    public async Task<IActionResult> GetBySlug(string slug)
    {
        var category = await _categoryService.GetBySlugAsync(slug);
        if (category == null) return NotFound(new { Message = "Kateqoriya tapılmadı." });

        return Ok(category);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Create([FromForm] CategoryCreateDto createDto)
    {
        var result = await _categoryService.CreateAsync(createDto);
        if (!result) return BadRequest(new { Message = "Kateqoriya yaradılarkən xəta baş verdi." });

        return Ok(new { Message = "Kateqoriya uğurla yaradıldı." });
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(int id, [FromForm] CategoryUpdateDto updateDto)
    {
        if (id != updateDto.Id)
            return BadRequest(new { Message = "ID uyğunsuzluğu." });

        var result = await _categoryService.UpdateAsync(updateDto);
        if (!result) return NotFound(new { Message = "Kateqoriya tapılmadı və ya yenilənə bilmədi." });

        return Ok(new { Message = "Kateqoriya uğurla yeniləndi." });
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _categoryService.DeleteAsync(id);
        if (!result) return NotFound(new { Message = "Kateqoriya tapılmadı və ya silinə bilmədi." });

        return Ok(new { Message = "Kateqoriya uğurla silindi." });
    }
}
