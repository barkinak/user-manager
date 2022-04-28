using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using webapi.Data;
using webapi.DTOs;

namespace webapi.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly DataService _dataService;

        public UsersController(DataService dataService)
        {
            _dataService = dataService;
        }

        // Get all users
        // GET api/<UsersController>
        [HttpGet]
        public IEnumerable<UserDto> Get()
        {
            Console.WriteLine("Get Request arrived...");
            return _dataService.GetUsers();
        }

        // Get user by id
        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        public UserDto Get(string id)
        {
            Console.WriteLine("Get user Request arrived...");
            return _dataService.GetUser(id);
        }

        // Add user
        // POST api/<UsersController>
        [HttpPost]
        public async Task<ActionResult> Post(UserDto userDto)
        {
            Console.WriteLine("Post Request arrived...");
            _dataService.AddUser(userDto);
            return Ok();
        }

        // Update user by id
        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put([FromBody] UserDto userDto)
        {
            Console.WriteLine("Put Request arrived...");
            _dataService.UpdateUser(userDto);
            return NoContent();
        }

        // Delete user by id
        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            Console.WriteLine("Delete Request arrived...");
            _dataService?.DeleteUser(id);
            return Ok();
        }
    }
}
