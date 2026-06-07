import AsyncStorage from "@react-native-async-storage/async-storage";

const PREFIXO = "@mcc:";

export async function carregar(chave, padrao) {
  try {
    const v = await AsyncStorage.getItem(PREFIXO + chave);
    return v != null ? JSON.parse(v) : padrao;
  } catch (e) {
    return padrao;
  }
}

export async function salvar(chave, valor) {
  try {
    await AsyncStorage.setItem(PREFIXO + chave, JSON.stringify(valor));
  } catch (e) {}
}
