import logo from './logo.svg';
import './App.css';
import { useRef, useState } from 'react';
import classes from "./App.module.css";

function App() {
  const [src,setSrc] = useState();

  console.log(src)


  return (
    <div className="App">
      <div className={classes.imgWrapper}>
        <img className={classes.img} src={src ? URL.createObjectURL(src) : ""} alt="" />
      </div>
      <form action="">
        <input type="file" onChange={(e) => setSrc(e.target.files[0])}/>
        <input type="button" value="送信"/>
      </form>
    </div>
  );
}

export default App;
