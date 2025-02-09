import { text } from "drizzle-orm/mysql-core";

const { pgTable, serial, varchar, integer } = require("drizzle-orm/pg-core");

export const userInfo = pgTable('userInfo', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    email: varchar('email').notNull(),
    username: varchar('username'),
    // bio: text('bio'),
    bio: varchar('bio'),
    location: varchar('location'),
    link: varchar('link'),
    profileImage: varchar('profileImage'),
})



export const project=pgTable('project',{
    id:serial('id').primaryKey(),
    name:varchar('name'),
    desc:varchar('desc'),
    url:varchar('url').notNull(),
    logo:varchar('logo'),
    banner:varchar('banner'),
    category:varchar('category'),
    emailRef:varchar('emailRef'),
    userRef:integer('userRef').references(()=>userInfo?.id),
})
