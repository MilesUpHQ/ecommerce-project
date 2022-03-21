import { getJWT } from "./jwt";

export const AuthHeader = () => {
  return {
    headers: {
      Authorization: `Bearer ${getJWT()}`,
    },
  };
};
