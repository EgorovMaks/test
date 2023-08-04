import "./App.css";
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files);
  };

  const handleUpload = async () => {
    for (let i = 0; i < selectedFile.length; i++) {
      const { data } = await axios.get(
        `https://cloud-api.yandex.net/v1/disk/resources/upload?path=%FuploadTest%2F${selectedFile[i].name}`,
        {
          headers: {
            Authorization: `OAuth y0_AgAAAABqL_pFAApCVgAAAADo_2DGuUt5-PjvT2ivSXgyASIFjIv67cg`,
          },
        }
      );
      console.log(data)
    }
  };

  return (
    <div>
      <h2>Загрузка файла на Яндекс Диск</h2>
      <input type="file" onChange={handleFileChange} multiple />
      <button onClick={handleUpload}>Загрузить</button>
    </div>
  );
}

export default App;
