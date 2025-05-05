import { Link } from "react-router-dom";

export default function Header() {
    return(
        <div className="header">
            <img className="logo-head" src="./public/logo.svg" alt="" />
            <ul className="cont">
                <Link to="/Events">Главная</Link>
                <Link to="/Favorite">Избранное</Link>
                <Link to="/Category">Категории</Link>
                {/* <Link to="/statements">Отчёты</Link> */}
                <Link to="/Settings">Настройки</Link>
            </ul>  
        </div>
    )
}