using System.Threading.Tasks;
using BakuPlastTech.Contract.DTOs.Auth;
using BakuPlastTech.Contract.Services;
using Microsoft.AspNetCore.Mvc;

namespace BakuPlastTech.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
        var token = await _authService.LoginAsync(loginDto);
        if (token == null)
            return Unauthorized(new { Message = "İstifadəçi adı və ya şifrə yanlışdır." });

        return Ok(token);
    }
}
