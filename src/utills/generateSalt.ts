import {randomBytes}  from 'crypto'


export const generateSalt = (length = 64) => {
  return randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}

