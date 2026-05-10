namespace backend.Models
{
    public class Swipe
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public int LikedUserId { get; set; }

        public bool IsLike { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}