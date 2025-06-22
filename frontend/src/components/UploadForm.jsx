import { useState } from "react";
import { uploadImage } from "../api";
import styles from "./UploadForm.module.css";

export default function UploadForm({ onStart }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");

  const isValidImage = (file) => file && file.type.startsWith("image/");

  const handleChange = (e) => {
    const selected = e.target.files[0];
    if (!isValidImage(selected)) {
      setError("Можно загружать только изображения.");
      return;
    }
    setError("");
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = async () => {
    if (!file) return setError("Файл не выбран.");
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await uploadImage(formData);
      onStart(res.taskId); // 👈 У тебя должно быть просто res.taskId
    } catch {
      setError("Ошибка при загрузке изображения.");
    }
  };

  return (
    <div className={styles.container}>
      <h3>📤 Загрузка изображения</h3>
      <input type="file" accept="image/*" onChange={handleChange} />
      {preview && (
        <img src={preview} className={styles.preview} alt="предпросмотр" />
      )}
      <button className={styles.button} onClick={handleSubmit}>
        Отправить
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
