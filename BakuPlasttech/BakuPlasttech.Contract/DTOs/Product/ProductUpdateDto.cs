using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

namespace BakuPlastTech.Contract.DTOs.Product;

public class ProductUpdateDto
{
    public int Id { get; set; }
    public int CategoryId { get; set; }
    public string NameAz { get; set; } = null!;
    public string NameRu { get; set; } = null!;
    public string NameEn { get; set; } = null!;
    public string? DescriptionAz { get; set; }
    public string? DescriptionRu { get; set; }
    public string? DescriptionEn { get; set; }
    public string Slug { get; set; } = null!;
    public string? Specifications { get; set; }
    public bool IsActive { get; set; }
    public bool IsFeatured { get; set; }
    
    public IFormFileCollection? ImagesUpload { get; set; }
    public List<int>? RemovedImageIds { get; set; }
}
