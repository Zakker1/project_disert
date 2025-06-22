export default function ResultOutput({ result }) {
  return (
    <div style={{ marginTop: "1rem" }}>
      <h2>✅ Результат обработки</h2>
      <a href={`http://localhost:3000/${result}`} download>
        📥 Скачать результат
      </a>
    </div>
  );
}
