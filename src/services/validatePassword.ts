import bcrypt from "bcrypt";

export function validatePassword(
  givenPassword: string,
  originalPassword: string
) {
  const comparePass = bcrypt.compareSync(givenPassword, originalPassword);
  if (!comparePass) {
    throw { code: "Unauthorized", message: "Senha inválida" };
  }
}
