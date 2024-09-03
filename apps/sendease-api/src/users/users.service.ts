import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';
import { CreateUserDto } from '@kooman/sendease-types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto, currentUser: User): Promise<User> {
    // Kontrollera om den aktuella användaren har behörighet att skapa en ny användare
    if (
      currentUser.role !== UserRole.SYSTEM_ADMIN &&
      (currentUser.role !== UserRole.COMPANY_ADMIN ||
        currentUser.company.id !== createUserDto.companyId)
    ) {
      throw new ForbiddenException(
        'You do not have permission to create a user for this company'
      );
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.usersRepository.save(newUser);
  }

  async findAll(currentUser: User): Promise<User[]> {
    if (currentUser.role === UserRole.SYSTEM_ADMIN) {
      return this.usersRepository.find({ relations: ['company'] });
    } else if (currentUser.role === UserRole.COMPANY_ADMIN) {
      return this.usersRepository.find({
        where: { company: { id: currentUser.company.id } },
        relations: ['company'],
      });
    } else {
      throw new ForbiddenException(
        'You do not have permission to view all users'
      );
    }
  }

  async findOne(id: string, options?: { role?: UserRole }): Promise<User> {
    const query = this.usersRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id });

    if (options?.role) {
      query.andWhere('user.role = :role', { role: options.role });
    }

    const user = await query.getOne();

    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return user;
  }

  async update(
    id: string,
    updateUserDto: Partial<CreateUserDto>,
    currentUser: User
  ): Promise<User> {
    const user = await this.findOne(id, currentUser);

    if (
      currentUser.role !== UserRole.SYSTEM_ADMIN &&
      (currentUser.role !== UserRole.COMPANY_ADMIN ||
        currentUser.company.id !== user.company.id)
    ) {
      throw new ForbiddenException(
        'You do not have permission to update this user'
      );
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async remove(id: string, currentUser: User): Promise<void> {
    const user = await this.findOne(id, currentUser);

    if (
      currentUser.role !== UserRole.SYSTEM_ADMIN &&
      (currentUser.role !== UserRole.COMPANY_ADMIN ||
        currentUser.company.id !== user.company.id)
    ) {
      throw new ForbiddenException(
        'You do not have permission to delete this user'
      );
    }

    await this.usersRepository.remove(user);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { username },
      relations: ['company'],
    });
  }
}
