using System;

namespace webapi.Entities
{
    public class AppUser
    {
        public string Id { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string PhotoUrl { get; set; }
        public DateTime DateOfBirth { get; set; }
    }
}
