using System.Linq.Expressions;
using BakuPlastTech.Domain.Entities;
using BakuPlastTech.Domain.Repositories;
using BakuPlastTech.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace BakuPlastTech.Persistence.Repositories;

public class Repository<T> : IRepository<T> where T : BaseEntity
{
    private readonly AppDbContext _context;

    public Repository(AppDbContext context)
    {
        _context = context;
    }

    public DbSet<T> Table => _context.Set<T>();

    public IQueryable<T> GetAll(bool tracking = true)
    {
        var query = Table.AsQueryable();
        if (!tracking) query = query.AsNoTracking();
        return query;
    }

    public IQueryable<T> GetWhere(Expression<Func<T, bool>> method, bool tracking = true)
    {
        var query = Table.Where(method);
        if (!tracking) query = query.AsNoTracking();
        return query;
    }

    public async Task<T?> GetSingleAsync(Expression<Func<T, bool>> method, bool tracking = true)
    {
        var query = Table.AsQueryable();
        if (!tracking) query = query.AsNoTracking();
        return await query.FirstOrDefaultAsync(method);
    }

    public async Task<T?> GetByIdAsync(int id, bool tracking = true)
    {
        // For FindAsync, tracking is always maintained unless explicitly detached later.
        // Or we can manually enforce no-tracking logic natively.
        if (!tracking)
        {
            return await Table.AsNoTracking().FirstOrDefaultAsync(e => e.Id == id);
        }
        return await Table.FindAsync(id);
    }

    public async Task<bool> AddAsync(T model)
    {
        var entityEntry = await Table.AddAsync(model);
        return entityEntry.State == EntityState.Added;
    }

    public async Task<bool> AddRangeAsync(IEnumerable<T> datas)
    {
        await Table.AddRangeAsync(datas);
        return true;
    }

    public bool Remove(T model)
    {
        var entityEntry = Table.Remove(model);
        return entityEntry.State == EntityState.Deleted;
    }

    public bool RemoveRange(IEnumerable<T> datas)
    {
        Table.RemoveRange(datas);
        return true;
    }

    public async Task<bool> RemoveAsync(int id)
    {
        T? model = await Table.FirstOrDefaultAsync(data => data.Id == id);
        if (model == null) return false;
        
        return Remove(model);
    }

    public bool Update(T model)
    {
        var entityEntry = Table.Update(model);
        return entityEntry.State == EntityState.Modified;
    }

    public async Task<int> SaveAsync()
        => await _context.SaveChangesAsync();
}
