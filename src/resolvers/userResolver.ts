import {
    Resolver,
    Query,
    Mutation,
    Arg,
    Field,
    InputType,
    Int
} from 'type-graphql';
import jwt from 'jsonwebtoken';
import { createHmac, randomBytes } from 'crypto';
import { User } from '../entity';
import { SECRET_USER_JWT } from '../config/config';
import verifiedToken from '../helpers/auth'; 

@InputType()
class UserInput {
    @Field()
    name!: string
    @Field()
    password!: string
    @Field()
    email!: string
}

@InputType()
class UserQuery {
    @Field()
    name!: string
    @Field()
    email!: string
};

@Resolver()
export class UserResolver{


    @Mutation(() => User)

    async signUp(
        @Arg('data', () => UserInput) data: UserInput
    ){
        const userAlreadyExist = await User.findOne({
            email: data.email
        });

        if (userAlreadyExist) new Error('user already exist');

        const { password } = data;
        const secret = randomBytes(16).toString('hex');

        data.password = createHmac('sha256', secret).update(password).digest('hex');
        const userData = {
            ...data,
            secret,
        };
        const newUser = await User.create(userData);
        await newUser.save();

        return newUser
    }

    @Mutation(() => String)
    async login(
        @Arg('email', () => String) email: string,
        @Arg('password', () => String) password: string,
    ){
        const user = await User.findOne({ email });

        if (!user) return new Error('user not found');
        const hashedPassword = createHmac('sha256', user.secret ).update(password).digest('hex');
        if (hashedPassword !== user.password) new Error('authentication failed');

        const oneDayInMs = 3600 * 24 * 60;

        const jsonwebtoken = jwt.sign({
            data: user,
            entity: 'user',
            type: 'access',
        }, SECRET_USER_JWT, { expiresIn: oneDayInMs });

        return jsonwebtoken
    }

    @Query(()=>[User])
    users(
        @Arg('token', () => String) token: string,
        @Arg('query', () => UserQuery, { nullable: true }) query: UserQuery,
    ){
        verifiedToken(token);
        return User.find()
    }   
}
