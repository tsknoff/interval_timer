import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <App />,
  // </StrictMode>,
);

// const backup = [
//   {
//     date: "16.02.2025, 11:55:30",
//     technique: "Legato",
//     pattern: "Treli #2",
//     rounds: [[{ name: "Work", duration: 780000 }]],
//     duration: 780000,
//     bpm: 100,
//     rating: 80,
//     comment: "",
//   },
//   {
//     date: "16.02.2025, 10:25:30",
//     technique: "Legato",
//     pattern: "Treli #2",
//     rounds: [
//       [{ name: "Ready ?", duration: 5000 }],
//       [
//         { name: "Steps", duration: 60000 },
//         { name: "Relax", duration: 5000 },
//       ],
//       [
//         { name: "Chords", duration: 120000 },
//         { name: "Relax", duration: 5000 },
//       ],
//       [
//         { name: "LegatoArpeggio", duration: 120000 },
//         { name: "Relax", duration: 5000 },
//       ],
//     ],
//     duration: 320000,
//     bpm: 120,
//     rating: 55,
//     comment:
//       "Спускаться получатся без проблем, поднимаюсь со спотыканиями, ниразу неполучилось полностью прогнать один круг",
//   },
//   {
//     date: "16.02.2025, 10:18:19",
//     technique: "Legato",
//     pattern: "Treli #1",
//     rounds: [
//       [{ name: "Ready ?", duration: 5000 }],
//       [
//         { name: "Steps", duration: 60000 },
//         { name: "Relax", duration: 5000 },
//       ],
//       [
//         { name: "Chords", duration: 120000 },
//         { name: "Relax", duration: 5000 },
//       ],
//       [
//         { name: "LegatoArpegio", duration: 120000 },
//         { name: "Relax", duration: 5000 },
//       ],
//     ],
//     duration: 320000,
//     bpm: 120,
//     rating: 82,
//     comment: "Очень даже чисто 1/16, думаю можно попробовать +10 BPM",
//   },
//   {
//     date: "16.02.2025, 10:11:04",
//     technique: "Legato",
//     pattern: "2-4-5",
//     rounds: [
//       [{ name: "Ready ?", duration: 5000 }],
//       [
//         { name: "Steps", duration: 60000 },
//         { name: "Relax", duration: 5000 },
//       ],
//       [
//         { name: "Chords", duration: 120000 },
//         { name: "Relax", duration: 5000 },
//       ],
//       [
//         { name: "LegatoArpegio", duration: 120000 },
//         { name: "Relax", duration: 5000 },
//       ],
//     ],
//     duration: 320000,
//     bpm: 130,
//     rating: 58,
//   },
//   {
//     date: "16.02.2025, 10:03:23",
//     technique: "Legato",
//     pattern: "7-10-9-11",
//     rounds: [
//       [{ name: "Ready ?", duration: 5000 }],
//       [
//         { name: "Steps", duration: 60000 },
//         { name: "Relax", duration: 5000 },
//       ],
//       [
//         { name: "Chords", duration: 120000 },
//         { name: "Relax", duration: 5000 },
//       ],
//       [
//         { name: "LegatoArpegio", duration: 120000 },
//         { name: "Relax", duration: 5000 },
//       ],
//     ],
//     duration: 320000,
//     bpm: 100,
//     rating: 70,
//   },
//   {
//     date: "16.02.2025, 09:47:55",
//     technique: "Warmup",
//     pattern: "",
//     rounds: [
//       [{ name: "Ready ?", duration: 5000 }],
//       [
//         { name: "Steps", duration: 300000 },
//         { name: "Relax", duration: 5000 },
//       ],
//       [
//         { name: "Chords", duration: 300000 },
//         { name: "Relax", duration: 5000 },
//       ],
//       [
//         { name: "LegatoArpegio", duration: 300000 },
//         { name: "Relax", duration: 5000 },
//       ],
//     ],
//     duration: 920000,
//     bpm: 100,
//     rating: 84,
//     comment: "После разминки побаливает мышца под большим пальцем",
//   },
//   {
//     date: "15.02.2025, 21:04:54",
//     technique: "Steps",
//     pattern: "",
//     rounds: [
//       [{ name: "Ready?", duration: 5000 }],
//       [
//         { name: "Work", duration: 300000 },
//         { name: "Relax", duration: 15000 },
//       ],
//     ],
//     duration: 320000,
//     bpm: 80,
//     rating: 100,
//   },
//   {
//     date: "15.02.2025, 14:38:01",
//     technique: "Legato",
//     pattern: "Treli #2 on 5-6 strings",
//     rounds: [
//       [{ name: "Ready?", duration: 5000 }],
//       [
//         { name: "Work", duration: 60000 },
//         { name: "Relax", duration: 15000 },
//       ],
//       [
//         { name: "Work", duration: 120000 },
//         { name: "Relax", duration: 15000 },
//       ],
//       [
//         { name: "Work", duration: 120000 },
//         { name: "Relax", duration: 15000 },
//       ],
//     ],
//     duration: 350000,
//     bpm: 90,
//     rating: 56,
//     comment: "Шум все равно есть",
//   },
//   {
//     date: "15.02.2025, 14:22:53",
//     technique: "Legato",
//     pattern: "1-4-2-3",
//     rounds: [
//       [{ name: "Ready?", duration: 5000 }],
//       [
//         { name: "Work", duration: 60000 },
//         { name: "Relax", duration: 15000 },
//       ],
//       [
//         { name: "Work", duration: 120000 },
//         { name: "Relax", duration: 15000 },
//       ],
//       [
//         { name: "Work", duration: 120000 },
//         { name: "Relax", duration: 15000 },
//       ],
//     ],
//     duration: 350000,
//     bpm: 110,
//     rating: 78,
//     comment:
//       "1/16 получается хорошо, приходится останавливаться иногда на финальном раунде",
//   },
//   {
//     date: "15.02.2025, 14:14:49",
//     technique: "Legato",
//     pattern: "Treli #1",
//     rounds: [
//       [{ name: "Ready?", duration: 5000 }],
//       [
//         { name: "Work", duration: 60000 },
//         { name: "Relax", duration: 15000 },
//       ],
//       [
//         { name: "Work", duration: 120000 },
//         { name: "Relax", duration: 15000 },
//       ],
//       [
//         { name: "Work", duration: 120000 },
//         { name: "Relax", duration: 15000 },
//       ],
//     ],
//     duration: 350000,
//     bpm: 110,
//     rating: 83,
//     comment: "Думаю можно сделать +20 BPM, верхние струны тоже звучали чисто",
//   },
//   {
//     date: "15.02.2025, 14:07:29",
//     technique: "Legato",
//     pattern: "Treli #2",
//     rounds: [
//       [{ name: "Ready?", duration: 5000 }],
//       [
//         { name: "Work", duration: 60000 },
//         { name: "Relax", duration: 15000 },
//       ],
//       [
//         { name: "Work", duration: 120000 },
//         { name: "Relax", duration: 15000 },
//       ],
//       [
//         { name: "Work", duration: 120000 },
//         { name: "Relax", duration: 15000 },
//       ],
//     ],
//     duration: 350000,
//     bpm: 100,
//     rating: 69,
//     comment: "Treli #2: Очень устает рука под конец, шум на верхних струнах",
//   },
//   {
//     date: "15.02.2025, 12:04:36",
//     technique: "Legato",
//     pattern: "Treli #2",
//     rounds: [
//       [{ name: "Ready?", duration: 5000 }],
//       [
//         { name: "Work", duration: 60000 },
//         { name: "Relax", duration: 15000 },
//       ],
//       [
//         { name: "Work", duration: 120000 },
//         { name: "Relax", duration: 15000 },
//       ],
//       [
//         { name: "Work", duration: 120000 },
//         { name: "Relax", duration: 15000 },
//       ],
//     ],
//     duration: 350000,
//     bpm: 111,
//     rating: 59,
//     comment:
//       "Под конец рука очень устает. 120 темп не вывез убрал до 110. На толстых струнах по прежнему грязно",
//   },
//   {
//     date: "15.02.2025, 11:57:20",
//     technique: "Legato",
//     pattern: "Treli #1",
//     rounds: [
//       [{ name: "Ready?", duration: 5000 }],
//       [
//         { name: "Work", duration: 60000 },
//         { name: "Relax", duration: 15000 },
//       ],
//       [
//         { name: "Work", duration: 120000 },
//         { name: "Relax", duration: 15000 },
//       ],
//       [
//         { name: "Work", duration: 120000 },
//         { name: "Relax", duration: 15000 },
//       ],
//     ],
//     duration: 350000,
//     bpm: 120,
//     rating: 79,
//   },
//   {
//     date: "15.02.2025, 11:50:13",
//     technique: "Legato",
//     pattern: "7-10-11",
//     rounds: [
//       [{ name: "Ready?", duration: 5000 }],
//       [
//         { name: "Work", duration: 60000 },
//         { name: "Relax", duration: 15000 },
//       ],
//       [
//         { name: "Work", duration: 120000 },
//         { name: "Relax", duration: 15000 },
//       ],
//       [
//         { name: "Work", duration: 120000 },
//         { name: "Relax", duration: 15000 },
//       ],
//     ],
//     duration: 350000,
//     bpm: 120,
//     rating: 90,
//   },
//   {
//     date: "15.02.2025, 11:43:14",
//     technique: "Legato",
//     pattern: "1-4-2-3",
//     rounds: [
//       [{ name: "Ready?", duration: 5000 }],
//       [
//         { name: "Work", duration: 60000 },
//         { name: "Relax", duration: 15000 },
//       ],
//       [
//         { name: "Work", duration: 120000 },
//         { name: "Relax", duration: 15000 },
//       ],
//       [
//         { name: "Work", duration: 120000 },
//         { name: "Relax", duration: 15000 },
//       ],
//     ],
//     duration: 350000,
//     bpm: 110,
//     rating: 46,
//   },
//   {
//     date: "15.02.2025, 11:25:39",
//     technique: "Warmup",
//     pattern: "",
//     rounds: [
//       [{ name: "Ready?", duration: 5000 }],
//       [
//         { name: "Steps", duration: 300000 },
//         { name: "Relax", duration: 15000 },
//       ],
//       [
//         { name: "Chords", duration: 300000 },
//         { name: "Relax", duration: 15000 },
//       ],
//       [
//         { name: "Arpeggio", duration: 300000 },
//         { name: "Relax", duration: 15000 },
//       ],
//     ],
//     duration: 900000,
//     bpm: 100,
//     rating: 90,
//   },
//   {
//     date: "14.02.2025, 13:11:12",
//     technique: "Legato",
//     pattern: "7-8-11",
//     bpm: 110,
//     rating: 87,
//     comment: "Легко играется 1/16 при 110",
//     duration: 300000,
//   },
//   {
//     date: "14.02.2025, 12:54:38",
//     technique: "Legato",
//     pattern: "Treli #2",
//     bpm: 100,
//     rating: 63,
//     comment: "под конец рука очень устает",
//     duration: 300000,
//   },
//   {
//     date: "14.02.2025, 12:47:30",
//     technique: "Legato",
//     pattern: "Treli #1",
//     bpm: 100,
//     rating: 83,
//     comment: "переход с 4 на 5 струну грязноват",
//     duration: 300000,
//   },
//   {
//     date: "14.02.2025, 12:40:11",
//     technique: "Legato",
//     pattern: "1-2-4-3",
//     bpm: 80,
//     rating: 48,
//     comment: "Снизил темп с 100 до 80 при переходе на 1/16. ",
//     duration: 300000,
//   },
//   {
//     date: "14.02.2025, 12:29:16",
//     technique: "Warmup",
//     pattern: "",
//     description: "Steps, chords, arpegio",
//     bpm: 100,
//     rating: 81,
//     duration: 900000,
//   },
//   {
//     date: "13.02.2025, 7:35:08",
//     technique: "Warmup",
//     pattern: "",
//     description: "Steps, chords, arpegio",
//     bpm: 100,
//     rating: 81,
//     duration: 900000,
//   },
//   {
//     date: "13.02.2025, 16:57:54",
//     technique: "Legato",
//     pattern: "Treli #2",
//     bpm: 100,
//     rating: 68,
//     comment:
//       "в райне кистевых связок рука как будто забилаcь, дико устала. Спускаться практически очень легко, подниматься в несколько раз тяжелее",
//     duration: 300000,
//   },
//   {
//     date: "13.02.2025, 16:48:34",
//     technique: "Legato",
//     pattern: "Treli #1",
//     bpm: 100,
//     rating: 77,
//     comment: "almost clean upper strings are make too much noise",
//     duration: 300000,
//   },
//   {
//     date: "13.02.2025, 16:41:33",
//     technique: "Legato",
//     pattern: "1-2-4",
//     bpm: 100,
//     rating: 68,
//     comment: "good",
//     duration: 300000,
//   },
//   {
//     date: "13.02.2025, 16:35:08",
//     technique: "Legato",
//     pattern: "2-4-1-3",
//     bpm: 100,
//     rating: 27,
//     comment: "too much noise",
//     duration: 300000,
//   },
// ];
