import { UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserEntity } from "src/entities/user.entity";
import { Repository } from "typeorm";


export class JwtCustomStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(UserEntity) private repository: Repository<UserEntity>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'https://www.lookaccount.com'
        });
    }

    async validate(payload: {email: string}) {
        const member = await this.repository.findOne({where: {email: payload.email}});
        if (!member) {
            throw new UnauthorizedException('Do not have this email in the system');
        }
        return member;
    }
}