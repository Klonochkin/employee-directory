// import { drizzle } from 'drizzle-orm/node-postgres';
// import { employee } from '@/app/db/schema';
// import { createEmployeesTable } from '@/app/postgresDb';

// const db = drizzle(process.env.POSTGRES_URL);

export async function GET() {
    // const insertValues = await insertValueFromDatabase();

    // return new Response(JSON.stringify({ totalCount: insertValues }), {
    //     status: 200,
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // });
    return new Response(JSON.stringify('БД уже создана'), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

// const generateEmployee = () => {
//     const first_names = [
//         'Александр',
//         'Дмитрий',
//         'Максим',
//         'Артем',
//         'Иван',
//         'Сергей',
//         'Егор',
//         'Никита',
//         'Михаил',
//         'Алексей',
//         'Роман',
//         'Даниил',
//         'Владимир',
//         'Илья',
//         'Тимур',
//         'Виктор',
//         'Павел',
//         'Антон',
//         'Станислав',
//         'Григорий',
//         'Анатолий',
//         'Юрий',
//         'Константин',
//         'Василий',
//         'Станислав',
//         'Денис',
//         'Евгений',
//         'Александр',
//         'Роман',
//         'Виктор',
//         'Сергей',
//         'Игорь',
//         'Андрей',
//         'Николай',
//         'Федор',
//         'Семен',
//         'Геннадий',
//         'Арсений',
//         'Валентин',
//         'Леонид',
//         'Ярослав',
//         'Тихон',
//         'Валерий',
//         'Станислав',
//         'Дмитрий',
//         'Анатолий',
//         'Виктор',
//         'Алексей',
//         'Марк',
//         'Станислав',
//         'Денис',
//         'Илья',
//     ];
//     const last_names = [
//         'Иванов',
//         'Петров',
//         'Сидоров',
//         'Кузнецов',
//         'Смирнов',
//         'Попов',
//         'Лебедев',
//         'Ковалев',
//         'Новиков',
//         'Морозов',
//         'Васильев',
//         'Зайцев',
//         'Павлов',
//         'Соловьев',
//         'Григорьев',
//         'Борисов',
//         'Тимофеев',
//         'Федоров',
//         'Михайлов',
//         'Сергеев',
//         'Алексеев',
//         'Степанов',
//         'Куликов',
//         'Кириллов',
//         'Орлов',
//         'Савельев',
//         'Фролов',
//         'Егоров',
//         'Громов',
//         'Тихонов',
//         'Белов',
//         'Сидоренко',
//         'Сергеев',
//         'Баранов',
//         'Киселев',
//         'Дмитриев',
//         'Денисов',
//         'Ковалев',
//         'Ларионов',
//         'Шевченко',
//         'Семенов',
//         'Гусев',
//         'Светлов',
//         'Костенко',
//         'Коваленко',
//         'Мельников',
//         'Романов',
//         'Лапин',
//     ];
//     const father_names = [
//         'Алексеевич',
//         'Иванович',
//         'Петрович',
//         'Сидорович',
//         'Кузнецович',
//         'Смирнович',
//         'Дмитриевич',
//         'Васильевич',
//         'Григорьевич',
//         'Федорович',
//         'Михайлович',
//         'Сергеевич',
//         'Анатольевич',
//         'Николаевич',
//         'Тимофеевич',
//         'Орлович',
//         'Ковалевич',
//         'Лебедевич',
//         'Романович',
//         'Станиславович',
//         'Андреевич',
//         'Владимирович',
//         'Геннадиевич',
//         'Арсеньевич',
//         'Денисович',
//         'Семенович',
//         'Ярославович',
//         'Викторович',
//         'Леонидович',
//         'Егорович',
//         'Станиславович',
//         'Тихонович',
//         'Анатольевич',
//         'Валентинович',
//         'Кириллович',
//         'Игоревич',
//         'Викторович',
//         'Филиппович',
//         'Павлович',
//         'Александрович',
//         'Михайлович',
//         'Станиславович',
//         'Петрович',
//         'Васильевич',
//         'Григорьевич',
//         'Федорович',
//         'Семенович',
//         'Алексеевич',
//         'Дмитриевич',
//     ];
//     const positions = [
//         'Директор',
//         'Заместитель директора',
//         'Менеджер',
//         'Специалист',
//         'Инженер',
//         'Аналитик',
//         'Маркетолог',
//         'Бухгалтер',
//         'Юрист',
//         'Программист',
//         'Технический директор',
//         'Руководитель проекта',
//         'Офис-менеджер',
//         'HR-менеджер',
//         'Кассир',
//         'Продавец',
//         'Секретарь',
//         'Водитель',
//         'Архитектор',
//         'Дизайнер',
//         'Ведущий специалист',
//         'Лаборант',
//         'Экономист',
//         'Менеджер по продажам',
//         'Специалист по закупкам',
//         'Специалист по качеству',
//         'Педагог',
//         'Врач',
//         'Медсестра',
//         'Служба поддержки',
//         'Операционист',
//         'Координатор',
//         'Редактор',
//         'Журналист',
//         'Контент-менеджер',
//         'Проектировщик',
//         'Специалист по рекламе',
//         'Исследователь',
//         'Стажер',
//         'Тренер',
//         'Копирайтер',
//         'Продуктовый менеджер',
//         'Директор по развитию',
//         'Специалист по PR',
//         'Аудитор',
//         'Руководитель отдела',
//     ];
//     const num_bday_day = Math.floor(Math.random() * (28 - 10) + 10);
//     const num_bday_month = Math.floor(Math.random() * (12 - 10) + 10);
//     return {
//         last_name: last_names[Math.floor(Math.random() * last_names.length)],
//         first_name: first_names[Math.floor(Math.random() * first_names.length)],
//         father_name:
//             father_names[Math.floor(Math.random() * father_names.length)],
//         bday: `2000-${num_bday_month}-${num_bday_day}`,
//         position: positions[Math.floor(Math.random() * positions.length)],
//         phone_number: `+79${Math.floor(Math.random() * 1000000000)}`,
//     };
// };

// async function insertValueFromDatabase() {
//     await createEmployeesTable();
//     const employees = Array.from({ length: 15 }, generateEmployee);
//     const res = await db.insert(employee).values(employees);

//     return res;
// }
