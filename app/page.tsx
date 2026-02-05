export default function Page() {
  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>Year Wallpaper</h1>

      <p>
        <a href="/api/wallpaper?theme=light" target="_blank" rel="noreferrer">
          Открыть light PNG
        </a>
        {" · "}
        <a href="/api/wallpaper?theme=dark" target="_blank" rel="noreferrer">
          Открыть dark PNG
        </a>
      </p>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <div>
          <div>light</div>
          <img
            src="/api/wallpaper?theme=light"
            style={{ width: 260, borderRadius: 12, border: "1px solid #ddd" }}
          />
        </div>

        <div>
          <div>dark</div>
          <img
            src="/api/wallpaper?theme=dark"
            style={{ width: 260, borderRadius: 12, border: "1px solid #ddd" }}
          />
        </div>
      </div>
    </div>
  );
}
