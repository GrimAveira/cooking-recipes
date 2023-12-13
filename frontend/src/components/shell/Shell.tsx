import Header from "../header/Header";
import Menu from "../menu/Menu";
import { useState } from "react";
import styles from "./Shell.module.scss";

function Shell() {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <Header show={show} setShow={setShow} />
      <Menu show={show} />
    </div>
  );
}

export default Shell;
