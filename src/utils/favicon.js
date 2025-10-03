/**************************
* RANDOM FAVICON BEHAVIOR *
**************************/

const base = import.meta.env.BASE_URL;

export function setRandomFavicon(icons) {
  if (!icons || icons.length === 0) {
    return;
  }

  const randomIcon = icons[Math.floor(Math.random() * icons.length)];

  const oldFavicon = document.querySelector("link[rel='icon']");

  if (oldFavicon) {
    oldFavicon.remove();
  }

  const link = document.createElement("link");
  link.rel = "icon";
  link.type = "image/png";
  link.href = base + randomIcon.replace(/^\//, "");

  document.head.appendChild(link);
}
