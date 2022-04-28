using System.Threading.Tasks;
using webapi.DTOs;

namespace webapi.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreateToken(UserDto user);
    }
}
