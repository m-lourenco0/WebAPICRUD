using Microsoft.EntityFrameworkCore;

namespace WebAPICRUD.Models
{
    public class UserContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        //public UserContext(DbContextOptions<UserContext> options) : base(options)
        //{
        //}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server = (localdb)\\ProjectsV13; Database = UserDB; Trusted_Connection = true;");
        }
    }
}
