using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace BakuPlastTech.Contract.Services;

public interface IFileService
{
    Task<string> UploadAsync(IFormFile file, string folderName);
    void Delete(string path);
}
