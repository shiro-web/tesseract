import logo from './logo.svg';
import './App.css';
import { useRef, useState } from 'react';
import classes from "./App.module.css";
import Tesseract, { createWorker } from 'tesseract.js';

function App() {
  const fileInputRef = useRef();
  const [src,setSrc] = useState();
  const [text,setText] = useState();

  const handleFileChange = () => {
    if ( fileInputRef.current.files.length > 0) {
    const fileInputSrc = fileInputRef.current.files[0];
    console.log(fileInputSrc)
    const url = URL.createObjectURL(fileInputSrc);
    console.log(url)
    setSrc(url)
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const worker = await createWorker();
    await worker.loadLanguage('jpn');
    await worker.initialize('jpn');
    const rectangle = { left: 0, top: 0, width: 320, height: 320 };
    // const rectangle = { left: 0, top: 0, width: 170, height: 320 };
    const { data: { text } } = await worker.recognize(src,{rectangle});
    console.log(text)
    // dataの中身を見てみると、\nが入っていることがわかる。
    setText(text)
    await worker.terminate();
  }

  return (
    <div className="App">
      <div className={classes.imgWrapper}>
        <img className={classes.img} src={src ? src : ""} alt="" />
      </div>
      <form action="" onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} ref={fileInputRef}/>
        <input type="submit" value="読み取る"/>
      </form>
      {text ? <p>結果: <span className={classes.bold}>{text.replace(/\s/g, "")}</span> </p>  : <p>画像を選択してください</p>}
    </div>
  );
}

export default App;
