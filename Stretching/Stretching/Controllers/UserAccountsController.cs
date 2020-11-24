using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stretching.Context;
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
        public async Task<ActionResult<IEnumerable<UserAccount>>> Getuser_account()
        {
            return await _context.user_account.ToListAsync();
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
        public async Task<ActionResult<UserAccount>> PostUserAccount(UserAccount userAccount)
        {
            _context.user_account.Add(userAccount);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserAccount", new { id = userAccount.id }, userAccount);
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
