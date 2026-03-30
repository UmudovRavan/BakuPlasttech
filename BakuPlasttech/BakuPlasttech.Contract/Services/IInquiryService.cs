using System.Collections.Generic;
using System.Threading.Tasks;
using BakuPlastTech.Contract.DTOs.Inquiry;

namespace BakuPlastTech.Contract.Services;

public interface IInquiryService
{
    Task<IEnumerable<InquiryDto>> GetAllAsync();
    Task<InquiryDto?> GetByIdAsync(int id);
    Task<bool> CreateAsync(InquiryCreateDto createDto);
    Task<bool> MarkAsReadAsync(int id);
    Task<bool> DeleteAsync(int id);
}
