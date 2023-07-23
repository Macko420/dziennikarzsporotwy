import style from "./Title.module.css";

function Title(props) {
  return <div className={`${style.all}`}>{props.title}</div>;
}

export default Title;
