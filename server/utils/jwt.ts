import jwt from 'jsonwebtoken';
import { TOKEN_EXPIRED_IN } from './constants';

// TODO: tokenType & loginType -> enum definition
// TODO: control expired date
export const dispatchToken = (username: string, tokenType?: string) =>
  jwt.sign(
    {
      username,
      tokenType,
    },
    process.env.SECRET_KEY ?? 'dev_secret_key',
    {
      expiresIn: TOKEN_EXPIRED_IN,
    }
  );

export const weekLaterTimeStamp = () =>
  Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60;

interface ITokenValidation {
  valid: boolean;
  info?: {
    username: string;
    // 签发时间
    iat: number;
    // 到期时间
    exp: number;
  };
}

export const validateToken = (token: string): ITokenValidation => {
  try {
    const info = jwt.verify(
      token,
      process.env.SECRET_KEY ?? 'dev_secret_key'
    ) as ITokenValidation['info'];
    return {
      valid: true,
      info,
    };
  } catch (error) {
    return {
      valid: false,
    };
  }
};
