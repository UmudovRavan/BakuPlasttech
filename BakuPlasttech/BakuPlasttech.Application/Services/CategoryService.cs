using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BakuPlastTech.Contract.DTOs.Category;
using BakuPlastTech.Contract.Services;
using BakuPlastTech.Domain.Entities;
using BakuPlastTech.Domain.Repositories;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BakuPlastTech.Application.Services;

public class CategoryService : ICategoryService
{
    private readonly ICategoryRepository _categoryRepository;
    private readonly IMapper _mapper;
    private readonly IFileService _fileService;
    private readonly ILogger<CategoryService> _logger;

    public CategoryService(ICategoryRepository categoryRepository, IMapper mapper, IFileService fileService, ILogger<CategoryService> logger)
    {
        _categoryRepository = categoryRepository;
        _mapper = mapper;
        _fileService = fileService;
        _logger = logger;
    }

    public async Task<IEnumerable<CategoryDto>> GetAllAsync()
    {
        try
        {
            var categories = await _categoryRepository.GetAll(false).ToListAsync();
            return _mapper.Map<IEnumerable<CategoryDto>>(categories);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Kateqoriyaları gətirərkən xəta baş verdi.");
            throw;
        }
    }

    public async Task<CategoryDto?> GetByIdAsync(int id)
    {
        try
        {
            var category = await _categoryRepository.GetByIdAsync(id, false);
            return category == null ? null : _mapper.Map<CategoryDto>(category);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Kateqoriyanı ID ({Id}) ilə gətirərkən xəta baş verdi.", id);
            throw;
        }
    }

    public async Task<CategoryDto?> GetBySlugAsync(string slug)
    {
        try
        {
            var category = await _categoryRepository.GetWhere(c => c.Slug == slug, false).FirstOrDefaultAsync();
            return category == null ? null : _mapper.Map<CategoryDto>(category);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Kateqoriyanı Slug ({Slug}) ilə gətirərkən xəta baş verdi.", slug);
            throw;
        }
    }

    public async Task<bool> CreateAsync(CategoryCreateDto createDto)
    {
        try
        {
            var category = _mapper.Map<Category>(createDto);

            // Şəkil yüklənməsi
            if (createDto.ImageUpload != null)
            {
                category.ImageUrl = await _fileService.UploadAsync(createDto.ImageUpload, "categories");
            }

            await _categoryRepository.AddAsync(category);
            var result = await _categoryRepository.SaveAsync() > 0;
            if (result) _logger.LogInformation("Yeni kateqoriya yaradıldı: {Name}", category.NameAz);
            
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Kateqoriya yaradılarkən xəta baş verdi.");
            throw;
        }
    }

    public async Task<bool> UpdateAsync(CategoryUpdateDto updateDto)
    {
        try
        {
            var category = await _categoryRepository.GetByIdAsync(updateDto.Id, true);
            if (category == null) return false;

            // Köhnə şəkili silək və yeni şəkli yükləyək
            if (updateDto.ImageUpload != null)
            {
                if (!string.IsNullOrEmpty(category.ImageUrl))
                {
                    _fileService.Delete(category.ImageUrl);
                }
                category.ImageUrl = await _fileService.UploadAsync(updateDto.ImageUpload, "categories");
            }

            // Gələn məlumatları (ImageUrl xaric) obyektdə yeniləyək
            updateDto.ImageUrl = category.ImageUrl; // Şəkli qorumaq üçün
            _mapper.Map(updateDto, category);
            
            _categoryRepository.Update(category);
            var result = await _categoryRepository.SaveAsync() > 0;
            if (result) _logger.LogInformation("Kateqoriya yeniləndi: {Id}", category.Id);

            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Kateqoriya ({Id}) yenilənərkən xəta baş verdi.", updateDto.Id);
            throw;
        }
    }

    public async Task<bool> DeleteAsync(int id)
    {
        try
        {
            var category = await _categoryRepository.GetByIdAsync(id, false);
            if (category == null) return false;

            // Fiziksel şəkli serverdən sil
            if (!string.IsNullOrEmpty(category.ImageUrl))
            {
                _fileService.Delete(category.ImageUrl);
            }

            var removeResult = _categoryRepository.Remove(category);
            if (!removeResult) return false;
            
            var result = await _categoryRepository.SaveAsync() > 0;
            if (result) _logger.LogInformation("Kateqoriya silindi: {Id}", id);

            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Kateqoriya ({Id}) silinərkən xəta baş verdi.", id);
            throw;
        }
    }
}
