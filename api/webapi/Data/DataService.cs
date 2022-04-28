using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using webapi.DTOs;

namespace webapi.Data
{
    public class DataService
    {
        List<UserDto> _users = new List<UserDto>();

        public DataService() {
            var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
            _users = JsonSerializer.Deserialize<List<UserDto>>(userData);
        }

        public bool CheckPassword(UserDto userDto, LoginDto loginDto)
        {
            if (userDto.Password == loginDto.Password)
                return true;
            return false;
        }

        public void AddUser(UserDto user)
        {
            user.Username = $"{user.Firstname.ToLower()}{user.Lastname.ToLower()}";
            user.Password = "password";
            _users.Add(user);
        }

        public void DeleteUser(string id)
        {
            var user = GetUser(id);
            _users.Remove(user);
        }

        public UserDto GetUser(string id)
        {
            return _users.Single(u => u.Id == id);
        }
        public UserDto GetUserByUsername(string username)
        {
            Console.WriteLine(username);
            foreach(var user in _users)
            {
                Console.WriteLine(user.Username);
            }
            return _users.SingleOrDefault(u => u.Username == username);
        }

        public List<UserDto> GetUsers()
        {
            return _users;
        }

        public void UpdateUser(UserDto user)
        {
            var userIndex = _users.FindIndex(u => u.Id == user.Id);
            _users[userIndex] = user;
        }

        public int GetCount() {
            return _users.Count;
        }
    }
}
