import Form from "./Form";
import ReviewsInfo from "./ReviewsInfo";

export default function GameStoreParser(props) {
    return(
        <div className="wrapper">
            <Form gameStores={props.gameStores} storeCLick={props.storeCLick} getReviewsInfo={props.getReviewsInfo}
                  steamRemoveEnglish={props.steamRemoveEnglish} />
            <br />
            <ReviewsInfo gameStores={props.gameStores} setSteamLanguageClearPercent={props.setSteamLanguageClearPercent}
                         setSteamLanguageClearPercentOnInput={props.setSteamLanguageClearPercentOnInput}/>
        </div>
    )
}