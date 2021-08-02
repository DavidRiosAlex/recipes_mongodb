import jwt from 'jsonwebtoken';
import { SECRET_USER_JWT } from '../config/config';
import { User } from '../entity';

interface tokenInterface {
    data: User,
    type: 'access',
    entity: 'user',
    exp: number,
    iat: number
}

const verifiedToken = (token: string) => {
    const verified = jwt.verify(token, SECRET_USER_JWT) as tokenInterface;
    if(!verified.data.email) return new Error('error verifing');
    if (verified.type !== 'access' && verified.entity !== 'user') return new Error('not authorized');
    return verified
};

export default verifiedToken;