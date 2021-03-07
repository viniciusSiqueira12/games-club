import IUserRepository from "@domain/interfaces/repositories/IUserRepository";
import User from "@domain/models/User";
import ICreateUserDTO from "application/interfaces/dtos/ICreateUserDTO";
import { getRepository, Repository } from "typeorm";

class UserRepository implements IUserRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async create({Name, Email, Password, Username}: ICreateUserDTO): Promise<User> {

        console.log(Name, Email, Password, Username);
        const newUser = this.ormRepository.create({
            Name,
            Email,
            Password,
            Username,
        });
        await this.ormRepository.save(newUser);
        return newUser;
    }

    public async findById(Id: string) : Promise<User | null> {
        const user = await this.ormRepository.findOne({
            where: { Id }
        });
        return user;
    }

    public async userExist(Email: string, Username: string): Promise<boolean> {
        const exist = await this.ormRepository.findOne({
            where: { Email, Username },
        });
        return exist ? true : false;
    }

    public async findByEmail(Email: string): Promise<User | null> { 
        const user = await this.ormRepository.findOne({
            where: { Email },
        });
        return user;
    }
}

export default UserRepository;