using System;

namespace BakuPlastTech.Contract.DTOs.Inquiry;

public class InquiryDto
{
    public int Id { get; set; }
    public string FullName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Phone { get; set; } = null!;
    public string Message { get; set; } = null!;
    public int? ProductId { get; set; }
    public bool IsRead { get; set; }
    public DateTime CreatedAt { get; set; }
}
