using System;

namespace BakuPlastTech.Contract.DTOs.Auth;

public class TokenDto
{
    public string AccessToken { get; set; } = null!;
    public DateTime Expiration { get; set; }
}
