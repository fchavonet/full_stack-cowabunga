const base = import.meta.env.BASE_URL;

export function setNextFavicon(icons) {
  if (!icons || icons.length === 0) return;

  // Get previous index from localStorage.
  const storedIndex = localStorage.getItem("faviconIndex");
  let currentIndex = storedIndex ? parseInt(storedIndex, 10) : -1;

  // Compute next index (loop back to 0 at the end).
  const nextIndex = (currentIndex + 1) % icons.length;

  // Build full icon path.
  const nextIcon = icons[nextIndex];
  const fullPath = base + nextIcon.replace(/^\//, "");

  // Save new index.
  localStorage.setItem("faviconIndex", nextIndex.toString());

  // Remove old icons from <head>.
  document
    .querySelectorAll("link[rel='icon'], link[rel='apple-touch-icon']")
    .forEach(el => el.remove());

  // Create favicon link
  const link = document.createElement("link");
  link.rel = "icon";
  link.type = "image/png";
  link.href = fullPath;
  document.head.appendChild(link);

  // Create Apple Touch icon link.
  const apple = document.createElement("link");
  apple.rel = "apple-touch-icon";
  apple.href = fullPath;
  document.head.appendChild(apple);
}
