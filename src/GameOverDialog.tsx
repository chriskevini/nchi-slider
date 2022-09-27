import {useState} from "react";
import {Game} from "./game";
import {BsFillEyeFill} from "react-icons/bs";
import {useLocalStorage} from "./useLocalStorage";
import {submitScore} from "./firebase";

interface GameOverDialogProps {
  game: Game;
  gapWidth: number;
  onPlayAgain: () => void;
}
export function GameOverDialog({
  game,
  gapWidth,
  onPlayAgain,
}: GameOverDialogProps) {
  const [hidden, setHidden] = useState(false);
  const [bestScore] = useLocalStorage("bestScore", 0);
  const score = game.points.reduce((acc, curr) => acc + curr, 0);
  const newHighScore = score === bestScore;
  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: -gapWidth * 1.5,
          display: "grid",
          placeItems: "center",
          backgroundColor: "#faf8efa8",
          backdropFilter: `blur(${gapWidth * 0.4}px)`,
          animation: "fadeIn 3s ease-out",
          opacity: hidden ? 0 : 1,
          transition: "opacity 1s",
        }}>
        {newHighScore && <HighScoreView {...{game, gapWidth, score}} />}
        <GameOverView {...{gapWidth, onPlayAgain}} />
      </div>
      <DialogToggler {...{setHidden, hidden}} />
    </>
  );
}

interface DialogTogglerProps {
  hidden: boolean;
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
}
function DialogToggler({setHidden, hidden}: DialogTogglerProps) {
  return (
    <button
      onClick={() => setHidden((prev) => !prev)}
      style={{
        position: "absolute",
        display: "grid",
        placeItems: "center",
        fontSize: "1.5rem",
        bottom: "0em",
        right: "0em",
        width: "2em",
        height: "2em",
        padding: 0,
        color: "#776e65",
        backgroundColor: "transparent",
        opacity: hidden ? 0.5 : 1,
        transition: "opacity 1s",
      }}>
      <BsFillEyeFill />
    </button>
  );
}

const FLAGS =
  "🇺🇳,🇺🇸,🇨🇦,🇯🇵,🇨🇳,🇮🇳,🇦🇫,🇦🇽,🇦🇱,🇩🇿,🇦🇸,🇦🇩,🇦🇴,🇦🇮,🇦🇶,🇦🇬,🇦🇷,🇦🇲,🇦🇼,🇦🇺,🇦🇹,🇦🇿,🇧🇸,🇧🇭,🇧🇩,🇧🇧,🇧🇾,🇧🇪,🇧🇿,🇧🇯,🇧🇲,🇧🇹,🇧🇴,🇧🇦,🇧🇼,🇧🇷,🇮🇴,🇻🇬,🇧🇳,🇧🇬,🇧🇫,🇧🇮,🇰🇭,🇨🇲,🇮🇨,🇨🇻,🇧🇶,🇰🇾,🇨🇫,🇹🇩,🇨🇱,🇨🇽,🇨🇨,🇨🇴,🇰🇲,🇨🇬,🇨🇩,🇨🇰,🇨🇷,🇨🇮,🇭🇷,🇨🇺,🇨🇼,🇨🇾,🇨🇿,🇩🇰,🇩🇯,🇩🇲,🇩🇴,🇪🇨,🇪🇬,🇸🇻,🇬🇶,🇪🇷,🇪🇪,🇪🇹,🇪🇺,🇫🇰,🇫🇴,🇫🇯,🇫🇮,🇫🇷,🇬🇫,🇵🇫,🇹🇫,🇬🇦,🇬🇲,🇬🇪,🇩🇪,🇬🇭,🇬🇮,🇬🇷,🇬🇱,🇬🇩,🇬🇵,🇬🇺,🇬🇹,🇬🇬,🇬🇳,🇬🇼,🇬🇾,🇭🇹,🇭🇳,🇭🇰,🇭🇺,🇮🇸,🇮🇩,🇮🇷,🇮🇶,🇮🇪,🇮🇲,🇮🇱,🇮🇹,🇯🇲,🎌,🇯🇪,🇯🇴,🇰🇿,🇰🇪,🇰🇮,🇽🇰,🇰🇼,🇰🇬,🇱🇦,🇱🇻,🇱🇧,🇱🇸,🇱🇷,🇱🇾,🇱🇮,🇱🇹,🇱🇺,🇲🇴,🇲🇰,🇲🇬,🇲🇼,🇲🇾,🇲🇻,🇲🇱,🇲🇹,🇲🇭,🇲🇶,🇲🇷,🇲🇺,🇾🇹,🇲🇽,🇫🇲,🇲🇩,🇲🇨,🇲🇳,🇲🇪,🇲🇸,🇲🇦,🇲🇿,🇲🇲,🇳🇦,🇳🇷,🇳🇵,🇳🇱,🇳🇨,🇳🇿,🇳🇮,🇳🇪,🇳🇬,🇳🇺,🇳🇫,🇰🇵,🇲🇵,🇳🇴,🇴🇲,🇵🇰,🇵🇼,🇵🇸,🇵🇦,🇵🇬,🇵🇾,🇵🇪,🇵🇭,🇵🇳,🇵🇱,🇵🇹,🇵🇷,🇶🇦,🇷🇪,🇷🇴,🇷🇺,🇷🇼,🇼🇸,🇸🇲,🇸🇦,🇸🇳,🇷🇸,🇸🇨,🇸🇱,🇸🇬,🇸🇽,🇸🇰,🇸🇮,🇬🇸,🇸🇧,🇸🇴,🇿🇦,🇰🇷,🇸🇸,🇪🇸,🇱🇰,🇧🇱,🇸🇭,🇰🇳,🇱🇨,🇵🇲,🇻🇨,🇸🇩,🇸🇷,🇸🇿,🇸🇪,🇨🇭,🇸🇾,🇹🇼,🇹🇯,🇹🇿,🇹🇭,🇹🇱,🇹🇬,🇹🇰,🇹🇴,🇹🇹,🇹🇳,🇹🇷,🇹🇲,🇹🇨,🇹🇻,🇻🇮,🇺🇬,🇺🇦,🇦🇪,🇬🇧,🏴󠁧󠁢󠁥󠁮󠁧󠁿,🏴󠁧󠁢󠁳󠁣󠁴󠁿,🏴󠁧󠁢󠁷󠁬󠁳󠁿,🇺🇾,🇺🇿,🇻🇺,🇻🇦,🇻🇪,🇻🇳,🇼🇫,🇪🇭,🇾🇪,🇿🇲,🇿🇼";

