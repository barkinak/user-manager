using System;
using System.Text.Json.Serialization;

namespace webapi.DTOs
{
    public class UserDto
    {
        public string Id { get; set; }
        public string Firstname {get; set;}
        public string Lastname {get; set;}
        public string Token {get; set;}
        public string PhotoUrl {get; set;}
        public DateTime DateOfBirth { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Description { get; set; }
    }
}