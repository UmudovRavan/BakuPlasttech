namespace BakuPlastTech.Contract.DTOs.Inquiry;

public class InquiryCreateDto
{
    public string FullName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Phone { get; set; } = null!;
    public string Message { get; set; } = null!;
    public int? ProductId { get; set; }
}
