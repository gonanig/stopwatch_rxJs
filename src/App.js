import React, { useState, useEffect } from "react";
import { interval, fromEvent } from "rxjs";

import {
  debounceTime,
  map,
  scan,
  buffer,
  startWith,
  share,
  filter,
} from "rxjs/operators";
import "./styles/index.scss";

const App = () => {
  const [time, setTime] = useState(0);
  const [wait, setWait] = useState(true);

  let stopwatch$ = interval(1000);

  useEffect(() => {
    let startValue = stopwatch$
      .pipe(
        startWith(time),
        scan((time) => time + 1),
        share()
      )
      .subscribe((v) => {
        if (!wait) {
          setTime(v);
        }
      });

    return () => startValue.unsubscribe();
  }, [wait, time, stopwatch$]);

  const getStart = () => setWait(false);

  const getStop = () => {
    setWait(true);
    setTime(0);
  };

  const getReset = () => {
    setWait(false);
    setTime(0);
  };

  const getWait = (e) => {
    const click$ = fromEvent(e.target, e.type);

    const doubleClick$ = click$.pipe(
      buffer(click$.pipe(debounceTime(250))),
      map((mouseClick) => mouseClick.length),
      filter((mouseClickLenth) => mouseClickLenth === 2)
    );
    doubleClick$.subscribe(() => setWait(true));
  };

  const formatTime = (time) =>
    new Date(time * 1000).toISOString().substr(11, 8);

  return (
    <div className="stopwatch">
      <div className="stopwatch_value">{formatTime(time)}</div>
      <div className="stopwatch_button-box">
        <button className="stopwatch_btn" onClick={getStart}>
          Start
        </button>
        <button className="stopwatch_btn" onClick={getStop}>
          Stop
        </button>
        <button className="stopwatch_btn" onClick={getWait}>
          Wait
        </button>
        <button className="stopwatch_btn" onClick={getReset}>
          Reset
        </button>
      </div>
    </div>
  );
};
export default App;
