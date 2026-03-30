using Microsoft.AspNetCore.Http;

namespace BakuPlastTech.Contract.DTOs.Category;

public class CategoryCreateDto
{
    public string NameAz { get; set; } = null!;
    public string NameRu { get; set; } = null!;
    public string NameEn { get; set; } = null!;
    public string Slug { get; set; } = null!;
    public IFormFile? ImageUpload { get; set; }
}
