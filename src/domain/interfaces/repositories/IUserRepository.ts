import User from "@domain/models/User";
import ICreateUserDTO from "application/interfaces/dtos/ICreateUserDTO"; 

export default interface IUserRepository {
    create(user: ICreateUserDTO): Promise<User>;
    findById(id: string): Promise<User | null>;
    userExist(Email: string, Username: string): Promise<boolean>;
    findByEmail(Email: string): Promise<User | null>;
}