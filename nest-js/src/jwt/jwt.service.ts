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
    return jwt.verify(token, env.JWT_SECRET);
  }
}
