using Microsoft.AspNetCore.Http;

namespace BakuPlastTech.Contract.DTOs.Product;

public class ProductCreateDto
{
    public int CategoryId { get; set; }
    public string NameAz { get; set; } = null!;
    public string NameRu { get; set; } = null!;
    public string NameEn { get; set; } = null!;
    public string? DescriptionAz { get; set; }
    public string? DescriptionRu { get; set; }
    public string? DescriptionEn { get; set; }
    public string Slug { get; set; } = null!;
    public string? Specifications { get; set; }
    public bool IsActive { get; set; } = true;
    public bool IsFeatured { get; set; } = false;
    
    public IFormFileCollection? ImagesUpload { get; set; }
}
