namespace BakuPlastTech.Domain.Entities;

public class Inquiry : BaseEntity
{
    public string FullName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Phone { get; set; } = null!;
    public string Message { get; set; } = null!;
    
    public int? ProductId { get; set; }
    public Product? Product { get; set; }
    
    public bool IsRead { get; set; } = false;
}
