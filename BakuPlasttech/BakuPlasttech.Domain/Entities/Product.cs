using System.Collections.Generic;

namespace BakuPlastTech.Domain.Entities;

public class Product : BaseEntity
{
    public int CategoryId { get; set; }
    public Category Category { get; set; } = null!;

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

    public ICollection<ProductImage> Images { get; set; } = new List<ProductImage>();
    public ICollection<Inquiry> Inquiries { get; set; } = new List<Inquiry>();
}
