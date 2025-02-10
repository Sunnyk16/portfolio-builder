// import { boolean, text } from "drizzle-orm/mysql-core";

// const { pgTable, serial, varchar, integer } = require("drizzle-orm/pg-core");

// export const userInfo = pgTable('userInfo', {
//     id: serial('id').primaryKey(),
//     name: varchar('name').notNull(),
//     email: varchar('email').notNull(),
//     username: varchar('username'),
//     // bio: text('bio'),
//     bio: varchar('bio'),
//     location: varchar('location'),
//     link: varchar('link'),
//     profileImage: varchar('profileImage'),
// })



// export const project=pgTable('project',{
//     id:serial('id').primaryKey(),
//     name:varchar('name'),
//     desc:varchar('desc'),
//     url:varchar('url').notNull(),
//     logo:varchar('logo'),
//     banner:varchar('banner'),
//     category:varchar('category'),
//     active:boolean('active').default(true),
//     emailRef:varchar('emailRef'),
//     userRef:integer('userRef').references(()=>userInfo?.id),
// })
import { pgTable, serial, varchar, integer, boolean, text } from "drizzle-orm/pg-core";

// User Information Table
export const userInfo = pgTable("userInfo", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    username: varchar("username", { length: 255 }),
    bio: text("bio"), // Changed from varchar to text
    location: varchar("location", { length: 255 }),
    link: varchar("link", { length: 255 }),
    profileImage: varchar("profileImage", { length: 255 }),
});

// Project Table
export const project = pgTable("project", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }),
    description: text("description"), // Renamed from `desc`
    url: varchar("url", { length: 500 }).notNull(),
    logo: varchar("logo", { length: 255 }),
    banner: varchar("banner", { length: 255 }),
    category: varchar("category", { length: 255 }),
    active: boolean("active").default(true).notNull(), // Fixed boolean issue
    emailRef: varchar("emailRef", { length: 255 }),
    userRef: integer("userRef").references(() => userInfo.id), // Fixed reference
});
