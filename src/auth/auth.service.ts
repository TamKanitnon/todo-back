import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from 'src/dto/register.user.dto';
import { UserLoginDto } from 'src/dto/user.login.dto';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserEntity) private repository: Repository<UserEntity>,
        private jwt: JwtService
    ) {}
    
    async registerUser(user: RegisterUserDto) {
        const checkMember = await this.repository.findOne({where: {email: user.email}});
        if (checkMember) {
            throw new BadRequestException('this email already taken, please use new email');
        } else {
            if (!(user.password === user.passconf)) throw new BadRequestException('password and password confirm are not the same');
            const member = new UserEntity();
            member.email = user.email;
            member.password = await bcrypt.hash(user.password, 12);
            member.create = new Date();
            try {
                return await this.repository.save(member);
            } catch (err) {
                throw new InternalServerErrorException('something went wrong, cannot creat new user');
            }
        }
    }

    async login(user: UserLoginDto) {
        const member = await this.repository.findOne({where: {email: user.email}});
        if (!member) throw new UnauthorizedException('Do not have this email in the system');
        const passwordCheck = await bcrypt.compare(user.password, member.password)
        if (passwordCheck) {
            const jwtPayload = {email: user.email};
            const jwtToken = await this.jwt.signAsync(jwtPayload, {expiresIn: '1d', algorithm: 'HS512'});
            return {
                email: user.email,
                token: jwtToken
            };
        } else {
            throw new UnauthorizedException('The password is incorrect');
        }
    }
}
