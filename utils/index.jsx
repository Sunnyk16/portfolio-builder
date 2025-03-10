import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import {userInfo} from './schema';

const sql = neon(process.env.NEXT_PUBLIC_DB_URL);
export const db = drizzle({ client: sql },{userInfo});