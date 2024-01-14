import Header from "../header/Header";
import Menu from "../menu/Menu";
import { useState } from "react";
import styles from "./Shell.module.scss";
import Burger from "../burger/Burger";

function Shell() {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <Burger
        show={show}
        div={{
          title: "Меню",
          onClick: () => {
            setShow((show: boolean) => !show);
          },
          className: styles.menuButton,
        }}
      />
      <Header />
      <Menu show={show} />
    </div>
  );
}

export default Shell;
