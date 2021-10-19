import Prisma from '../prisma';

export class CreateMessageService {
    async execute(text: string, user_id: string) {
        const message = await Prisma.message.create({
            data: {
                text,
                user_id
            },
            include: {
                user: true
            }
        });

        return message;
    }
}