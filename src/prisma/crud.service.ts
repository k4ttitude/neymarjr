import { NotFoundException } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

export type Transaction = Prisma.TransactionClient;

type InvalidKey = `$${string}`;
type ValidKey<Keys> = Keys extends InvalidKey ? never : Keys;
type Key<T> = ValidKey<keyof T>;

export class CrudService<
  Entity extends { id: string },
  CreateDto extends Omit<Entity, 'id'>,
  UpdateDto extends Partial<CreateDto>,
> {
  name: Key<PrismaClient>;

  constructor(name: Key<PrismaClient>, readonly prisma: PrismaClient) {
    this.name = name;
  }

  runInTransaction<T>(
    callback: (p: Transaction) => Promise<T>,
    transaction?: Transaction,
  ) {
    return callback(transaction || this.prisma);
  }

  create(createDto: CreateDto, transaction?: Transaction): Promise<Entity> {
    return this.runInTransaction((prisma) => {
      const create = prisma[this.name].create;
      return create.call(this, { data: createDto }) as Promise<Entity>;
    }, transaction);
  }

  findAll(transaction?: Transaction): Promise<Entity[]> {
    return this.runInTransaction(
      (prisma) => prisma[this.name].findMany.call(this),
      transaction,
    );
  }

  findOne(id: string, transaction?: Transaction): Promise<Entity> {
    return this.runInTransaction(async (prisma) => {
      const record = await prisma[this.name].findUnique.call(this, {
        where: { id },
      });
      if (!record) throw new NotFoundException(`${this.name} not found: ${id}`);

      return record;
    }, transaction);
  }

  update(
    id: string,
    updateDto: UpdateDto,
    transaction?: Transaction,
  ): Promise<Entity> {
    return this.runInTransaction(async (prisma) => {
      const exist = await this.findOne(id, prisma);
      const result = await prisma[this.name].update.call(this, {
        where: { id: exist.id },
        data: updateDto,
      });
      return result;
    }, transaction);
  }

  remove(id: string, transaction?: Transaction): Promise<Entity> {
    return this.runInTransaction(async (prisma) => {
      const exist = await this.findOne(id, prisma);
      return prisma[this.name].delete.call(this, { where: { id: exist.id } });
    }, transaction);
  }
}
