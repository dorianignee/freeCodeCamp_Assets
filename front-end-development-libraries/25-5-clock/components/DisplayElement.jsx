export default function DisplayElement({ text, numbersBackground, numbers, buttonAText, buttonBText, buttonAOnClick, buttonBOnClick }) {
  return (
  <div className="stack">
    <div className="display">
      <div className="displayText">
        <span className="backgroundText"></span>
        <span>{text}</span>
      </div>
      <div className="displayText large">
        <span className="backgroundText">{numbersBackground}</span>
        <span>{numbers}</span>
      </div>
    </div>
    <div className="stack horizontal">
      <button onClick={buttonAOnClick}>{buttonAText}</button>
      <button onClick={buttonBOnClick}>{buttonBText}</button>
    </div>
  </div>
  );
}