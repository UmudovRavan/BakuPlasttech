using Microsoft.AspNetCore.Http;

namespace BakuPlastTech.Contract.DTOs.Category;

public class CategoryUpdateDto
{
    public int Id { get; set; }
    public string NameAz { get; set; } = null!;
    public string NameRu { get; set; } = null!;
    public string NameEn { get; set; } = null!;
    public string Slug { get; set; } = null!;
    public string? ImageUrl { get; set; }
    public IFormFile? ImageUpload { get; set; }
}
