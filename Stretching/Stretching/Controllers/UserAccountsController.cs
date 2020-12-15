using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AuthCommon;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Stretching.Context;
using Stretching.Models.ModelsDto;
using Stretching.MVC.Models;

namespace Stretching.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserAccountsController : ControllerBase
    {
        private readonly StretchingContext _context;
        private readonly IOptions<AuthOptions> authOptions;
        public UserAccountsController(StretchingContext context, IOptions<AuthOptions> auth)
        {
            _context = context;
            this.authOptions = auth;
        }

        // GET: api/UserAccounts
        [HttpGet]
        public string Getuser_account()
        {
            return JsonConvert.SerializeObject(_context.user_account.Join(_context.user_info,
                   ua => ua.id,
                   e => e.user_id,
                   (ua, e) => new { ua, e })
               .Select(
                user_all => new
                {
                    id = user_all.ua.id,
                    user_password = user_all.ua.user_password,
                    user_name = user_all.ua.user_name,
                    role = user_all.ua.role,
                    id_info = user_all.e.id,
                    height = user_all.e.height,
                    weight_ = user_all.e.weight_,
                    program = user_all.e.program,
                    desired_weight = user_all.e.desired_weight
                }).OrderBy(o => o.id).ToList());
        }

        // GET: api/UserAccounts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserAccount>> GetUserAccount(int id)
        {
            var userAccount = await _context.user_account.FindAsync(id);

            if (userAccount == null)
            {
                return NotFound();
            }

            return userAccount;
        }


        [HttpGet("userDto")]
        public string GetUserById(int id)
        {
            //var userAccount = _context.user_account.Find(id);

            var result = JsonConvert.SerializeObject(_context.user_account.Join(_context.user_info,
                   ua => ua.id,
                   e => e.user_id,
                   (ua, e) => new { ua, e })
                    .Select(
                         user_all => new {
                             id = user_all.ua.id,
                             user_password = user_all.ua.user_password,
                             user_name = user_all.ua.user_name,
                             role = user_all.ua.role,
                             id_info = user_all.e.id,
                             height = user_all.e.height,
                             weight_ = user_all.e.weight_,
                             desired_weight = user_all.e.desired_weight,
                             program = user_all.e.program
                         }).Where(o => o.id == id).FirstOrDefault());


            return result;
        }

        [HttpGet("userDataWorkoutData")]
        public string GetUserWokoutDataById(int id)
        {
            //var userAccount = _context.user_account.Find(id);

            var result = JsonConvert.SerializeObject(_context.user_account
                .Join(_context.user_info,
                   ua => ua.id,
                   e => e.user_id,
                   (ua, e) => new { ua, e })
                    .Select(
                         user_all => new {
                             id = user_all.ua.id,
                             user_password = user_all.ua.user_password,
                             user_name = user_all.ua.user_name,
                             role = user_all.ua.role,
                             id_info = user_all.e.id,
                             height = user_all.e.height,
                             weight_ = user_all.e.weight_,
                             program = user_all.e.program,
                             desired_weight = user_all.e.desired_weight
                         }).Where(o => o.id == id).FirstOrDefault());


            return result;
        }



        [HttpGet("userRole")]
        public string GetUserById(string name)
        {
            //var userAccount = _context.user_account.Find(id);

            var result = JsonConvert.SerializeObject(_context.user_account.Where(o => o.user_name == name)
                    .Select(
                         user_all => new {
                             role = user_all.role,
                             id = user_all.id
                         }).FirstOrDefault());

            return result;
        }

        // PUT: api/UserAccounts/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserAccount(int id, UserAccountInfo userAccountInfo)
        {
            var userAccount = new UserAccount() { id = id,
                user_name = userAccountInfo.user_name,
                user_password = userAccountInfo.user_password,
                role = userAccountInfo.role
            };

            if (id != userAccount.id)
            {
                return BadRequest();
            }

            _context.Entry(userAccount).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserAccountExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            var userInfo = new UserInfo()
            {
                id = userAccountInfo.id_info,
                height = userAccountInfo.height,
                desired_weight = userAccountInfo.desired_weight,
                weight_ = userAccountInfo.weight_,
                user_id = id,
                program  = userAccountInfo.program
            };

            _context.Entry(userInfo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return NoContent();
        }

        // POST: api/UserAccounts
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public void PostUserAccount(UserDto userAccount)
        {
            var user = _context.user_account.Add(new UserAccount() { user_name = userAccount.user_name, user_password = userAccount.user_password, role = userAccount.role });
            _context.SaveChanges();
            int id = _context.user_account.Max(o => o.id);
            _context.user_info.Add(new UserInfo() { user_id = id, height = userAccount.height, weight_ = userAccount.weight_, desired_weight = userAccount.desired_weight, program = userAccount.program });
            _context.SaveChanges();
        }

        // DELETE: api/UserAccounts/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<UserAccount>> DeleteUserAccount(int id)
        {
            var userAccount = await _context.user_account.FindAsync(id);
            if (userAccount == null)
            {
                return NotFound();
            }

            _context.user_account.Remove(userAccount);
            await _context.SaveChangesAsync();

            return userAccount;
        }

        private bool UserAccountExists(int id)
        {
            return _context.user_account.Any(e => e.id == id);
        }

        [HttpPost("login")]

        public IActionResult Login([FromBody] UserAccount request)
        {
            var user = AuthenticateUser(request.user_name, request.user_password);

            if (user != null)
            {
                var token = GenerateJWT(user);

                return Ok(new
                {
                    access_token = token
                });
            }
            return Unauthorized();
        }

        private UserAccount AuthenticateUser(string user_name, string user_password)
        {
            return _context.user_account.SingleOrDefault(o => o.user_name == user_name && o.user_password == user_password);
        }

        private string GenerateJWT(UserAccount user)
        {
            var authParams = authOptions.Value;
            var securityKey = authParams.GetSymmetricSecurityKey();
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            
            var claims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.UniqueName, user.user_name),
                new Claim(JwtRegisteredClaimNames.Sub, user.id.ToString())
            };


            claims.Add(new Claim("role", user.role.ToString()));
           

            var token = new JwtSecurityToken(authParams.Issuer,
                authParams.Audience,
                claims,
                expires: DateTime.Now.AddSeconds(authParams.TokenLifetime),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
