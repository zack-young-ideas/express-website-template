/*
Defines utility functions used to perform CSRF validation on incoming
POST requests.
*/

import crypto from 'node:crypto';

let ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
ALPHABET += '0123456789';

const getRandomString = (string_length = 32) => {
  /*
  Generates a random string of characters.
  */
  let output = '';
  let index = 0;
  while (index < string_length) {
    output += ALPHABET[crypto.randomInt(ALPHABET.length)];
    index++;
  }
  return output;
}

const maskCipherToken = (secret) => {
  /*
  Given a secret, generates a token using a mask.
  */

  const mask = getRandomString();
  const pairs = [];

  for (let index = 0; index < secret.length; index++) {
    const secretItem = secret[index];
    const maskItem = mask[index];
    if ((secretItem !== undefined) && (maskItem !== undefined)) {
      const secretIndex = ALPHABET.indexOf(secretItem);
      const maskIndex = ALPHABET.indexOf(maskItem);
      pairs.push([secretIndex, maskIndex]);
    }
  }

  const sums = [];
  for (let index = 0; index < pairs.length; index++) {
    const pair = pairs[index];
    if (pair !== undefined) {
      const firstItem = pair[0];
      const secondItem = pair[1];
      if ((firstItem !== undefined) && (secondItem !== undefined)) {
        sums.push(ALPHABET[(firstItem + secondItem) % ALPHABET.length]);
      }
    }
  }
  const cipher = sums.join('');
  return mask + cipher;
}

const unmaskCipherToken = (inputToken) => {
  const mask = inputToken.slice(0, 32);
  const token = inputToken.slice(32);

  const pairs = [];
  for (let index = 0; index < token.length; index++) {
    const maskItem = mask[index];
    const tokenItem = token[index];
    pairs.push(
      [ALPHABET.indexOf(tokenItem), ALPHABET.indexOf(maskItem)]
    );
  }

  const secretArray = [];
  pairs.forEach((item) => {
    const firstItem = item[0];
    const secondItem = item[1];
    let difference = firstItem - secondItem;
    if (difference < 0) {
      difference = ALPHABET.length + difference;
    }
    const letter = ALPHABET[difference];
    secretArray.push(letter);
  });

  return secretArray.join('');
}

export { getRandomString, maskCipherToken };
