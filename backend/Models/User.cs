using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class User
    {
        public int Id { get; set; }

        // AUTH
        public string Email { get; set; }

        public string Password { get; set; }

        public bool IsVerified { get; set; }

        public string? Otp { get; set; }

        // PROFILE
        public string? Name { get; set; }

        public int? Age { get; set; }

        public string? Location { get; set; }

        public string? Bio { get; set; }

        public string? Gender { get; set; }

        public string? LookingFor { get; set; }

        public string? Personality { get; set; }

        public string? Vibe { get; set; }

        public string? Interests { get; set; }

        public string? PhotoUrl { get; set; }
public string? Language { get; set; }
        public bool ProfileCompleted { get; set; } = false;
    }
}