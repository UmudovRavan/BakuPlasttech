using System.Collections.Generic;
using System.Threading.Tasks;
using BakuPlastTech.Contract.DTOs.Product;

namespace BakuPlastTech.Contract.Services;

public interface IProductService
{
    Task<IEnumerable<ProductDto>> GetAllAsync();
    Task<ProductDto?> GetByIdAsync(int id);
    Task<ProductDto?> GetBySlugAsync(string slug);
    Task<IEnumerable<ProductDto>> GetFeaturedProductsAsync();
    Task<bool> CreateAsync(ProductCreateDto createDto);
    Task<bool> UpdateAsync(ProductUpdateDto updateDto);
    Task<bool> DeleteAsync(int id);
}
