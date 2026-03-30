using System.Linq.Expressions;
using BakuPlastTech.Domain.Entities;

namespace BakuPlastTech.Domain.Repositories;

public interface IRepository<T> where T : BaseEntity
{
    IQueryable<T> GetAll(bool tracking = true);
    IQueryable<T> GetWhere(Expression<Func<T, bool>> method, bool tracking = true);
    Task<T?> GetSingleAsync(Expression<Func<T, bool>> method, bool tracking = true);
    Task<T?> GetByIdAsync(int id, bool tracking = true);
    
    Task<bool> AddAsync(T model);
    Task<bool> AddRangeAsync(IEnumerable<T> datas);
    
    bool Remove(T model);
    bool RemoveRange(IEnumerable<T> datas);
    Task<bool> RemoveAsync(int id);
    
    bool Update(T model);
    
    Task<int> SaveAsync();
}
