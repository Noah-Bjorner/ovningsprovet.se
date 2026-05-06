export type TestQuestion = {
  content: string;
  description: string;
  id: string;
  title: string;
};

const graphSegmentLengthQuestionContent = String.raw`
Funktionen $f$ ges av $f(x) = \frac{x^2}{a}$ där $a$ är en konstant och $a > 0$

En sträcka $S$ dras från den punkt på funktionens graf där $x$-koordinaten är $a$ till den punkt på funktionens graf där $x$-koordinaten är $2a$.

Bestäm längden av sträckan $S$ uttryckt i $a$.
`;

const runningDistanceQuestionContent = String.raw`
Kim har bestämt sig för att springa varje dag under en vecka.
Tabellen visar hur långt Kim springer under veckans fem första dagar.

| Dag | Måndag | Tisdag | Onsdag | Torsdag | Fredag | Lördag | Söndag |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Sträcka (km) | 1,5 | 4,4 | 2,7 | 2,2 | 1,7 |  |  |

a) Beräkna medelvärdet för måndag-fredag.

b) Medelvärdet för hela veckan (måndag-söndag) är 2,7 km.
Medianen för hela veckan är densamma som för de fem första dagarna.
Undersök hur långt Kim kan ha sprungit under lördagen respektive söndagen.
`;

const foodWasteQuestionContent = String.raw`
En skola har som mål att under ett läsår minska mängden mat som eleverna slänger.
På skolan går det 680 elever.

|  |  |
| :--- | :--- |
| En portion | 300 g |
| Kostnad råvaror | 10 kr/portion |
| Slängd mat | 30 g/portion |

a) Hur många kilogram mat slänger eleverna sammanlagt under en skolvecka (5 dagar)?

b) Elevrådet vill att mängden slängd mat ska minska med 2 500 kg under ett läsår (35 skolveckor). Skolköket kan då laga mindre mängd mat. De pengar som skolan sparar kan användas till ett teaterbesök för alla elever. En biljett kostar 120 kr. Kommer de pengar som skolan sparar att räcka till teaterbesöket?
`;

const bottledWaterQuestionContent = String.raw`
![Glas fylls med vatten från en kran](https://static.noahbjorner.com/edu/ma-ak-9-p3-i1-img_p2_1.png "0,04 kr/liter size=md ratio=1.28:1") ![Flaska med mineralvatten](https://static.noahbjorner.com/edu/ma-ak-9-p3-i2-img_p2_2.png "15 kr för 0,75 liter ratio=1:1.68")

Kim påstår att vatten på flaska är 500 gånger dyrare per liter än kranvatten.
Stämmer det? Motivera ditt svar.
`;

export const testQuestions: TestQuestion[] = [
  {
    id: "graph-segment-length",
    title: "Graf och sträcka",
    description: "Bestäm en längd uttryckt i konstanten a.",
    content: graphSegmentLengthQuestionContent,
  },
  {
    id: "running-distance",
    title: "Löpning under veckan",
    description: "Resonera om medelvärde och median.",
    content: runningDistanceQuestionContent,
  },
  {
    id: "food-waste",
    title: "Matsvinn i skolan",
    description: "Räkna med enhetsomvandlingar och kostnad.",
    content: foodWasteQuestionContent,
  },
  {
    id: "bottled-water",
    title: "Vatten på flaska",
    description: "Jämför literpris och motivera svaret.",
    content: bottledWaterQuestionContent,
  },
];
