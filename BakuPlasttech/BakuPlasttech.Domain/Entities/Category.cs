using System.Collections.Generic;

namespace BakuPlastTech.Domain.Entities;

public class Category : BaseEntity
{
    public string NameAz { get; set; } = null!;
    public string NameRu { get; set; } = null!;
    public string NameEn { get; set; } = null!;
    public string Slug { get; set; } = null!;
    public string? ImageUrl { get; set; }

    public ICollection<Product> Products { get; set; } = new List<Product>();
}
