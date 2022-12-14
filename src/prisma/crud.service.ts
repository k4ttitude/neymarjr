import { PrismaClient } from '@prisma/client';

export class CrudService<Entity, CreateDto, UpdateDto> {
  name: string;

  constructor(name: keyof PrismaClient, readonly prisma: PrismaClient) {
    this.name = name;
  }

  create(createDto: CreateDto): Promise<Entity> {
    return this.prisma[this.name].create({ data: createDto });
  }

  findAll(): Promise<Entity[]> {
    return this.prisma[this.name].findMany();
  }

  findOne(id: string): Promise<Entity> {
    return this.prisma[this.name].findUnique({ where: { id } });
  }

  update(id: string, updateDto: UpdateDto): Promise<Entity> {
    return this.prisma[this.name].update({ where: { id }, data: updateDto });
  }

  remove(id: string): Promise<Entity> {
    return this.prisma[this.name].delete({ where: { id } });
  }
}
