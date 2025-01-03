const { pgTable, serial, varchar } = require("drizzle-orm/pg-core");

export const userInfo = pgTable('userInfo', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    email: varchar('email').notNull(),
    username: varchar('username'),
    // bio: text('bio'),
    bio: varchar('bio'),
    location: varchar('location'),
    link: varchar('link'),
});
