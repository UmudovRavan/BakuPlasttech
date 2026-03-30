using System.Threading.Tasks;
using BakuPlastTech.Contract.DTOs.Inquiry;
using BakuPlastTech.Contract.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BakuPlastTech.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class InquiriesController : ControllerBase
{
    private readonly IInquiryService _inquiryService;

    public InquiriesController(IInquiryService inquiryService)
    {
        _inquiryService = inquiryService;
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAll()
    {
        var inquiries = await _inquiryService.GetAllAsync();
        return Ok(inquiries);
    }

    [HttpGet("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetById(int id)
    {
        var inquiry = await _inquiryService.GetByIdAsync(id);
        if (inquiry == null) return NotFound(new { Message = "Müraciət tapılmadı." });

        return Ok(inquiry);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] InquiryCreateDto createDto)
    {
        var result = await _inquiryService.CreateAsync(createDto);
        if (!result) return BadRequest(new { Message = "Müraciət göndərilərkən xəta baş verdi." });

        return Ok(new { Message = "Müraciət uğurla göndərildi." });
    }

    [HttpPut("{id}/read")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> MarkAsRead(int id)
    {
        var result = await _inquiryService.MarkAsReadAsync(id);
        if (!result) return NotFound(new { Message = "Müraciət tapılmadı və ya əməliyyat uğursuz oldu." });

        return Ok(new { Message = "Müraciət oxundu olaraq işarələndi." });
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _inquiryService.DeleteAsync(id);
        if (!result) return NotFound(new { Message = "Müraciət tapılmadı və ya silinə bilmədi." });

        return Ok(new { Message = "Müraciət uğurla silindi." });
    }
}
