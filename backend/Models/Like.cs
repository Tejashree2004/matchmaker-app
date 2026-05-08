namespace backend.Models
{
    public class Like
    {
        public int Id { get; set; }

        public int LikerId { get; set; }

        public int LikedUserId { get; set; }

        public bool IsLike { get; set; }
    }
}