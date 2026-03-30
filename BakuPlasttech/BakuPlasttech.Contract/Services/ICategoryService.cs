using System.Collections.Generic;
using System.Threading.Tasks;
using BakuPlastTech.Contract.DTOs.Category;

namespace BakuPlastTech.Contract.Services;

public interface ICategoryService
{
    Task<IEnumerable<CategoryDto>> GetAllAsync();
    Task<CategoryDto?> GetByIdAsync(int id);
    Task<CategoryDto?> GetBySlugAsync(string slug);
    Task<bool> CreateAsync(CategoryCreateDto createDto);
    Task<bool> UpdateAsync(CategoryUpdateDto updateDto);
    Task<bool> DeleteAsync(int id);
}
