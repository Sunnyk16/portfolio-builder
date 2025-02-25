import { pgTable, serial, varchar, integer, boolean, text } from "drizzle-orm/pg-core";

// User Information Table
export const userInfo = pgTable("userInfo", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    username: varchar("username", { length: 255 }),
    bio: text("bio"), 
    location: varchar("location", { length: 255 }),
    link: varchar("link", { length: 255 }),
    profileImage: varchar("profileImage", { length: 255 }),
});

// Project Table
export const project = pgTable("project", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }),
    description: text("description"), 
    url: varchar("url", { length: 500 }).notNull(),
    logo: varchar("logo", { length: 255 }),
    banner: varchar("banner", { length: 255 }),
    category: varchar("category", { length: 255 }),
    active: boolean("active").default(true).notNull(), 
    emailRef: varchar("emailRef", { length: 255 }),
    userRef: integer("userRef").references(() => userInfo.id),
    showGraph: boolean("showGraph").default(true), 
    order: integer("order").default(0), 
});
