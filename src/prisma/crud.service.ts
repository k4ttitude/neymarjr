import { PrismaClient } from '@prisma/client';

type InvalidKey = `$${string}`;
type ValidKey<Keys> = Keys extends InvalidKey ? never : Keys;
type Key<T> = ValidKey<keyof T>;

export class CrudService<Entity, CreateDto, UpdateDto> {
  name: Key<PrismaClient>;

  constructor(name: Key<PrismaClient>, readonly prisma: PrismaClient) {
    this.name = name;
  }

  create(createDto: CreateDto): Promise<Entity> {
    const create = this.prisma[this.name].create;
    return create.call(this, { data: createDto });
  }

  findAll(): Promise<Entity[]> {
    return this.prisma[this.name].findMany.call(this);
  }

  findOne(id: string): Promise<Entity> {
    return this.prisma[this.name].findUnique.call(this, { where: { id } });
  }

  update(id: string, updateDto: UpdateDto): Promise<Entity> {
    return this.prisma[this.name].update.call(this, {
      where: { id },
      data: updateDto,
    });
  }

  remove(id: string): Promise<Entity> {
    return this.prisma[this.name].delete.call(this, { where: { id } });
  }
}
