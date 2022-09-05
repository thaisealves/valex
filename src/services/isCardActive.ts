export function isActive(password: string | null) {
    if (!password) {
      throw { code: "Conflict", message: "Cartão ainda não ativado" };
    }
  }