import { AnyType } from '../types';

//------------------------------------------------------------------------------------
export const replace = (
  source: AnyType,
  name: string,
  behavior: (...args: AnyType[]) => AnyType,
) => {
  if (!(name in source)) {
    return;
  }

  const original = source[name];
  const wrapped = behavior(original);
  source[name] = wrapped;

  return original;
};

//------------------------------------------------------------------------------------
export const parseUrl = (
  url: string,
): {
  host?: string;
  path?: string;
  protocol?: string;
  relative?: string;
} => {
  if (typeof url !== 'string') {
    return {};
  }

  const match = url.match(
    /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/,
  );

  if (!match) {
    return {};
  }

  const query = match[6] || '';
  const fragment = match[8] || '';
  return {
    host: match[4],
    path: match[5],
    protocol: match[2],
    relative: match[5] + query + fragment,
  };
};
