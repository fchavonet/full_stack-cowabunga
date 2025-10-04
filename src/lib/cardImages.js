const modules = import.meta.glob("../assets/images/cards/*.webp", { eager: true, as: "url" });

export function getCardImageUrl(id) {
  const filename = id.padStart(3, "0") + ".webp";
  const key = "../assets/images/cards/" + filename;

  return modules[key];
}
