using System.Threading.Tasks;
using BakuPlastTech.Contract.DTOs.Auth;

namespace BakuPlastTech.Contract.Services;

public interface IAuthService
{
    Task<TokenDto?> LoginAsync(LoginDto loginDto);
}
