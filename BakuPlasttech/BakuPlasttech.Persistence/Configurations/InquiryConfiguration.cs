using BakuPlastTech.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BakuPlastTech.Persistence.Configurations;

public class InquiryConfiguration : IEntityTypeConfiguration<Inquiry>
{
    public void Configure(EntityTypeBuilder<Inquiry> builder)
    {
        builder.HasKey(i => i.Id);
        
        builder.Property(i => i.FullName).IsRequired().HasMaxLength(150);
        builder.Property(i => i.Email).IsRequired().HasMaxLength(150);
        builder.Property(i => i.Phone).IsRequired().HasMaxLength(50);
        builder.Property(i => i.Message).IsRequired().HasMaxLength(1000);
    }
}
