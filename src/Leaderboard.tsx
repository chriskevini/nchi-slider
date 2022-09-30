import React, {useState, useEffect} from "react";
import {GiTrophyCup} from "react-icons/gi";
import {bgcolors, colors} from "./CellView";
import {BsArrowLeftSquareFill} from "react-icons/bs";
import {getScores} from "./firebase";
import {DocumentData, Timestamp} from "firebase/firestore/lite";

const NUMBER_OF_SCORES_TO_SHOW = 10;

function Leaderboard() {
  const [showDialog, setShowDialog] = useState(false);
  const [scores, setScores] = useState<DocumentData[]>(scoresSkeleton);
  useEffect(() => {
    function padWithEmpty(scores: {}[]) {
      const padding = Array(NUMBER_OF_SCORES_TO_SHOW - scores.length).fill({
        flag: "　",
        name: "　",
        score: "　",
        createdAt: "　",
      });
      return [...scores, ...padding];
    }
    if (showDialog)
      getScores(NUMBER_OF_SCORES_TO_SHOW).then((scores) =>
        setScores(padWithEmpty(scores))
      );
  }, [showDialog]);
  console.log(scores);
  return (
    <>
      <button
        onClick={() => setShowDialog(true)}
        style={iconButtonStyle}>
        <GiTrophyCup />
      </button>
      <dialog
        open
        color={colors.default}
        style={{
          position: "fixed",
          inset: 0,
          // height: "28.75rem",
          maxHeight: "95vh",
          overflow: "hidden",
          zIndex: 10,
          backgroundColor: bgcolors.gaps,
          color: colors[5],
          paddingBottom: "4rem",
          border: "none",
          borderRadius: 4,
          filter: "drop-shadow(4px 10px 10px #0008)",

          translate: showDialog ? "" : "-120%",
          opacity: showDialog ? 1 : 0,
          transition:
            "translate 1s, opacity 0.5s " + (showDialog ? "" : "0.5s"),
          //delay fade out
        }}>
        {
          <table
            style={{
              fontSize: "1.5rem",
              borderCollapse: "collapse",
            }}>
            <caption
              style={{
                fontSize: "2rem",
                marginTop: "0.5em",
                marginBottom: "1em",
              }}>
              <GiTrophyCup />
              Leaderboard
            </caption>
            <tbody>
              {scores.map((row, i) => (
                <tr
                  key={i}
                  style={{
                    borderBottom: "1px solid #fff8",
                  }}>
                  <td style={{fontSize: "0.45em"}}>{i + 1}</td>
                  <td style={{fontSize: "0.65em", padding: "0 0.5em"}}>
                    {row.flag}
                  </td>
                  <td
                    style={{
                      position: "relative",
                      maxWidth: "4ch",
                      width: "50%",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}>
                    {row.name}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: `linear-gradient(to left, ${bgcolors.gaps}, transparent 50%)`,
                        zIndex: 1,
                      }}></div>
                  </td>
                  <td style={{fontWeight: "bold"}}>{row.score}</td>
                  <td style={{fontSize: "0.45em", verticalAlign: "bottom"}}>
                    {relativeTimestamp(row.createdAt) || row.createdAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        }
        {/* <div className="htHate"></div> */}

        <button
          style={{
            ...iconButtonStyle,
            fontSize: "20px",
            width: "3.5em",
          }}
          onClick={() => setShowDialog(false)}>
          <BsArrowLeftSquareFill />
        </button>
      </dialog>
    </>
  );
}

const iconButtonStyle: React.CSSProperties = {
  position: "absolute",
  display: "grid",
  placeItems: "center",
  fontSize: "1rem",
  top: "0em",
  right: "0em",
  width: "2em",
  aspectRatio: 1,
  padding: 0,
  zIndex: 1,
  backgroundColor: "transparent",
};

const scoresSkeleton = Array(NUMBER_OF_SCORES_TO_SHOW).fill({
  flag: <div className="skeleton">　</div>,
  name: <div className="skeleton">　</div>,
  score: <div className="skeleton">　　　</div>,
  createdAt: <div className="skeleton">　　　　　　　　</div>,
});

function relativeTimestamp(timestampToCompare: Timestamp) {
  const second = 1;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const difference = Timestamp.now().seconds - timestampToCompare.seconds;
  if (isNaN(difference)) return "";

  if (difference < minute)
    return Math.floor(difference / second) + " sec(s) ago";
  if (difference < hour) return Math.floor(difference / minute) + " min(s) ago";
  if (difference < day) return Math.floor(difference / hour) + " hr(s) ago";
  else return Math.floor(difference / day) + " day(s) ago";
}

export default Leaderboard;
