using BakuPlastTech.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BakuPlastTech.Persistence.Configurations;

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.HasKey(p => p.Id);
        
        builder.Property(p => p.NameAz).IsRequired().HasMaxLength(150);
        builder.Property(p => p.NameRu).IsRequired().HasMaxLength(150);
        builder.Property(p => p.NameEn).IsRequired().HasMaxLength(150);
        
        builder.Property(p => p.Slug).IsRequired().HasMaxLength(200);
        builder.HasIndex(p => p.Slug).IsUnique();

        builder.HasMany(p => p.Images)
               .WithOne(i => i.Product)
               .HasForeignKey(i => i.ProductId)
               .OnDelete(DeleteBehavior.Cascade);
               
        builder.HasMany(p => p.Inquiries)
               .WithOne(i => i.Product)
               .HasForeignKey(i => i.ProductId)
               .OnDelete(DeleteBehavior.SetNull);
    }
}
