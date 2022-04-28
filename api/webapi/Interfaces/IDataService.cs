using System.Collections.Generic;
using webapi.DTOs;

namespace webapi.Interfaces
{
    public interface IDataService
    {
        void AddUser(UserDto user);
        void UpdateUser(UserDto user);
        void DeleteUser(UserDto user);
        UserDto GetUser(int id);
        List<UserDto> GetUsers();
    }
}
