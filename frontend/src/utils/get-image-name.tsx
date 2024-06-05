import iconsName from "../constants/iconsName";

export function getIconsName(name: string): string[] {
  name = name.toLowerCase();
  const nameSplit = name.split("-").join("");
  const nameJoin = name.split(" ").join("");
  const nameScore = name.split(" ").join("-");

  return iconsName.filter(
    (n) =>
      n == name ||
      n.includes(name) ||
      n.includes(nameSplit) ||
      n.includes(nameScore) ||
      n.split("-").some((e) => e == name || e == nameJoin)
  );
}
