import { themeClass, exampleStyle } from "./styles.css";

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("main").forEach((main) => {
    main.classList.add(themeClass);
    main.querySelectorAll("h1").forEach((h1) => {
      h1.classList.add(exampleStyle);
    });
  });
});
