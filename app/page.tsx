export default function Page() {
  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>Year Wallpaper</h1>
      <p>PNG тут:</p>
      <ul>
        <li>/api/wallpaper?theme=light</li>
        <li>/api/wallpaper?theme=dark</li>
      </ul>
    </div>
  );
}
