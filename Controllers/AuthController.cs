using ERPSystem.API.Models; // Make sure JwtSettings is in this namespace
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;

namespace ERPSystem.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly JwtSettings _jwtSettings;

        public AuthController(IOptions<JwtSettings> jwtSettings)
        {
            _jwtSettings = jwtSettings?.Value ?? throw new ArgumentNullException(nameof(jwtSettings));
            if (string.IsNullOrEmpty(_jwtSettings.SecretKey) || 
                string.IsNullOrEmpty(_jwtSettings.Issuer) || 
                string.IsNullOrEmpty(_jwtSettings.Audience))
            {
                throw new InvalidOperationException("JwtSettings configuration is incomplete.");
            }
        }

        /// <summary>
        /// Simulates login and returns a JWT token
        /// </summary>
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel model)
        {
            // 🔐 Validate input
            if (model == null || string.IsNullOrEmpty(model.Username) || string.IsNullOrEmpty(model.Password))
            {
                return BadRequest("Invalid login request.");
            }

            // 🔐 Simulate user validation (replace with real DB check later)
            if (model.Username == "admin" && model.Password == "password")
            {
                var claims = new[]
                {
                    new Claim(ClaimTypes.Name, model.Username),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey));

                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    issuer: _jwtSettings.Issuer,
                    audience: _jwtSettings.Audience,
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(_jwtSettings.TokenExpirationMinutes),
                    signingCredentials: creds);

                var tokenHandler = new JwtSecurityTokenHandler();

                return Ok(new
                {
                    Token = tokenHandler.WriteToken(token),
                    Expiration = token.ValidTo
                });
            }

            return Unauthorized("Invalid credentials.");
        }
    }

    public class LoginModel
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
    }
}