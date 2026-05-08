using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using backend.DTOs;

namespace backend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ProfileController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProfileController(AppDbContext context)
        {
            _context = context;
        }

        // ================= SAVE PROFILE =================
        [HttpPost("save-profile")]
        public async Task<IActionResult> SaveProfile([FromBody] ProfileDto dto)
        {
            try
            {
                var email = User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress")?.Value;

                if (string.IsNullOrEmpty(email))
                    return BadRequest("Invalid user token");

                var user = _context.Users.FirstOrDefault(x => x.Email == email);

                if (user == null)
                    return NotFound("User not found");

                // Update safely (avoid overwriting with null)
                user.Name = dto.Name ?? user.Name;
                user.Age = dto.Age ?? user.Age;
                user.Location = dto.Location ?? user.Location;
                user.Bio = dto.Bio ?? user.Bio;

                user.Gender = dto.Gender ?? user.Gender;
                user.LookingFor = dto.LookingFor ?? user.LookingFor;

                user.Personality = dto.Personality ?? user.Personality;
                user.Vibe = dto.Vibe ?? user.Vibe;

                user.Interests = dto.Interests ?? user.Interests;
                user.PhotoUrl = dto.PhotoUrl ?? user.PhotoUrl;

                user.ProfileCompleted = true;

                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Profile saved successfully"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // ================= GET MY PROFILE =================
        [HttpGet("my-profile")]
        public IActionResult GetMyProfile()
        {
            try
            {
                var email = User.FindFirst("email")?.Value;

                if (string.IsNullOrEmpty(email))
                    return BadRequest("Invalid user token");

                var user = _context.Users.FirstOrDefault(x => x.Email == email);

                if (user == null)
                    return NotFound("User not found");

                var result = new ProfileDto
                {
                    Name = user.Name,
                    Age = user.Age,
                    Location = user.Location,
                    Bio = user.Bio,
                    Gender = user.Gender,
                    LookingFor = user.LookingFor,
                    Personality = user.Personality,
                    Vibe = user.Vibe,
                    Interests = user.Interests,
                    PhotoUrl = user.PhotoUrl
                };

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // ================= GET USERS (MATCHING LIST) =================
        [HttpGet("users")]
        public IActionResult GetUsers()
        {
            try
            {
                var email = User.FindFirst("email")?.Value;

                if (string.IsNullOrEmpty(email))
                    return BadRequest("Invalid user token");

                var users = _context.Users
                    .Where(x => x.Email != email && x.ProfileCompleted)
                    .Select(x => new ProfileDto
                    {
                        Name = x.Name,
                        Age = x.Age,
                        Location = x.Location,
                        Bio = x.Bio,
                        Gender = x.Gender,
                        LookingFor = x.LookingFor,
                        Personality = x.Personality,
                        Vibe = x.Vibe,
                        Interests = x.Interests,
                        PhotoUrl = x.PhotoUrl
                    })
                    .ToList();

                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}