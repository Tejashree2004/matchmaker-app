using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using backend.Data;
using backend.DTOs;
using backend.Models;

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

        // ================= GET CURRENT USER EMAIL =================
        private string? GetUserEmail()
        {
            return User.FindFirst(
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
            )?.Value
            ??
            User.FindFirst("email")?.Value;
        }

        // =========================================================
        // SAVE PROFILE
        // =========================================================
        [HttpPost("save-profile")]
        public async Task<IActionResult> SaveProfile(
            [FromBody] ProfileDto dto
        )
        {
            try
            {
                var email = GetUserEmail();

                if (string.IsNullOrEmpty(email))
                {
                    return BadRequest("Invalid token");
                }

                var user =
                    _context.Users.FirstOrDefault(
                        x => x.Email == email
                    );

                if (user == null)
                {
                    return NotFound("User not found");
                }

                // ================= UPDATE =================

                user.Name =
                    dto.Name ?? user.Name;

                user.Age =
                    dto.Age ?? user.Age;

                user.Location =
                    dto.Location ?? user.Location;

                user.Bio =
                    dto.Bio ?? user.Bio;

                user.Gender =
                    dto.Gender ?? user.Gender;

                user.LookingFor =
                    dto.LookingFor ?? user.LookingFor;

                user.Personality =
                    dto.Personality ?? user.Personality;

                user.Vibe =
                    dto.Vibe ?? user.Vibe;

                user.Language =
                    dto.Language ?? user.Language;

                user.Interests =
                    dto.Interests ?? user.Interests;

                user.PhotoUrl =
                    dto.PhotoUrl ?? user.PhotoUrl;

                user.ProfileCompleted = true;

                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Profile saved successfully"
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

        // =========================================================
        // GET MY PROFILE
        // =========================================================
        [HttpGet("my-profile")]
        public IActionResult GetMyProfile()
        {
            try
            {
                var email = GetUserEmail();

                if (string.IsNullOrEmpty(email))
                {
                    return BadRequest("Invalid token");
                }

                var user =
                    _context.Users.FirstOrDefault(
                        x => x.Email == email
                    );

                if (user == null)
                {
                    return NotFound("User not found");
                }

                return Ok(new
                {
                    id = user.Id,

                    name = user.Name,

                    age = user.Age,

                    location = user.Location,

                    bio = user.Bio,

                    gender = user.Gender,

                    lookingFor = user.LookingFor,

                    personality = user.Personality,

                    vibe = user.Vibe,

                    language = user.Language,

                    interests = user.Interests,

                    photoUrl = user.PhotoUrl
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

        // =========================================================
        // GET ALL USERS
        // =========================================================
        [HttpGet("users")]
        public IActionResult GetUsers()
        {
            try
            {
                var email = GetUserEmail();

                if (string.IsNullOrEmpty(email))
                {
                    return BadRequest("Invalid token");
                }

                var users =
                    _context.Users
                    .Where(x =>
                        x.Email != email
                        &&
                        x.ProfileCompleted == true
                    )
                    .Select(x => new
                    {
                        id = x.Id,

                        name = x.Name,

                        age = x.Age,

                        location = x.Location,

                        bio = x.Bio,

                        gender = x.Gender,

                        lookingFor = x.LookingFor,

                        personality = x.Personality,

                        vibe = x.Vibe,

                        language = x.Language,

                        interests = x.Interests,

                        photoUrl = x.PhotoUrl
                    })
                    .ToList();

                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(
                    500,
                    ex.Message
                );
            }
        }

        // =========================================================
        // SWIPE API
        // =========================================================
        [HttpPost("swipe")]
        public IActionResult SwipeUser(
            [FromBody] SwipeDto dto
        )
        {
            try
            {
                var email = GetUserEmail();

                if (string.IsNullOrEmpty(email))
                {
                    return BadRequest("Invalid token");
                }

                var currentUser =
                    _context.Users.FirstOrDefault(
                        x => x.Email == email
                    );

                if (currentUser == null)
                {
                    return NotFound("Current user not found");
                }

                var targetUser =
                    _context.Users.FirstOrDefault(
                        x => x.Id == dto.LikedUserId
                    );

                if (targetUser == null)
                {
                    return NotFound("Target user not found");
                }

                // ================= SAVE SWIPE =================
              
var existingSwipe =
    _context.Swipes.FirstOrDefault(x =>
        x.UserId == currentUser.Id
        &&
        x.LikedUserId == dto.LikedUserId
    );

if (existingSwipe != null)
{
    // already swipe hai toh update karo
    existingSwipe.IsLike = dto.IsLike;
}
else
{
    // new swipe save karo
    var swipe = new Swipe
    {
        UserId = currentUser.Id,

        LikedUserId = dto.LikedUserId,

        IsLike = dto.IsLike,

        CreatedAt = DateTime.UtcNow
    };

    _context.Swipes.Add(swipe);
}

_context.SaveChanges();

                // ================= CHECK MATCH =================
                bool isMatch = false;

                if (dto.IsLike)
                {
                    isMatch =
                        _context.Swipes.Any(x =>
                            x.UserId == dto.LikedUserId
                            &&
                            x.LikedUserId == currentUser.Id
                            &&
                            x.IsLike == true
                        );
                }

                return Ok(new
                {
                    success = true,

                    isMatch = isMatch,

                    message = dto.IsLike
                        ? "Liked"
                        : "Disliked"
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

        // =========================================================
        // WHO I LIKED
        // =========================================================
       [HttpGet("my-likes")]
public IActionResult GetMyLikes()
{
    try
    {
        var email = GetUserEmail();

        if (string.IsNullOrEmpty(email))
        {
            return BadRequest("Invalid token");
        }

        var currentUser =
            _context.Users.FirstOrDefault(
                x => x.Email == email
            );

        if (currentUser == null)
        {
            return NotFound("User not found");
        }

        // ================= GET UNIQUE LIKED USER IDS =================

        var likedUserIds =
            _context.Swipes
            .Where(x =>
                x.UserId == currentUser.Id
                &&
                x.IsLike == true
            )
            .Select(x => x.LikedUserId)
            .Distinct()
            .ToList();

        // ================= GET USERS =================

        var likedUsers =
            _context.Users
            .Where(user =>
                likedUserIds.Contains(user.Id)
            )
            .Select(user => new
            {
                id = user.Id,
                name = user.Name,
                age = user.Age,
                location = user.Location,
                photoUrl = user.PhotoUrl,
                bio = user.Bio,
                personality = user.Personality,
                vibe = user.Vibe
            })
            .ToList();

        return Ok(likedUsers);
    }
    catch (Exception ex)
    {
        return StatusCode(
            500,
            ex.Message
        );
    }
}

  // =========================================================
// WHO LIKED ME
// =========================================================
[HttpGet("liked-me")]
public IActionResult GetLikedMe()
{
    try
    {
        var email = GetUserEmail();

        if (string.IsNullOrEmpty(email))
        {
            return BadRequest("Invalid token");
        }

        var currentUser =
            _context.Users.FirstOrDefault(
                x => x.Email == email
            );

        if (currentUser == null)
        {
            return NotFound("User not found");
        }

        // ================= USER IDS WHO LIKED ME =================

        var userIds =
            _context.Swipes
            .Where(x =>
                x.LikedUserId == currentUser.Id
                &&
                x.IsLike == true
            )
            .Select(x => x.UserId)
            .Distinct()
            .ToList();

        // ================= GET USERS =================

        var likedMeUsers =
            _context.Users
            .Where(x =>
                userIds.Contains(x.Id)
            )
            .Select(user => new
            {
                id = user.Id,
                name = user.Name,
                age = user.Age,
                location = user.Location,
                photoUrl = user.PhotoUrl,
                bio = user.Bio,
                personality = user.Personality,
                vibe = user.Vibe
            })
            .ToList();

        return Ok(likedMeUsers);
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