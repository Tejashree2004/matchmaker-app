using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class User
{
    public int Id { get; set; }

    public string Email { get; set; }

    public string Password { get; set; }

    public bool IsVerified { get; set; }

    public string? Otp { get; set; }
}
}