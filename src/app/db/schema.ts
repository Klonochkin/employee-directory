import 'dotenv/config';
import { InferSelectModel } from 'drizzle-orm';
import { date, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const employee = pgTable('employee', {
    id: serial('id').primaryKey(),
    last_name: text('last_name').notNull(),
    first_name: text('first_name').notNull(),
    father_name: text('father_name').notNull(),
    bday: date('bday').notNull(),
    position: text('position').notNull(),
    phone_number: text('phone_number').notNull(),
});

export type Employees = InferSelectModel<typeof employee>;
