import { ImageResponse } from "next/og";

export const runtime = "edge";

function dayOfYear(d: Date) {
  const start = new Date(d.getFullYear(), 0, 1);
  return Math.floor((d.getTime() - start.getTime()) / 86400000) + 1;
}

function daysInYear(year: number) {
  const start = new Date(year, 0, 1).getTime();
  const end = new Date(year + 1, 0, 1).getTime();
  return Math.round((end - start) / 86400000);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const theme = searchParams.get("theme") ?? "light";

  const now = new Date();
  const year = now.getFullYear();

  const total = daysInYear(year);        // 365/366
  const today = dayOfYear(now);          // 1..365/366
  const done = today - 1;                // сколько полностью прошло
  const left = total - done;             // как на скрине (включая текущий день)
  const percent = Math.floor((done / total) * 100); // как на скрине (9% на начале февраля)

  // Сетка: можно менять, если хочешь более “квадратную”
  const cols = 19; // похоже на стиль со скрина
  const rows = Math.ceil(total / cols);
  const cellCount = rows * cols;

  const dot = 18;      // размер точки
  const gap = 16;      // расстояние между точками
  const gridW = cols * dot + (cols - 1) * gap;
  const gridH = rows * dot + (rows - 1) * gap;

  const isDark = theme === "dark";

  // Цвета под стиль скрина
  const bg = isDark ? "#0B0F14" : "#F2F2F7";
  const dotDone = isDark ? "rgba(255,255,255,0.85)" : "#2C2C2E";
  const dotEmpty = isDark ? "rgba(255,255,255,0.18)" : "rgba(60,60,67,0.18)";
  const accent = "#FF3B30"; // iOS red

  const textMain = isDark ? "rgba(255,255,255,0.85)" : "rgba(60,60,67,0.60)";

  // iPhone размер (можешь оставить так)
  const W = 1290;
  const H = 2796;

  const items = Array.from({ length: cellCount }, (_, i) => i + 1);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: bg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 260,
          paddingBottom: 220,
          fontFamily: "system-ui",
        }}
      >
        {/* верхний пустой блок как на скрине */}
        <div style={{ height: 1 }} />

        {/* сетка точек */}
        <div
          style={{
            width: gridW,
            height: gridH,
            display: "flex",
            flexWrap: "wrap",
            gap: gap,
            alignContent: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          {items.map((n) => {
            // n > total — “пустые” добивочные точки для ровного прямоугольника
            let color = dotEmpty;

            if (n <= total) {
              if (n <= done) color = dotDone;
              else if (n === today) color = accent;
              else color = dotEmpty;
            }

            return (
              <div
                key={n}
                style={{
                  width: dot,
                  height: dot,
                  borderRadius: 999,
                  background: color,
                }}
              />
            );
          })}
        </div>

        {/* подпись внизу */}
        <div style={{ fontSize: 56, fontWeight: 600 }}>
          <span style={{ color: textMain }}>{left}d left</span>
          <span style={{ color: textMain }}> · </span>
          <span style={{ color: accent }}>{percent}%</span>
        </div>
      </div>
    ),
    { width: W, height: H }
  );
}
