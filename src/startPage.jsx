import "./StartPage.css";

export default function StartPage(props) {
  return (
    <div className="StartPage">
      <h1 className="StartPage-title">Quizzical</h1>
      <button className="btn StartPage-btn" onClick={props.startQuiz}>
        Start quiz
      </button>
    </div>
  );
}
