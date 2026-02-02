const PREFIXES = [
  "Ad", "Jo", "Mar", "Lu", "Al", "An", "Ro", "Se", "Va",
  "Ed", "Is", "Ra", "No", "Te", "Cl", "De", "Ar", "Pe", "Ca"
];

const ROOTS = [
  "an", "el", "son", "ber", "dan", "nal", "res", "tor",
  "mar", "que", "lino", "fred", "mon", "cio", "vin", "ric"
];

const SUFFIXES_MALE = [
  "o", "el", "ir", "ino", "ano", "es", "iel", "eus", "ar", "us"
];

const SUFFIXES_FEMALE = [
  "a", "ana", "ela", "ia", "ine", "isa", "ara", "ete", "ane"
];

type Gender = "male" | "female" | "any";

const randomItem = <T,>(arr: T[]) =>
  arr[Math.floor(Math.random() * arr.length)];

const capitalize = (name: string) =>
  name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

const normalizeName = (name: string) =>
  name
    .replace(/([aeiou])\1+/g, "$1") // evita vogais duplicadas
    .replace(/[^a-zA-Z]/g, "");

export const generateBrazilianNames = (
  amount: number,
  blacklist: Set<string> = new Set(),
  gender: Gender = "any"
): string[] => {
  const generated = new Set<string>();
  let attempts = 0;
  const MAX_ATTEMPTS = amount * 20;

  while (generated.size < amount && attempts < MAX_ATTEMPTS) {
    attempts++;

    const suffixes =
      gender === "male"
        ? SUFFIXES_MALE
        : gender === "female"
        ? SUFFIXES_FEMALE
        : [...SUFFIXES_MALE, ...SUFFIXES_FEMALE];

    const hasDoubleRoot = Math.random() < 0.35;

    let name =
      randomItem(PREFIXES) +
      randomItem(ROOTS) +
      (hasDoubleRoot ? randomItem(ROOTS) : "") +
      randomItem(suffixes);

    name = normalizeName(name);
    const finalName = capitalize(name);

    if (!blacklist.has(finalName)) {
      generated.add(finalName);
    }
  }

  return Array.from(generated);
};
