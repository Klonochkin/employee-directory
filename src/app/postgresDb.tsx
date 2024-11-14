import { drizzle } from 'drizzle-orm/node-postgres';
import { employee } from '@/app/db/schema';
import { sql, asc, desc, eq } from 'drizzle-orm';
import { convertDateToISO } from './convert-date';

const db = drizzle(process.env.POSTGRES_URL!);

export async function getEmployees(name = '', page: number, sort?: string) {
    let offset = (page - 1) * 10;
    offset = offset >= 0 ? offset : 0;
    name = name.toLowerCase();
    const res = await db
        .select()
        .from(employee)
        .where(
            sql`lower(${employee.first_name}) LIKE ${`%${name}%`} OR lower(${employee.last_name}) LIKE ${`%${name}%`} OR lower(${employee.father_name}) LIKE ${`%${name}%`}`,
        )
        .limit(30)
        .offset(offset)
        .orderBy(
            sort
                ? sort === 'asc'
                    ? asc(employee.bday)
                    : sort === 'desc'
                      ? desc(employee.bday)
                      : asc(employee.id)
                : asc(employee.id),
        );
    return res;
}

export async function getTotalCount(name = '') {
    name = name.toLowerCase();
    const res = await db
        .select({ count: sql`COUNT(*)` })
        .from(employee)
        .where(
            sql`lower(${employee.first_name}) LIKE ${`%${name}%`} OR lower(${employee.last_name}) LIKE ${`%${name}%`} OR lower(${employee.father_name}) LIKE ${`%${name}%`}`,
        );
    return Number(res[0]?.count) || 0;
}

export async function deleteData(id: number) {
    const res = await db.delete(employee).where(eq(employee.id, Number(id)));
    return res;
}

interface UpdateEmployeeData {
    last_name: string;
    first_name: string;
    father_name: string;
    position: string;
    phone_number: string;
}

export async function updateData(
    bday: string,
    id: number,
    other: UpdateEmployeeData,
) {
    const bday_Date = convertDateToISO(bday);
    const res = await db
        .update(employee)
        .set({
            bday: bday_Date,
            ...other,
        })
        .where(eq(employee.id, id));
    return res;
}

export async function insertEmployees() {
    const first_names = [
        'Александр',
        'Дмитрий',
        'Максим',
        'Артем',
        'Иван',
        'Сергей',
        'Е гор',
        'Никита',
        'Михаил',
        'Алексей',
        'Роман',
        'Даниил',
        'Владимир',
        'Илья',
        'Тимур',
        'Виктор',
        'Павел',
        'Антон',
        'Станислав',
        'Григорий',
        'Анатолий',
        'Юрий',
        'Константин',
        'Василий',
        'Станислав',
        'Денис',
        'Евгений',
        'Александр',
        'Роман',
        'Виктор',
        'Сергей',
        'Игорь',
        'Андрей',
        'Николай',
        'Федор',
        'Семен',
        'Геннадий',
        'Арсений',
        'Валентин',
        'Леонид',
        'Ярослав',
        'Тихон',
        'Валерий',
        'Станислав',
        'Дмитрий',
        'Анатолий',
        'Виктор',
        'Алексей',
        'Марк',
        'Станислав',
        'Денис',
        'Илья',
    ];
    const last_names = [
        'Иванов',
        'Петров',
        'Сидоров',
        'Кузнецов',
        'Смирнов',
        'Попов',
        'Лебедев',
        'Ковалев',
        'Новиков',
        'Морозов',
        'Васильев',
        'Зайцев',
        'Павлов',
        'Соловьев',
        'Григорьев',
        'Борисов',
        'Тимофеев',
        'Федоров',
        'Михайлов',
        'Сергеев',
        'Алексеев',
        'Степанов',
        'Куликов',
        'Кириллов',
        'Орлов',
        'Савельев',
        'Фролов',
        'Егоров',
        'Громов',
        'Тихонов',
        'Белов',
        'Сидоренко',
        'Сергеев',
        'Баранов',
        'Киселев',
        'Дмитриев',
        'Денисов',
        'Ковалев',
        'Ларионов',
        'Шевченко',
        'Семенов',
        'Гусев',
        'Светлов',
        'Костенко',
        'Коваленко',
        'Мельников',
        'Романов',
        'Лапин',
    ];
    const father_names = [
        'Алексеевич',
        'Иванович',
        'Петрович',
        'Сидорович',
        'Кузнецович',
        'Смирнович',
        'Дмитриевич',
        'Васильевич',
        'Григорьевич',
        'Федорович',
        'Михайлович',
        'Сергеевич',
        'Анатольевич',
        'Николаевич',
        'Тимофеевич',
        'Орлович',
        'Ковалевич',
        'Лебедевич',
        'Романович',
        'Станиславович',
        'Андреевич',
        'Владимирович',
        'Геннадиевич',
        'Арсеньевич',
        'Денисович',
        'Семенович',
        'Ярославович',
        'Викторович',
        'Леонидович',
        'Егорович',
        'Станиславович',
        'Тихонович',
        'Анатольевич',
        'Валентинович',
        'Кириллович',
        'Игоревич',
        'Викторович',
        'Филиппович',
        'Павлович',
        'Александрович',
        'Михайлович',
        'Станиславович',
        'Петрович',
        'Васильевич',
        'Григорьевич',
        'Федорович',
        'Семенович',
        'Алексеевич',
        'Дмитриевич',
    ];
    const positions = [
        'Директор',
        'Заместитель директора',
        'Менеджер',
        'Специалист',
        'Инженер',
        'Аналитик',
        'Маркетолог',
        'Бухгалтер',
        'Юрист',
        'Программист',
        'Технический директор',
        'Руководитель проекта',
        'Офис-менеджер',
        'HR-менеджер',
        'Кассир',
        'Продавец',
        'Секретарь',
        'Водитель',
        'Архитектор',
        'Дизайнер',
        'Ведущий специалист',
        'Лаборант',
        'Экономист',
        'Менеджер по продажам',
        'Специалист по закупкам',
        'Специалист по качеству',
        'Педагог',
        'Врач',
        'Медсестра',
        'Служба поддержки',
        'Операционист',
        'Координатор',
        'Редактор',
        'Журналист',
        'Контент-менеджер',
        'Проектировщик',
        'Специалист по рекламе',
        'Исследователь',
        'Стажер',
        'Тренер',
        'Копирайтер',
        'Продуктовый менеджер',
        'Директор по развитию',
        'Специалист по PR',
        'Аудитор',
        'Руководитель отдела',
    ];
    const num_last_name = Math.floor(Math.random() * (45 - 0) + 0);
    const num_first_name = Math.floor(Math.random() * (45 - 0) + 0);
    const num_father_name = Math.floor(Math.random() * (45 - 0) + 0);
    const num_bday_day = Math.floor(Math.random() * (28 - 10) + 10);
    const num_bday_month = Math.floor(Math.random() * (12 - 10) + 10);
    const num_position = Math.floor(Math.random() * (45 - 0) + 0);
    const num_phone_number = Math.floor(
        Math.random() * (999999999 - 0o0) + 0o0,
    );
    const last_name = last_names[num_last_name];
    const first_name = first_names[num_first_name];
    const father_name = father_names[num_father_name];
    const bday = `2000-${num_bday_month}-${num_bday_day}`;
    const position = positions[num_position];
    const phone_number = `+79${num_phone_number}`;
    const res = await db.insert(employee).values({
        last_name: last_name,
        first_name: first_name,
        father_name: father_name,
        bday: bday,
        position: position,
        phone_number: phone_number,
    });

    return res;
}
