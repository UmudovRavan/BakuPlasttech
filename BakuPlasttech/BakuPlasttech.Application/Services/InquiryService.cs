using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BakuPlastTech.Contract.DTOs.Inquiry;
using BakuPlastTech.Contract.Services;
using BakuPlastTech.Domain.Entities;
using BakuPlastTech.Domain.Repositories;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BakuPlastTech.Application.Services;

public class InquiryService : IInquiryService
{
    private readonly IInquiryRepository _inquiryRepository;
    private readonly IMapper _mapper;
    private readonly ILogger<InquiryService> _logger;

    public InquiryService(IInquiryRepository inquiryRepository, IMapper mapper, ILogger<InquiryService> logger)
    {
        _inquiryRepository = inquiryRepository;
        _mapper = mapper;
        _logger = logger;
    }

    public async Task<IEnumerable<InquiryDto>> GetAllAsync()
    {
        try
        {
            var inquiries = await _inquiryRepository.GetAll(false).ToListAsync();
            return _mapper.Map<IEnumerable<InquiryDto>>(inquiries);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Müraciətləri gətirərkən xəta baş verdi.");
            throw;
        }
    }

    public async Task<InquiryDto?> GetByIdAsync(int id)
    {
        try
        {
            var inquiry = await _inquiryRepository.GetByIdAsync(id, false);
            return inquiry == null ? null : _mapper.Map<InquiryDto>(inquiry);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Müraciəti ID ({Id}) ilə gətirərkən xəta baş verdi.", id);
            throw;
        }
    }

    public async Task<bool> CreateAsync(InquiryCreateDto createDto)
    {
        try
        {
            var inquiry = _mapper.Map<Inquiry>(createDto);
            await _inquiryRepository.AddAsync(inquiry);
            var result = await _inquiryRepository.SaveAsync() > 0;
            if (result) _logger.LogInformation("Yeni müraciət yaradıldı: {Email}", inquiry.Email);
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Müraciət yaradılarkən xəta baş verdi.");
            throw;
        }
    }

    public async Task<bool> MarkAsReadAsync(int id)
    {
        try
        {
            var inquiry = await _inquiryRepository.GetByIdAsync(id, true);
            if (inquiry == null) return false;

            inquiry.IsRead = true;
            _inquiryRepository.Update(inquiry);
            
            var result = await _inquiryRepository.SaveAsync() > 0;
            if (result) _logger.LogInformation("Müraciət ({Id}) oxunmuş kimi işarələndi.", id);
            
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Müraciət ({Id}) oxunmuş işarələnərkən xəta baş verdi.", id);
            throw;
        }
    }

    public async Task<bool> DeleteAsync(int id)
    {
        try
        {
            var result = await _inquiryRepository.RemoveAsync(id);
            if (!result) return false;

            var saveResult = await _inquiryRepository.SaveAsync() > 0;
            if (saveResult) _logger.LogInformation("Müraciət ({Id}) silindi.", id);
            
            return saveResult;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Müraciət ({Id}) silinərkən xəta baş verdi.", id);
            throw;
        }
    }
}
