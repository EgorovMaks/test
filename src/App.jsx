import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import preloaderImg from "./img/preloader/preloader.svg";
import { getNoun } from "./components/GetNoun";

function App() {
  const [selectedFile, setSelectedFile] = useState([]);
  const [preloader, setPreloader] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files);
  };

  const handleUpload = async () => {
    setPreloader(true);
    if (selectedFile.length > 0) {
      for (let i = 0; i < selectedFile.length; i++) {
        try {
          const { data } = await axios.get(
            `https://cloud-api.yandex.net/v1/disk/resources/upload?path=%2Ftest%2F${selectedFile[i].name}`,
            {
              headers: {
                Authorization: `OAuth y0_AgAAAABqL_pFAApLDAAAAADpbrl7iZrcV2eMSBOy9M_png5LlMmnliA`,
              },
            }
          );
          await axios.put(data.href, selectedFile[i]);
          setQuantity((i) => {
            return i + 1;
          });
        } catch (error) {
          setQuantity((i) => {
            return i + 1;
          });
          alert(
            `Вы уже отправили ранее файл с таким именем "${selectedFile[i].name}"`
          );
        }
      }
    } else {
      alert("Вы не выбрали файл для отправки");
    }
    setQuantity((i) => {
      return i + 1;
    });
    alert("Загрузка завершена");
    document.querySelector("#input").value = "";
    setSelectedFile([]);
    setPreloader(false);
    setQuantity(0);
  };

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <h2>Загрузка файла на Яндекс Диск </h2>
      <div className="box">
        {preloader ? (
          <div className="preloader">
            <p className="title">{`Идет отправка файлов ${JSON.stringify(
              quantity
            )} из ${selectedFile.length}`}</p>
            <img src={`${preloaderImg}`} alt="" />
          </div>
        ) : null}
        <div className="input-file-row">
          <label className="input-file">
            <input
              id="input"
              type="file"
              onChange={handleFileChange}
              multiple
            />
            <span>Выберите файл</span>
          </label>
          <p className="input-file-list">{`Вы выбрали ${
            selectedFile.length
          } ${getNoun(selectedFile.length, "файл", "файла", "файлов")}`}</p>
        </div>
        <button className="btn" onClick={handleUpload}>
          Загрузить
        </button>
      </div>
      <button
        onClick={() => openInNewTab("https://disk.yandex.ru/d/OS7HQX1A1cxasA")}
        className="link"
      >
        Мой яндекс диск(ваши файлы тут)
      </button>
    </>
  );
}

export default App;
