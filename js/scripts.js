async function loadComponent(id, url) {
  const element = document.getElementById(id);
  if (!element) {
    console.warn(`Element with id '${id}' not found.`);
    return;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }
    const data = await response.text();
    element.innerHTML = data;
  } catch (error) {
    console.error('Error loading component:', error);
  }
}

var open = false;

function toggleMenu() {
  const mobileNav = document.getElementById("mobileNav");
  if (!open) {
    mobileNav.animate(
      [{ top: "0" }],
      {
        duration: 500,
        easing: "ease-in-out",
        fill: "forwards",
      }
    );
    open = true;
  } else {
    mobileNav.animate(
      [{ top: "calc(-100vh + 150px)" }],
      {
        duration: 500,
        easing: "ease-in-out",
        fill: "forwards",
      }
    );
    open = false;
  }
}

window.addEventListener("load", async function () {
  const loadingScreen = document.getElementById("loadingScreen");

  try {
    await Promise.all([
      loadComponent('fullHeader', '/components/fullHeader.html'),
      loadComponent('swoop', '/components/swoop.html')
    ]);
  } catch (error) {
    console.error('Error loading components:', error);
  } finally {
    loadingScreen.style.display = "none";
    const mainContent = document.querySelector(".mainContent");
    mainContent.style.display = "block";
  }
});