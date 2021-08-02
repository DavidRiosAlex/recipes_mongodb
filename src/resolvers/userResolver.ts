import {
    Resolver,
    Query,
    Mutation,
    Arg,
    Field,
    InputType,
    ObjectType
} from 'type-graphql';
import jwt from 'jsonwebtoken';
import { createHmac, randomBytes } from 'crypto';
import { User, Recipe } from '../entity';
import { SECRET_USER_JWT } from '../config/config';
import verifiedToken from '../helpers/auth'; 

const { UserModel, UserGraph } = User;
const { RecipeGraph } = Recipe;
@InputType()
class UserInput {
    @Field()
    name!: string
    @Field()
    lastName!: string
    @Field()
    password!: string
    @Field()
    email!: string
}

@InputType()
@ObjectType()
class UserOutput {
    @Field()
    name!: string
    @Field()
    lastName!: string
    @Field()
    email!: string
    @Field(() => [RecipeGraph])
    recipes: typeof RecipeGraph[];
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


    @Mutation(() => UserGraph)

    async signUp(
        @Arg('data', () => UserInput) data: UserInput
    ){
        const userAlreadyExist = await UserModel.findOne({
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
        const newUser = await UserModel.create(userData);

        return newUser
    }

    @Mutation(() => String)
    async login(
        @Arg('email', () => String) email: string,
        @Arg('password', () => String) password: string,
    ){
        const user = await UserModel.findOne({ email });

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

    @Query(()=>[UserOutput])
    async getUsers(
        @Arg('token', () => String) token: string,
        @Arg('query', () => UserQuery, { nullable: true }) query: UserQuery,
    ){
        verifiedToken(token);
        const users = await UserModel.find().populate('recipes');
console.log(JSON.stringify(users[0], null, 2));
        return users;
    }

    @Mutation(()=>Boolean)
    async deleteUser(
        @Arg('token', () => String) token: string,
        @Arg('_id', () => String) _id: String,
    ){
        verifiedToken(token);
        await UserModel.deleteOne({ _id })
        return true
    }  
}
