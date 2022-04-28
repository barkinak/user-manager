using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using webapi.Data;
using webapi.DTOs;
using webapi.Interfaces;

namespace webapi.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataService _dataService;
        private readonly ITokenService _tokenService;

        public AccountController(DataService dataService, ITokenService tokenService)
        {
            _dataService = dataService;
            _tokenService = tokenService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            UserDto user = _dataService.GetUserByUsername(loginDto.Username);
            if (user == null)
                return Unauthorized("Invalid username");
            var result = _dataService.CheckPassword(user, loginDto);
            if (!result) 
                return Unauthorized("Wrong password");
            return new UserDto
            {
                Id = user.Id,
                Firstname = user.Firstname,
                Lastname = user.Lastname,
                Token = await _tokenService.CreateToken(user),
                PhotoUrl = user.PhotoUrl,
                DateOfBirth = user.DateOfBirth
            };
        }
    }
}
