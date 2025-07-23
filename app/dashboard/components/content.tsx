import styles from "../css/BodyContent.module.css";
import { useState } from "react";
import Trades from "./trades";
import Transfer from "./transfer";
import Request from "./request";
// Define Trade type (should match the one in page.tsx)
type Trade = {
  id: string;
  amount: number;
  date: string;
  // add more fields as needed
};

interface BodyContentProps {
  trades: Trade[];
  name?:string;
}

function BodyContent({ trades , name}: BodyContentProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [contentmood, setcontentmood] = useState(0);
  return (
    <div className={styles.bodyContent}>
      <ul>
        {["All Trades", "Transfer", "Request"].map((item, idx) => (
          <li key={item} onClick={() => setcontentmood(idx)}>
            <span
              className={activeIndex === idx ? styles.active : ""}
              onClick={() => setActiveIndex(idx)}
              style={{ cursor: "pointer" }}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>

      <div className={styles.content}>
        {contentmood == 0 ? <Trades trades={trades} name={name}/> : null}
        {contentmood == 1 ? <Transfer/> : null}
        {contentmood == 2 ? <Request/> : null}
      </div>
      </div>
    );
  }

export default BodyContent;