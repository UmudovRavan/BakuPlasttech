using BakuPlastTech.Domain.Entities;
using BakuPlastTech.Domain.Repositories;
using BakuPlastTech.Persistence.Contexts;

namespace BakuPlastTech.Persistence.Repositories;

public class CategoryRepository : Repository<Category>, ICategoryRepository
{
    public CategoryRepository(AppDbContext context) : base(context) { }
}

public class ProductRepository : Repository<Product>, IProductRepository
{
    public ProductRepository(AppDbContext context) : base(context) { }
}

public class ProductImageRepository : Repository<ProductImage>, IProductImageRepository
{
    public ProductImageRepository(AppDbContext context) : base(context) { }
}

public class InquiryRepository : Repository<Inquiry>, IInquiryRepository
{
    public InquiryRepository(AppDbContext context) : base(context) { }
}
