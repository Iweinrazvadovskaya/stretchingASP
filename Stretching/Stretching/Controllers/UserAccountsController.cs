using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        public UserAccountsController(StretchingContext context)
        {
            _context = context;
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

        // PUT: api/UserAccounts/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserAccount(int id, UserAccount userAccount)
        {
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
            _context.user_info.Add(new UserInfo() { user_id = id, height = userAccount.height, weight_ = userAccount.weight_, desired_weight = userAccount.desired_weight });
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
    }
}
