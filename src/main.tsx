import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <App />,
  // </StrictMode>,
);

const backup = [
  {
    date: "24.02.2025, 9:26:05",
    technique: "Warmup",
    pattern: "",
    rounds: "warmup",
    duration: 320000,
    bpm: 120,
    rating: 37,
    comment: "Струны стали очень мягкие, очень легко нажимать",
  },
  {
    date: "23.02.2025, 14:01:05",
    technique: "Legato",
    pattern: "Treli #2",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Play", duration: 60000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 320000,
    bpm: 120,
    rating: 37,
  },
  {
    date: "23.02.2025, 09:09:01",
    technique: "Legato",
    pattern: "Treli #2",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Play", duration: 60000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 320000,
    bpm: 120,
    rating: 78,
  },
  {
    date: "23.02.2025, 08:55:24",
    technique: "Legato",
    pattern: "Treli #2",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Play", duration: 60000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 320000,
    bpm: 130,
    rating: 74,
  },
  {
    date: "23.02.2025, 08:48:55",
    technique: "Legato",
    pattern: "Treli #1",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Play", duration: 60000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 320000,
    bpm: 140,
    rating: 82,
    comment: "Есть остановки и чуть чуть не попадания в темп\n",
  },
  {
    date: "23.02.2025, 08:41:36",
    technique: "Legato",
    pattern: "7-8-9",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Play", duration: 60000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 320000,
    bpm: 140,
    rating: 86,
  },
  {
    date: "23.02.2025, 08:33:10",
    technique: "Warmup",
    pattern: "",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Steps", duration: 300000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Chords", duration: 300000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Arpeggio-Legato", duration: 300000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 920000,
    bpm: 100,
    rating: 79,
  },
  {
    date: "22.02.2025, 15:13:42",
    technique: "Legato",
    pattern: "Treli #1",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Play", duration: 60000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 320000,
    bpm: 140,
    rating: 69,
    comment: "Чисто но в темп с трудом попадаю\n",
  },
  {
    date: "22.02.2025, 15:02:32",
    technique: "Legato",
    pattern: "Treli #2",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Play", duration: 60000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 320000,
    bpm: 130,
    rating: 74,
    comment: "Усталость",
  },
  {
    date: "21.02.2025, 17:22:18",
    technique: "Legato",
    pattern: "Treli #2",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Play", duration: 60000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 320000,
    bpm: 130,
    rating: 63,
    comment: "В последнем раунде быстро устаю",
  },
  {
    date: "21.02.2025, 14:18:11",
    technique: "Legato",
    pattern: "Treli #2",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Play", duration: 60000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 320000,
    bpm: 130,
    rating: 70,
    comment: "На половине последенгл раунда усталось 2 пальцей мез и след\n",
  },
  {
    date: "21.02.2025, 14:10:16",
    technique: "Legato",
    pattern: "Treli #2",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Play", duration: 60000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 320000,
    bpm: 140,
    rating: 70,
    comment: "Шума нет, но темп очень быстрый пальцы не двигаются устают",
  },
  {
    date: "21.02.2025, 12:18:04",
    technique: "Legato",
    pattern: "Exploration",
    rounds: [[{ name: "Play", duration: 720000 }]],
    duration: 720000,
    bpm: 140,
    rating: 50,
    comment: "",
  },
  {
    date: "21.02.2025, 12:05:04",
    technique: "Legato",
    pattern: "Treli #2",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Play", duration: 60000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 320000,
    bpm: 140,
    rating: 50,
    comment:
      "Очень хорошо но без остановок не получается очень устает рука боли нет сильная усталость",
  },
  {
    date: "21.02.2025, 11:57:05",
    technique: "Legato",
    pattern: "Treli #1",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Play", duration: 60000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 320000,
    bpm: 140,
    rating: 78,
    comment: "Проблемы темпа но играется легко и достаточно чисто",
  },
  {
    date: "21.02.2025, 10:30:12",
    technique: "Warmup",
    pattern: "",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Steps", duration: 300000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Chords", duration: 300000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Arpeggio-Legato", duration: 300000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 920000,
    bpm: 100,
    rating: 90,
  },
  {
    date: "20.02.2025, 16:19:06",
    technique: "Legato",
    pattern: "Treli #2",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Play", duration: 60000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 320000,
    bpm: 120,
    rating: 87,
    comment:
      "Очень чисто, но очень устало что то вдоль предплечия пальцы утпо недвигаются",
  },
  {
    date: "20.02.2025, 12:14:01",
    technique: "Legato",
    pattern: "Treli #2",
    rounds: [[{ name: "Play", duration: 2400000 }]],
    duration: 2400000,
    bpm: 130,
    rating: 90,
    comment: "",
  },
  {
    date: "20.02.2025, 10:14:01",
    technique: "Legato",
    pattern: "Treli #2",
    rounds: [[{ name: "Play", duration: 1380000 }]],
    duration: 1380000,
    bpm: 130,
    rating: 90,
    comment: "",
  },
  {
    date: "20.02.2025, 09:49:51",
    technique: "Legato",
    pattern: "Treli #2",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Play", duration: 60000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 320000,
    bpm: 130,
    rating: 90,
    comment: "Тяжело поднять но долго не получается шума почти нету!",
  },
  {
    date: "20.02.2025, 09:36:41",
    technique: "Legato",
    pattern: "Treli #1",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Play", duration: 60000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 320000,
    bpm: 130,
    rating: 74,
    comment:
      "16 - нет, но триольные восьмые очень чистые снизить темп до 110\\\\n",
  },
  {
    date: "20.02.2025, 09:28:41",
    technique: "Legato",
    pattern: "7-8-9-19",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Play", duration: 60000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 320000,
    bpm: 120,
    rating: 78,
    comment:
      "Стало гораздно меньше шума но 16 не полуучает пока только триольные восьмые\\\\n",
  },
  {
    date: "20.02.2025, 09:20:14",
    technique: "Legato",
    pattern: "7-9-11",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Play", duration: 60000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 320000,
    bpm: 140,
    rating: 82,
    comment: "Есть растерянность в рамерности",
  },
  {
    date: "20.02.2025, 09:12:06",
    technique: "Warmup",
    pattern: "",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Steps", duration: 300000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Chords", duration: 300000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Arpeggio-Legato", duration: 300000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 920000,
    bpm: 100,
    rating: 82,
  },
  {
    date: "19.02.2025, 20:00:55",
    technique: "Legato",
    pattern: "Treli #2",
    rounds: [[{ name: "Play", duration: 5400000 }]],
    duration: 5400000,
    bpm: 110,
    rating: 80,
  },
  {
    date: "19.02.2025, 20:00:55",
    technique: "Legato",
    pattern: "Treli #2",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Play", duration: 60000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 320000,
    bpm: 110,
    rating: 50,
  },
  {
    date: "19.02.2025, 18:49:17",
    technique: "Legato",
    pattern: "Treli #2",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Play", duration: 60000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 320000,
    bpm: 110,
    rating: 50,
  },
  {
    date: "19.02.2025, 18:38:05",
    technique: "Legato",
    pattern: "7-9-10",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Play", duration: 60000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 320000,
    bpm: 130,
    rating: 50,
  },
  {
    date: "19.02.2025, 18:29:49",
    technique: "Legato",
    pattern: "",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Play", duration: 60000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 320000,
    bpm: 130,
    rating: 63,
  },
  {
    date: "19.02.2025, 18:18:46",
    technique: "Warmup",
    pattern: "",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Steps", duration: 300000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Chords", duration: 300000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Arpeggio-Legato", duration: 300000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 920000,
    bpm: 80,
    rating: 79,
  },
  {
    date: "18.02.2025, 18:45:59",
    technique: "Legato",
    pattern: "Treli #2",
    rounds: [[{ name: "Work", duration: 3000000 }]],
    duration: 3000000,
    bpm: 110,
    rating: 90,
    comment: "110 Думаю пока оставить",
  },
  {
    date: "18.02.2025, 11:54:59",
    technique: "Legato",
    pattern: "Treli #2",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Play", duration: 60000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 320000,
    bpm: 100,
    rating: 86,
    comment: "Попробовать с след раз 110",
  },
  {
    date: "18.02.2025, 11:47:15",
    technique: "Legato",
    pattern: "5-7-9",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Play", duration: 60000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 320000,
    bpm: 130,
    rating: 50,
    comment: "Устала мышца под большим пальцем",
  },
  {
    date: "18.02.2025, 11:39:26",
    technique: "Legato",
    pattern: "Treli #1",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Play", duration: 60000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 320000,
    bpm: 130,
    rating: 90,
    comment: "Можно попробовать 140 BPM",
  },
  {
    date: "18.02.2025, 11:30:50",
    technique: "Legato",
    pattern: "1-3-2-4",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Play", duration: 60000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 320000,
    bpm: 100,
    rating: 82,
  },
  {
    date: "18.02.2025, 11:22:47",
    technique: "Warmup",
    pattern: "",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Steps", duration: 300000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Chords", duration: 300000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Arpeggio-Legato", duration: 300000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 920000,
    bpm: 80,
    rating: 79,
  },
  {
    date: "17.02.2025, 19:48:25",
    technique: "Legato",
    pattern: "treli #2",
    rounds: [[{ name: "Play", duration: 4020000 }]],
    duration: 4020000,
    bpm: 110,
    rating: 80,
  },
  {
    date: "17.02.2025, 18:41:25",
    technique: "Legato",
    pattern: "treli #2 pinky",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Play", duration: 60000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 320000,
    bpm: 110,
    rating: 86,
  },
  {
    date: "17.02.2025, 15:28:02",
    technique: "Legato",
    pattern: "Treli #1",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Play", duration: 60000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 320000,
    bpm: 100,
    rating: 90,
    comment: "В целом легко",
  },
  {
    date: "17.02.2025, 15:19:58",
    technique: "Legato",
    pattern: "Treli #2",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Play", duration: 60000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 320000,
    bpm: 100,
    rating: 88,
    comment:
      "В следующий раз играть 100BPM получается хорошо, усталость чуствуется и пальцы перестают двигаться",
  },
  {
    date: "17.02.2025, 08:24:05",
    technique: "Legato",
    pattern: "2-3-5",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Play", duration: 60000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 320000,
    bpm: 130,
    rating: 88,
  },
  {
    date: "17.02.2025, 08:13:12",
    technique: "Legato",
    pattern: "Treli #2",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Play", duration: 60000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 320000,
    bpm: 120,
    rating: 63,
    comment:
      "Очень устают безымянный и мезинец но удалось спуститься поднятиься несоклько раз",
  },
  {
    date: "17.02.2025, 08:05:39",
    technique: "Legato",
    pattern: "Treli #1",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Play", duration: 60000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 320000,
    bpm: 130,
    rating: 81,
    comment: "Temp ok, очень тяжело сделать pull_off на 4 струне мезинцем",
  },
  {
    date: "17.02.2025, 07:57:21",
    technique: "Legato",
    pattern: "1-2-3-4",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Play", duration: 60000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 320000,
    bpm: 100,
    rating: 76,
  },
  {
    date: "17.02.2025, 07:50:45",
    technique: "Warmup",
    pattern: "",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Steps", duration: 300000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Chords", duration: 300000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Arpeggio-Legato", duration: 300000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 920000,
    bpm: 80,
    rating: 78,
  },
  {
    date: "16.02.2025, 17:03:47",
    technique: "Legato",
    pattern: "Treli #2",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Play", duration: 60000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Play", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 320000,
    bpm: 120,
    rating: 51,
    comment:
      "Получилось 1/8 триолями, 1/16 - очень уставала рука и шум на 5-6 струне",
  },
  {
    date: "16.02.2025, 16:55:18",
    technique: "Legato",
    pattern: "",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Steps", duration: 60000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Chords", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "LegatoArpegio", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 320000,
    bpm: 130,
    rating: 84,
    comment: "130 BPM нормально получаются",
  },
  {
    date: "16.02.2025, 11:55:30",
    technique: "Legato",
    pattern: "Treli #2",
    rounds: [[{ name: "Work", duration: 780000 }]],
    duration: 780000,
    bpm: 100,
    rating: 80,
    comment: "",
  },
  {
    date: "16.02.2025, 10:25:30",
    technique: "Legato",
    pattern: "Treli #2",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Steps", duration: 60000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Chords", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "LegatoArpeggio", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 320000,
    bpm: 120,
    rating: 55,
    comment:
      "Спускаться получатся без проблем, поднимаюсь со спотыканиями, ниразу неполучилось полностью прогнать один круг",
  },
  {
    date: "16.02.2025, 10:18:19",
    technique: "Legato",
    pattern: "Treli #1",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Steps", duration: 60000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Chords", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "LegatoArpegio", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 320000,
    bpm: 120,
    rating: 82,
    comment: "Очень даже чисто 1/16, думаю можно попробовать +10 BPM",
  },
  {
    date: "16.02.2025, 10:11:04",
    technique: "Legato",
    pattern: "2-4-5",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Steps", duration: 60000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Chords", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "LegatoArpegio", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 320000,
    bpm: 130,
    rating: 58,
  },
  {
    date: "16.02.2025, 10:03:23",
    technique: "Legato",
    pattern: "7-10-9-11",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Steps", duration: 60000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Chords", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "LegatoArpegio", duration: 120000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 320000,
    bpm: 100,
    rating: 70,
  },
  {
    date: "16.02.2025, 09:47:55",
    technique: "Warmup",
    pattern: "",
    rounds: [
      [{ name: "Ready ?", duration: 5000 }],
      [
        { name: "Steps", duration: 300000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "Chords", duration: 300000 },
        { name: "Relax", duration: 5000 },
      ],
      [
        { name: "LegatoArpegio", duration: 300000 },
        { name: "Relax", duration: 5000 },
      ],
    ],
    duration: 920000,
    bpm: 100,
    rating: 84,
    comment: "После разминки побаливает мышца под большим пальцем",
  },
  {
    date: "15.02.2025, 21:04:54",
    technique: "Steps",
    pattern: "",
    rounds: [
      [{ name: "Ready?", duration: 5000 }],
      [
        { name: "Work", duration: 300000 },
        { name: "Relax", duration: 15000 },
      ],
    ],
    duration: 320000,
    bpm: 80,
    rating: 100,
  },
  {
    date: "15.02.2025, 14:38:01",
    technique: "Legato",
    pattern: "Treli #2 on 5-6 strings",
    rounds: [
      [{ name: "Ready?", duration: 5000 }],
      [
        { name: "Work", duration: 60000 },
        { name: "Relax", duration: 15000 },
      ],
      [
        { name: "Work", duration: 120000 },
        { name: "Relax", duration: 15000 },
      ],
      [
        { name: "Work", duration: 120000 },
        { name: "Relax", duration: 15000 },
      ],
    ],
    duration: 350000,
    bpm: 90,
    rating: 56,
    comment: "Шум все равно есть",
  },
  {
    date: "15.02.2025, 14:22:53",
    technique: "Legato",
    pattern: "1-4-2-3",
    rounds: [
      [{ name: "Ready?", duration: 5000 }],
      [
        { name: "Work", duration: 60000 },
        { name: "Relax", duration: 15000 },
      ],
      [
        { name: "Work", duration: 120000 },
        { name: "Relax", duration: 15000 },
      ],
      [
        { name: "Work", duration: 120000 },
        { name: "Relax", duration: 15000 },
      ],
    ],
    duration: 350000,
    bpm: 110,
    rating: 78,
    comment:
      "1/16 получается хорошо, приходится останавливаться иногда на финальном раунде",
  },
  {
    date: "15.02.2025, 14:14:49",
    technique: "Legato",
    pattern: "Treli #1",
    rounds: [
      [{ name: "Ready?", duration: 5000 }],
      [
        { name: "Work", duration: 60000 },
        { name: "Relax", duration: 15000 },
      ],
      [
        { name: "Work", duration: 120000 },
        { name: "Relax", duration: 15000 },
      ],
      [
        { name: "Work", duration: 120000 },
        { name: "Relax", duration: 15000 },
      ],
    ],
    duration: 350000,
    bpm: 110,
    rating: 83,
    comment: "Думаю можно сделать +20 BPM, верхние струны тоже звучали чисто",
  },
  {
    date: "15.02.2025, 14:07:29",
    technique: "Legato",
    pattern: "Treli #2",
    rounds: [
      [{ name: "Ready?", duration: 5000 }],
      [
        { name: "Work", duration: 60000 },
        { name: "Relax", duration: 15000 },
      ],
      [
        { name: "Work", duration: 120000 },
        { name: "Relax", duration: 15000 },
      ],
      [
        { name: "Work", duration: 120000 },
        { name: "Relax", duration: 15000 },
      ],
    ],
    duration: 350000,
    bpm: 100,
    rating: 69,
    comment: "Treli #2: Очень устает рука под конец, шум на верхних струнах",
  },
  {
    date: "15.02.2025, 12:04:36",
    technique: "Legato",
    pattern: "Treli #2",
    rounds: [
      [{ name: "Ready?", duration: 5000 }],
      [
        { name: "Work", duration: 60000 },
        { name: "Relax", duration: 15000 },
      ],
      [
        { name: "Work", duration: 120000 },
        { name: "Relax", duration: 15000 },
      ],
      [
        { name: "Work", duration: 120000 },
        { name: "Relax", duration: 15000 },
      ],
    ],
    duration: 350000,
    bpm: 111,
    rating: 59,
    comment:
      "Под конец рука очень устает. 120 темп не вывез убрал до 110. На толстых струнах по прежнему грязно",
  },
  {
    date: "15.02.2025, 11:57:20",
    technique: "Legato",
    pattern: "Treli #1",
    rounds: [
      [{ name: "Ready?", duration: 5000 }],
      [
        { name: "Work", duration: 60000 },
        { name: "Relax", duration: 15000 },
      ],
      [
        { name: "Work", duration: 120000 },
        { name: "Relax", duration: 15000 },
      ],
      [
        { name: "Work", duration: 120000 },
        { name: "Relax", duration: 15000 },
      ],
    ],
    duration: 350000,
    bpm: 120,
    rating: 79,
  },
  {
    date: "15.02.2025, 11:50:13",
    technique: "Legato",
    pattern: "7-10-11",
    rounds: [
      [{ name: "Ready?", duration: 5000 }],
      [
        { name: "Work", duration: 60000 },
        { name: "Relax", duration: 15000 },
      ],
      [
        { name: "Work", duration: 120000 },
        { name: "Relax", duration: 15000 },
      ],
      [
        { name: "Work", duration: 120000 },
        { name: "Relax", duration: 15000 },
      ],
    ],
    duration: 350000,
    bpm: 120,
    rating: 90,
  },
  {
    date: "15.02.2025, 11:43:14",
    technique: "Legato",
    pattern: "1-4-2-3",
    rounds: [
      [{ name: "Ready?", duration: 5000 }],
      [
        { name: "Work", duration: 60000 },
        { name: "Relax", duration: 15000 },
      ],
      [
        { name: "Work", duration: 120000 },
        { name: "Relax", duration: 15000 },
      ],
      [
        { name: "Work", duration: 120000 },
        { name: "Relax", duration: 15000 },
      ],
    ],
    duration: 350000,
    bpm: 110,
    rating: 46,
  },
  {
    date: "15.02.2025, 11:25:39",
    technique: "Warmup",
    pattern: "",
    rounds: [
      [{ name: "Ready?", duration: 5000 }],
      [
        { name: "Steps", duration: 300000 },
        { name: "Relax", duration: 15000 },
      ],
      [
        { name: "Chords", duration: 300000 },
        { name: "Relax", duration: 15000 },
      ],
      [
        { name: "Arpeggio", duration: 300000 },
        { name: "Relax", duration: 15000 },
      ],
    ],
    duration: 900000,
    bpm: 100,
    rating: 90,
  },
  {
    date: "14.02.2025, 13:11:12",
    technique: "Legato",
    pattern: "7-8-11",
    bpm: 110,
    rating: 87,
    comment: "Легко играется 1/16 при 110",
    duration: 300000,
  },
  {
    date: "14.02.2025, 12:54:38",
    technique: "Legato",
    pattern: "Treli #2",
    bpm: 100,
    rating: 63,
    comment: "под конец рука очень устает",
    duration: 300000,
  },
  {
    date: "14.02.2025, 12:47:30",
    technique: "Legato",
    pattern: "Treli #1",
    bpm: 100,
    rating: 83,
    comment: "переход с 4 на 5 струну грязноват",
    duration: 300000,
  },
  {
    date: "14.02.2025, 12:40:11",
    technique: "Legato",
    pattern: "1-2-4-3",
    bpm: 80,
    rating: 48,
    comment: "Снизил темп с 100 до 80 при переходе на 1/16. ",
    duration: 300000,
  },
  {
    date: "14.02.2025, 12:29:16",
    technique: "Warmup",
    pattern: "",
    description: "Steps, chords, arpegio",
    bpm: 100,
    rating: 81,
    duration: 900000,
  },
  {
    date: "13.02.2025, 7:35:08",
    technique: "Warmup",
    pattern: "",
    description: "Steps, chords, arpegio",
    bpm: 100,
    rating: 81,
    duration: 900000,
  },
  {
    date: "13.02.2025, 16:57:54",
    technique: "Legato",
    pattern: "Treli #2",
    bpm: 100,
    rating: 68,
    comment:
      "в райне кистевых связок рука как будто забилаcь, дико устала. Спускаться практически очень легко, подниматься в несколько раз тяжелее",
    duration: 300000,
  },
  {
    date: "13.02.2025, 16:48:34",
    technique: "Legato",
    pattern: "Treli #1",
    bpm: 100,
    rating: 77,
    comment: "almost clean upper strings are make too much noise",
    duration: 300000,
  },
  {
    date: "13.02.2025, 16:41:33",
    technique: "Legato",
    pattern: "1-2-4",
    bpm: 100,
    rating: 68,
    comment: "good",
    duration: 300000,
  },
  {
    date: "13.02.2025, 16:35:08",
    technique: "Legato",
    pattern: "2-4-1-3",
    bpm: 100,
    rating: 27,
    comment: "too much noise",
    duration: 300000,
  },
];

const a = {
  name: "1m-2m-2m",
  rounds: [
    [{ name: "Ready ?", duration: 5000 }],
    [
      { name: "Play", duration: 60000 },
      { name: "Relax", duration: 5000 },
    ],
    [
      { name: "Play", duration: 120000 },
      { name: "Relax", duration: 5000 },
    ],
    [
      { name: "Play", duration: 120000 },
      { name: "Relax", duration: 5000 },
    ],
  ],
};
