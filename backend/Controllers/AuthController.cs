using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.DTOs;
using backend.Models;
using backend.Services;
using backend.Helpers;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly EmailService _emailService;
        private readonly JwtHelper _jwtHelper;

        public AuthController(
            AppDbContext context,
            EmailService emailService,
            JwtHelper jwtHelper)
        {
            _context = context;
            _emailService = emailService;
            _jwtHelper = jwtHelper;
        }

        // ================= SIGNUP =================
        [HttpPost("signup")]
        public async Task<IActionResult> Signup([FromBody] RegisterDto dto)
        {
            if (dto == null)
                return BadRequest("Invalid request");

            if (string.IsNullOrWhiteSpace(dto.Email) ||
                string.IsNullOrWhiteSpace(dto.Password))
                return BadRequest("Email and Password are required");

            var existingUser = _context.Users.FirstOrDefault(x => x.Email == dto.Email);
            if (existingUser != null)
                return BadRequest("User already exists");

            var otp = new Random().Next(100000, 999999).ToString();

            var user = new User
            {
                Email = dto.Email.Trim(),
                Password = dto.Password,
                IsVerified = false,
                Otp = otp
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            try
            {
                await _emailService.SendOtpAsync(dto.Email, otp);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Email sending failed: " + ex.Message);
            }

            return Ok(new
            {
                email = dto.Email,
                message = "OTP sent successfully"
            });
        }

        // ================= VERIFY EMAIL =================
        [HttpPost("verify-email")]
        public IActionResult Verify([FromBody] VerifyOtpDto dto)
        {
            if (dto == null)
                return BadRequest("Invalid request");

            if (string.IsNullOrWhiteSpace(dto.Email) ||
                string.IsNullOrWhiteSpace(dto.Otp))
                return BadRequest("Email and OTP are required");

            var user = _context.Users.FirstOrDefault(x => x.Email == dto.Email);

            if (user == null)
                return BadRequest("User not found");

            if (user.Otp != dto.Otp)
                return BadRequest("Invalid OTP");

            user.IsVerified = true;
            user.Otp = null;

            _context.SaveChanges();

            return Ok(new
            {
                message = "Email verified successfully"
            });
        }

        // ================= LOGIN =================
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto dto)
        {
            if (dto == null)
                return BadRequest("Invalid request");

            if (string.IsNullOrWhiteSpace(dto.Email) ||
                string.IsNullOrWhiteSpace(dto.Password))
                return BadRequest("Email and Password are required");

            var user = _context.Users.FirstOrDefault(x =>
                x.Email == dto.Email &&
                x.Password == dto.Password);

            if (user == null)
                return BadRequest("Invalid credentials");

            if (!user.IsVerified)
                return BadRequest("Email not verified");

            var token = _jwtHelper.GenerateToken(user);

            return Ok(new
            {
                token,
                email = user.Email
            });
        }
    }
}