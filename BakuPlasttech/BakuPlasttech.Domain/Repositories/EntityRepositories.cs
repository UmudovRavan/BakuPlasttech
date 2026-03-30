using BakuPlastTech.Domain.Entities;

namespace BakuPlastTech.Domain.Repositories;

public interface ICategoryRepository : IRepository<Category>
{
}

public interface IProductRepository : IRepository<Product>
{
}

public interface IProductImageRepository : IRepository<ProductImage>
{
}

public interface IInquiryRepository : IRepository<Inquiry>
{
}
