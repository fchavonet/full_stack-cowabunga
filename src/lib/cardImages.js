const modules = import.meta.glob("../assets/images/cards/*.png", { eager: true, as: "url" });

export function getCardImageUrl(id) {
  const filename = id.padStart(3, "0") + ".png";
  const key = "../assets/images/cards/" + filename;

  return modules[key];
}
