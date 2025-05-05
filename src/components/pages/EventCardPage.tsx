import Header from "../Header"

export default function EventsCardPage() {
    return (
        <>
            <Header></Header>

            <div className="event-text">
                <h1 className="title">Текст конкретной карточки</h1>
                <img src="./public/Starnonactive.svg" alt="" />
            </div>

            <div className="EventCardPage-text">
                <p className="description">
                    Что-то там
                </p>
                <p className="event_date">
                    
                </p>
                <p className="location">
                    
                </p>
                <button className="button-cardpage">Редактировать</button>
            </div>
        </>
    )
}