interface HighScoreViewProps {
  game: Game;
  score: number;
  gapWidth: number;
}
function HighScoreView({game, gapWidth, score}: HighScoreViewProps) {
  const [name, setName] = useLocalStorage("name", "");
  const [flag, setFlag] = useLocalStorage("flag", "🇺🇳");
  const [waiting, setWaiting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const scoreInfo = {
      name: name,
      flag: flag,
      score: score,
      points: game.points,
      cells: game.cells.filter((c) => c),
    };
    setWaiting(true);
    submitScore(scoreInfo)
      .then(() => setSubmitted(true))
      .catch((error) => console.log(error))
      .finally(() => setWaiting(false));
  };
  return (
    <div
      style={{
        position: "absolute",
        top: gapWidth * 6,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        textAlign: "center",
        fontSize: Math.max(gapWidth * 2, 16),
      }}>
      <span
        style={{
          fontSize: gapWidth * 4,
          fontWeight: "bold",
          width: "100%",
        }}>
        New High Score!
      </span>

      {!waiting && !submitted && (
        <form
          onSubmit={handleSubmit}
          style={{display: "flex", gap: gapWidth}}>
          <select
            name="flag"
            id="flag"
            onChange={(e) => setFlag(e.target.value)}
            value={flag}
            style={{
              borderRadius: "4px",
              border: "1px solid #776e65",
              padding: "0em 0.25em",
              backgroundColor: "white",
            }}>
            {FLAGS.split(",").map((flag) => (
              <option
                key={flag}
                value={flag}>
                {flag}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={10}
            required
            style={{
              borderRadius: "4px",
              maxWidth: gapWidth * 40,
              width: "15ch",
              border: "1px solid #776e65",
              padding: "0em 0.5em",
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#f67c5f",
              border: "none",
            }}>
            <span>Submit</span>
          </button>
        </form>
      )}
      {waiting && (
        <span
          style={{
            animation: "breathe 1s infinite",
          }}>
          Waiting for server...
        </span>
      )}
      {submitted && (
        <span
          style={{
            animation: "overshoot 1s",
          }}>
          Score submitted!
        </span>
      )}
    </div>
  );
}

interface GameOverViewProps {
  gapWidth: number;
  onPlayAgain: () => void;
}
function GameOverView({gapWidth, onPlayAgain}: GameOverViewProps) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        textAlign: "center",
        translate: "0 0.7em",
      }}>
      <span
        style={{
          fontSize: gapWidth * 6,
          // fontWeight: "bold",
          width: "100%",
        }}>
        GAME OVER
      </span>
      <button
        onClick={onPlayAgain}
        style={{
          fontSize: gapWidth * 2,
        }}>
        <span>Play Again</span>
      </button>
    </div>
  );
}
