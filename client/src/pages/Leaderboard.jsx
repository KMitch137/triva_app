import { GET_HIGHSCORES } from "../utils/queries";
import { useQuery } from "@apollo/client";

export default function Leaderboard() {
  const { data, loading, error } = useQuery(GET_HIGHSCORES);
  const highscores = data?.highscores || [];

  if (loading) return <h2>Loading...</h2>;

  const playAgain = () => {
    window.location.replace("/");
  };

  return (
    <>
      <h1>Leaderboard</h1>

      <div className="hs tctr">
        <h4>Username</h4>
        <h4>Score</h4>
        <h4>Category</h4>
      </div>

      {highscores.length > 0 ? (
        highscores.map((score, i) => (
          <div className="hsp tctr" key={i}>
            <h4>{score.userName}</h4>
            <h4>{score.score}</h4>
            <h4>{score.category}</h4>
          </div>
        ))
      ) : (
        <h3 className="tctr">No Scores Yet</h3>
      )}
      {error && <div>Error {error.message}</div>}

      <button className="btn" onClick={playAgain}>
        Play Again
      </button>
    </>
  );
}
