using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BakuPlastTech.Contract.DTOs.Product;
using BakuPlastTech.Contract.Services;
using BakuPlastTech.Domain.Entities;
using BakuPlastTech.Domain.Repositories;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BakuPlastTech.Application.Services;

public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;
    private readonly IProductImageRepository _productImageRepository;
    private readonly IMapper _mapper;
    private readonly IFileService _fileService;
    private readonly ILogger<ProductService> _logger;

    public ProductService(IProductRepository productRepository, IProductImageRepository productImageRepository, IMapper mapper, IFileService fileService, ILogger<ProductService> logger)
    {
        _productRepository = productRepository;
        _productImageRepository = productImageRepository;
        _mapper = mapper;
        _fileService = fileService;
        _logger = logger;
    }

    public async Task<IEnumerable<ProductDto>> GetAllAsync()
    {
        try
        {
            var products = await _productRepository.GetAll(false).ToListAsync();
            return _mapper.Map<IEnumerable<ProductDto>>(products);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Məhsulları gətirərkən xəta baş verdi.");
            throw;
        }
    }

    public async Task<ProductDto?> GetByIdAsync(int id)
    {
        try
        {
            var product = await _productRepository.GetByIdAsync(id, false);
            return product == null ? null : _mapper.Map<ProductDto>(product);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Məhsulu ID ({Id}) ilə gətirərkən xəta baş verdi.", id);
            throw;
        }
    }

    public async Task<ProductDto?> GetBySlugAsync(string slug)
    {
        try
        {
            var product = await _productRepository.GetWhere(p => p.Slug == slug, false).FirstOrDefaultAsync();
            return product == null ? null : _mapper.Map<ProductDto>(product);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Məhsulu Slug ({Slug}) ilə gətirərkən xəta baş verdi.", slug);
            throw;
        }
    }

    public async Task<IEnumerable<ProductDto>> GetFeaturedProductsAsync()
    {
        try
        {
            var products = await _productRepository.GetWhere(p => p.IsFeatured && p.IsActive, false).ToListAsync();
            return _mapper.Map<IEnumerable<ProductDto>>(products);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Ön plana çıxarılan məhsulları gətirərkən xəta baş verdi.");
            throw;
        }
    }

    public async Task<bool> CreateAsync(ProductCreateDto createDto)
    {
        try
        {
            var product = _mapper.Map<Product>(createDto);

            // Şəkillərin yüklənməsi
            if (createDto.ImagesUpload != null && createDto.ImagesUpload.Count > 0)
            {
                int maxOrder = 0;
                foreach (var file in createDto.ImagesUpload)
                {
                    string fileUrl = await _fileService.UploadAsync(file, "products");
                    product.Images.Add(new ProductImage
                    {
                        Url = fileUrl,
                        DisplayOrder = ++maxOrder
                    });
                }
            }

            await _productRepository.AddAsync(product);
            var result = await _productRepository.SaveAsync() > 0;
            if (result) _logger.LogInformation("Yeni məhsul yaradıldı: {Name}", product.NameAz);

            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Məhsul yaradılarkən xəta baş verdi.");
            throw;
        }
    }

    public async Task<bool> UpdateAsync(ProductUpdateDto updateDto)
    {
        try
        {
            var product = await _productRepository.GetWhere(p => p.Id == updateDto.Id, true)
                                                  .Include(p => p.Images)
                                                  .FirstOrDefaultAsync();
            if (product == null) return false;

            // Köhnə şəkillərin silinməsi
            if (updateDto.RemovedImageIds != null && updateDto.RemovedImageIds.Any())
            {
                var imagesToRemove = product.Images.Where(i => updateDto.RemovedImageIds.Contains(i.Id)).ToList();
                foreach (var img in imagesToRemove)
                {
                    _fileService.Delete(img.Url);
                    _productImageRepository.Remove(img);
                }
            }

            // Yeni şəkillərin əlavəsi
            if (updateDto.ImagesUpload != null && updateDto.ImagesUpload.Count > 0)
            {
                int maxOrder = product.Images.Any() ? product.Images.Max(i => i.DisplayOrder) : 0;
                foreach (var file in updateDto.ImagesUpload)
                {
                    string fileUrl = await _fileService.UploadAsync(file, "products");
                    product.Images.Add(new ProductImage
                    {
                        Url = fileUrl,
                        DisplayOrder = ++maxOrder
                    });
                }
            }

            _mapper.Map(updateDto, product);
            _productRepository.Update(product);

            var result = await _productRepository.SaveAsync() > 0;
            if (result) _logger.LogInformation("Məhsul yeniləndi: {Id}", product.Id);

            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Məhsul ({Id}) yenilənərkən xəta baş verdi.", updateDto.Id);
            throw;
        }
    }

    public async Task<bool> DeleteAsync(int id)
    {
        try
        {
            var product = await _productRepository.GetWhere(p => p.Id == id, false)
                                                  .Include(p => p.Images)
                                                  .FirstOrDefaultAsync();
            if (product == null) return false;

            // Bütün fiziki şəkilləri silirik
            foreach (var img in product.Images)
            {
                _fileService.Delete(img.Url);
            }

            var removeResult = _productRepository.Remove(product);
            if (!removeResult) return false;

            var result = await _productRepository.SaveAsync() > 0;
            if (result) _logger.LogInformation("Məhsul silindi: {Id}", id);

            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Məhsul ({Id}) silinərkən xəta baş verdi.", id);
            throw;
        }
    }
}
