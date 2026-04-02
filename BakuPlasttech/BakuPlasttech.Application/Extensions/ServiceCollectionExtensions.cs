using System.Reflection;
using BakuPlastTech.Application.Mapping;
using BakuPlastTech.Application.Services;
using BakuPlastTech.Contract.Services;
using Microsoft.Extensions.DependencyInjection;

namespace BakuPlastTech.Application.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        

        // Services
        services.AddScoped<ICategoryService, CategoryService>();
        services.AddScoped<IProductService, ProductService>();
        services.AddScoped<IInquiryService, InquiryService>();

        return services;
    }
}
