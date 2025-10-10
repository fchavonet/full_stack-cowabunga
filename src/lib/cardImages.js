const modules = import.meta.glob("../assets/images/cards/*.webp", { eager: true, as: "url" });

// Get all available card IDs and categorize them.
export function getAllCardIds() {
  const ids = Object.keys(modules).map(function (key) {
    return key.split("/").pop().replace(".webp", "");
  });

  // Initialize result object with all IDs.
  const result = {};
  result.all = ids;

  // Filter regular card.
  result.regular = ids.filter(function (id) {
    return /^[0-9]{3}$/.test(id);
  });

  // Filter special cards.
  result.special = ids.filter(function (id) {
    return /^sp-/.test(id);
  });

  // Filter starter deck cards.
  result.starter = ids.filter(function (id) {
    return /^st\d?-/.test(id);
  });

  // Filter chrome cards.
  result.chrome = ids.filter(function (id) {
    return /^ch-/.test(id) || /^cr-/.test(id);
  });

  // Filter promotional cards.
  result.promotional = ids.filter(function (id) {
    return /^p-/.test(id) || /^pr-/.test(id);
  });

  // Count total cards per category.
  const counts = {};
  counts.all = result.all.length;
  counts.regular = result.regular.length;
  counts.special = result.special.length;
  counts.starter = result.starter.length;
  counts.promotional = result.promotional.length;
  counts.chrome = result.chrome.length;

  return {
    all: result.all,
    regular: result.regular,
    special: result.special,
    starter: result.starter,
    promotional: result.promotional,
    chrome: result.chrome,
    counts: counts,
  };
}

// Return the image URL for a given card ID.
export function getCardImageUrl(id) {
  const key = "../assets/images/cards/" + id + ".webp";

  // Direct match found in imported modules.
  if (modules[key]) {
    return modules[key];
  }

  // Try case-insensitive match if exact key not found.
  const entries = Object.entries(modules);
  let match = null;

  for (let i = 0; i < entries.length; i++) {
    const path = entries[i][0];
    const filename = path.split("/").pop().replace(".webp", "").toLowerCase();
    if (filename === id.toLowerCase()) {
      match = entries[i][1];
      break;
    }
  }

  // Return found image or fallback placeholder.
  if (match) {
    return match;
  }

  return "/assets/images/missing.webp";
}
