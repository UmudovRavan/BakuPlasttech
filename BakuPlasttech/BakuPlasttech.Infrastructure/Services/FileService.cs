using System;
using System.IO;
using System.Threading.Tasks;
using BakuPlastTech.Contract.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace BakuPlastTech.Infrastructure.Services;

public class FileService : IFileService
{
    private readonly IWebHostEnvironment _env;

    public FileService(IWebHostEnvironment env)
    {
        _env = env;
    }

    public async Task<string> UploadAsync(IFormFile file, string folderName)
    {
        if (file == null || file.Length == 0)
            throw new ArgumentException("Fayl boş ola bilməz");

        // Fayli /wwwroot/uploads/{folderName} daxilində saxla
        string uploadsFolder = Path.Combine(_env.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot"), "uploads", folderName);
        if (!Directory.Exists(uploadsFolder))
            Directory.CreateDirectory(uploadsFolder);

        string uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;
        string filePath = Path.Combine(uploadsFolder, uniqueFileName);

        using (var fileStream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(fileStream);
        }

        return $"/uploads/{folderName}/{uniqueFileName}";
    }

    public void Delete(string path)
    {
        if (string.IsNullOrEmpty(path)) return;

        // Path-i lokal fiziki ünvana çevirmək (misal üçün "/uploads/products/1.jpg")
        string physicalPath = Path.Combine(_env.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot"), path.TrimStart('/'));
        
        if (File.Exists(physicalPath))
        {
            File.Delete(physicalPath);
        }
    }
}
