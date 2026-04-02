using System.Linq;
using AutoMapper;
using BakuPlastTech.Contract.DTOs.Category;
using BakuPlastTech.Contract.DTOs.Inquiry;
using BakuPlastTech.Contract.DTOs.Product;
using BakuPlastTech.Domain.Entities;

namespace BakuPlastTech.Application.Mapping;

public class GeneralProfile : Profile
{
    public GeneralProfile()
    {
        // Category Mappings
        CreateMap<Category, CategoryDto>().ReverseMap();
        CreateMap<CategoryCreateDto, Category>();
        CreateMap<CategoryUpdateDto, Category>();

        // Product Mappings
        CreateMap<Product, ProductDto>()
            .ForMember(dest => dest.ImageUrls, opt => opt.MapFrom(src => src.Images.Select(i => i.Url).ToList()))
            .ReverseMap();
        CreateMap<ProductCreateDto, Product>();
        CreateMap<ProductUpdateDto, Product>();

        // Inquiry Mappings
        CreateMap<Inquiry, InquiryDto>().ReverseMap();
        CreateMap<InquiryCreateDto, Inquiry>();
    }
}
