import { Injectable } from '@nestjs/common';
import { JWTPayload } from 'type';
import jwt from 'jsonwebtoken';
import { env } from 'env';

@Injectable()
export class JWTService {
  encodeJWT(payload: JWTPayload): string {
    return jwt.sign(payload, env.JWT_SECRET);
  }

  decodedJWT(token: string) {
    if (!token) {
      return { error: 'empty jwt token' };
    }

    try {
      return jwt.verify(token, env.JWT_SECRET);
    } catch (error) {
      console.log(error);
      return { error };
    }
  }
}
