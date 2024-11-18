import { z } from 'zod';

const today = new Date();
const minDate = new Date(today);
const minAge = 0;
const maxAge = 100;
minDate.setFullYear(today.getFullYear() - minAge);
const maxDate = new Date(today);
maxDate.setFullYear(today.getFullYear() - maxAge);

const PersonalInfoSchema = z.object({
    last_name: z
        .string()
        .trim()
        .min(1, {
            message: 'Фамилия обязательна для заполнения',
        })
        .max(50, { message: 'Максимальный длинна - 50 символов' }),
    first_name: z
        .string()
        .trim()
        .min(1, {
            message: 'Имя обязательно для заполнения',
        })
        .max(50, { message: 'Максимальный длинна - 50 символов' })
        .optional(),
    father_name: z
        .string()
        .trim()
        .min(1, {
            message: 'Отчество обязательно для заполнения',
        })
        .max(50, { message: 'Максимальный длинна - 50 символов' }),
    bday: z.string().trim().min(1, {
        message: 'День рождения обязателен для заполнения',
    }),
    position: z.string().trim().min(1, {
        message: 'Должность обязательна для заполнения',
    }),
    phone_number: z
        .string()
        .min(1, {
            message: 'Номер телефона обязателен для заполнения',
        })
        .regex(/^\+7\d{10}$/, {
            message: 'Некорректный номер телефона',
        }),
    id: z.string(),
});

export const Schemas = PersonalInfoSchema;
