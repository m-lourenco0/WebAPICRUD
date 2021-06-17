using Microsoft.EntityFrameworkCore;

namespace WebAPICRUD.Models
{
    public class UserContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server = (localdb)\\ProjectsV13; Database = UserDB; Trusted_Connection = true;");
        }
    }
}
