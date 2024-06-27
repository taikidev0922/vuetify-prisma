import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type Department = Prisma.DepartmentGetPayload<{
  include: { users: true };
}>;

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const url = event.node.req.url;

  if (method === "GET" && url === "/api/departments") {
    const departments = await prisma.department.findMany({
      include: { users: true },
    });
    return departments;
  }

  if (method === "POST" && url === "/api/departments") {
    const body = await readBody(event);
    const department = await prisma.department.create({
      data: {
        name: body.name,
      },
      include: { users: true },
    });
    return department;
  }

  // 他のCRUD操作も同様に実装します
});
