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
  const day = dayOfYear(now);
  const total = daysInYear(year);
  const percent = Math.floor((day / total) * 100);

  const dark = theme === "dark";
  const bg = dark ? "#0B0F14" : "#F4F6F8";
  const fg = dark ? "#EAF0F6" : "#0B0F14";
  const fill = dark ? "#7DD3FC" : "#0284C7";
  const empty = dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)";

  const W = 1290;
  const H = 2796;

  const cols = 53;
  const cell = 14;
  const gap = 6;
  const gridW = cols * cell + (cols - 1) * gap;

  const cells = Array.from({ length: total }, (_, i) => i + 1);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: bg,
          color: fg,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 96,
          fontFamily: "system-ui",
        }}
      >
        <div>
          <div style={{ fontSize: 72, fontWeight: 800 }}>
            {year} · {percent}%
          </div>
          <div style={{ marginTop: 16, fontSize: 34, opacity: 0.8 }}>
            День {day} из {total}
          </div>
        </div>

        <div style={{ width: gridW, display: "flex", flexWrap: "wrap", gap }}>
          {cells.map((n) => (
            <div
              key={n}
              style={{
                width: cell,
                height: cell,
                borderRadius: 4,
                background: n <= day ? fill : empty,
              }}
            />
          ))}
        </div>

        <div style={{ fontSize: 26, opacity: 0.6 }}>
          /api/wallpaper?theme={theme}
        </div>
      </div>
    ),
    { width: W, height: H }
  );
}
