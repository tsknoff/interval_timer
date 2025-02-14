import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <App />,
  // </StrictMode>,
);

// const j = [
//   {
//     date: "13.02.2025, 16:35:08",
//     technique: "Legato",
//     pattern: "2-4-1-3",
//     bpm: 100,
//     rating: 27,
//     comment: "too much noise",
//   },
//   {
//     date: "13.02.2025, 16:41:33",
//     technique: "Legato",
//     pattern: "1-2-4",
//     bpm: 100,
//     rating: 68,
//     comment: "good",
//   },
//   {
//     date: "13.02.2025, 16:48:34",
//     technique: "Legato",
//     pattern: "Treli #1",
//     bpm: 100,
//     rating: 77,
//     comment: "almost clean upper strings are make too much noise",
//   },
//   {
//     date: "13.02.2025, 16:57:54",
//     technique: "Legato",
//     pattern: "Treli #2",
//     bpm: 100,
//     rating: 68,
//     comment:
//       "в райне кистевых связок рука как будто забилаcь, дико устала. Спускаться практически очень легко, подниматься в несколько раз тяжелее",
//   },
// ];
