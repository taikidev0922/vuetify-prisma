import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type User = Prisma.UserGetPayload<{
  include: { department: true };
}>;

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const url = event.node.req.url;

  if (method === "GET" && url === "/api/users") {
    const users = await prisma.user.findMany({
      include: { department: true },
    });
    return users;
  }

  if (method === "POST" && url === "/api/users") {
    const body = await readBody(event);
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        departmentId: body.departmentId,
      },
      include: { department: true },
    });
    return user;
  }

  // 他のCRUD操作も同様に実装します
});
