using BakuPlastTech.Domain.Repositories;
using BakuPlastTech.Persistence.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace BakuPlastTech.Persistence.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddPersistenceServices(this IServiceCollection services)
    {
        services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
        services.AddScoped<ICategoryRepository, CategoryRepository>();
        services.AddScoped<IProductRepository, ProductRepository>();
        services.AddScoped<IProductImageRepository, ProductImageRepository>();
        services.AddScoped<IInquiryRepository, InquiryRepository>();

        return services;
    }
}
