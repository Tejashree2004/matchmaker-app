using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class SwipeController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SwipeController(AppDbContext context)
        {
            _context = context;
        }

        // ================= GET USER EMAIL =================
        private string? GetUserEmail()
        {
            return User.FindFirst(
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
            )?.Value
            ?? User.FindFirst("email")?.Value;
        }

        // ================= SWIPE API =================
        [HttpPost("swipe")]
        public async Task<IActionResult> Swipe(
            [FromBody] Swipe swipe
        )
        {
            try
            {
                var email = GetUserEmail();

                if (string.IsNullOrEmpty(email))
                {
                    return BadRequest(
                        "Invalid token"
                    );
                }

                var currentUser =
                    _context.Users
                    .FirstOrDefault(x =>
                        x.Email == email
                    );

                if (currentUser == null)
                {
                    return NotFound(
                        "User not found"
                    );
                }

                // SAVE SWIPE
                swipe.UserId =
                    currentUser.Id;

                swipe.CreatedAt =
                    DateTime.UtcNow;

                _context.Swipes.Add(
                    swipe
                );

                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message =
                        "Swipe saved successfully"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(
                    500,
                    ex.Message
                );
            }
        }
    }
}