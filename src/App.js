import React from "react";
import Form from "./games_store_parser/Form";
import ReviewsInfo from "./games_store_parser/ReviewsInfo";

function App() {
    const [gameStores, setGameStores] = React.useState([
        {id: 'googlePlay', name: 'Google Play', checked: false, infoReady: false, data: [],
            foundByCountry: true, countryList: [
                {id: "us", name: "United States of America"},
                {id: "ru", name: "Russian Federation"},
                {id: "se", name: "Sweden"},
                {id: "br", name: "Brazil"},
            ], foundByLanguage: false, languageList: [
                {id: "en", name: "английский"},
                {id: "ar", name: "арабский"},
                {id: "vi", name: "вьетнамский"},
                {id: "el", name: "греческий (новогреческий)"},
                {id: "da", name: "датский"},
                {id: "ru", name: "русский"},
            ]},
        {id: 'appStore', name: 'App Store', checked: false, infoReady: false, data: [],
            countryList: [
                {id: "us", name: "United States of America"},
                {id: "ru", name: "Russian Federation"},
                {id: "se", name: "Sweden"},
                {id: "br", name: "Brazil"},
            ]},
        {id: 'steam', name: 'Steam', checked: false, infoReady: false, removeEnglish: false,
            languageList: [
                {id: "arabic", webId: "ar", name: "арабский"},
                {id: "brazilian", webId: "pt-BR", name: "бразильский португальский"},
                {id: "bulgarian", webId: "bg", name: "болгарский"},
                {id: "czech", webId: "cs", name: "чешский"},
                {id: "danish", webId: "da", name: "датский"},
                {id: "dutch", webId: "nl", name: "нидерландский"},
                {id: "english", webId: "en", name: "английский"},
                {id: "finnish", webId: "fi", name: "финский"},
                {id: "french", webId: "fr", name: "французский"},
                {id: "german", webId: "de", name: "немецкий"},
                {id: "greek", webId: "el", name: "греческий"},
                {id: "hungarian", webId: "hu", name: "венгерский"},
                {id: "italian", webId: "it", name: "итальянский"},
                {id: "japanese", webId: "ja", name: "японский"},
                {id: "koreana", webId: "ko", name: "корейский"},
                {id: "latam", webId: "es-419", name: "испанский (Латинская Америка)"},
                {id: "norwegian", webId: "no", name: "норвежский"},
                {id: "polish", webId: "pl", name: "польский"},
                {id: "portuguese", webId: "pt", name: "португальский"},
                {id: "romanian", webId: "ro", name: "румынский"},
                {id: "russian", webId: "ru", name: "русский"},
                {id: "schinese", webId: "zh-CN", name: "китайский (упрощённый)"},
                {id: "spanish", webId: "es", name: "испанский (Испания)"},
                {id: "swedish", webId: "sv", name: "шведский"},
                {id: "tchinese", webId: "zh-TW", name: "китайский (традиционный)"},
                {id: "thai", webId: "th", name: "тайский"},
                {id: "turkish", webId: "tr", name: "турецкий"},
                {id: "ukrainian", webId: "uk", name: "украинский"},
                {id: "vietnamese", webId: "vn", name: "вьетнамский"}
            ],  data: []},
    ])

    function storeCLick(id) {
        setGameStores(gameStores.map(store => {
            if (store.id === id) {
                store.checked = !store.checked
            } else {
                store.checked = false
            }

            return store
        }))
    }

    function googlePlayFoundByFilter(filter) {
        setGameStores(gameStores.map(store => {
            if (store.id === "googlePlay") {
                store.foundByLanguage = !store.foundByLanguage
                store.foundByCountry = !store.foundByCountry

                console.log("store.foundByLanguage", store.foundByLanguage, "store.foundByCountry", store.foundByCountry)
            }

            return store
        }))
    }

    function steamRemoveEnglish() {
        setGameStores(gameStores.map(store => {
            if (store.id === "steam") {
                store.removeEnglish = !store.removeEnglish
            }

            return store
        }))
    }

    function getReviewsInfo(e) {
        e.preventDefault();
        let appId = e.target.elements.inputAppId.value;

        /*setGameStores(*/gameStores.map(store => {
            if (store.checked) {
                store.infoReady = false;

                if (store.id === "googlePlay") {
                    let googlePlayReviews = require('google-play-scraper');

                    if (store.foundByLanguage) {
                        for (let i = 0; i < store.languageList.length; i++) {
                            googlePlayReviews.app({
                                appId: 'com.google.android.apps.translate'
                            })
                                .then(
                                    result => {
                                        let dataItem = {
                                            "id": store.languageList[i].id,
                                            "name": store.languageList[i].name,
                                            "ratings": result.ratings,
                                            "histogram": [result.histogram[1], result.histogram[2], result.histogram[3],
                                                result.histogram[4], result.histogram[5]]
                                        }

                                        store.data.push(dataItem);

                                        console.log(store.data);

                                        if (i === store.languageList.length - 1) {
                                            setGameStores(gameStores.map(store => {
                                                if (store.id === "googlePlay") {
                                                    store.infoReady = true;
                                                }

                                                return store
                                            }))
                                        }
                                    }
                                )
                                .catch(
                                    error => {
                                        alert("Ошибка " + error + " во время получения данных страны " + store.countryList[i].name);
                                    }
                                );
                        }
                    } else if (store.foundByCountry) {
                        for (let i = 0; i < store.countryList.length; i++) {
                            googlePlayReviews.app({
                                appId: 'com.google.android.apps.translate'
                            })
                                .then(
                                    result => {
                                        let dataItem = {
                                            "id": store.countryList[i].id,
                                            "name": store.countryList[i].name,
                                            "ratings": result.ratings,
                                            "histogram": [result.histogram[1], result.histogram[2], result.histogram[3],
                                                result.histogram[4], result.histogram[5]]
                                        }

                                        store.data.push(dataItem);

                                        console.log(store.data);

                                        if (i === store.countryList.length - 1) {
                                            setGameStores(gameStores.map(store => {
                                                if (store.id === "googlePlay") {
                                                    store.infoReady = true;
                                                }

                                                return store
                                            }))
                                        }
                                    }
                                )
                                .catch(
                                    error => {
                                        alert("Ошибка " + error + " во время получения данных страны " + store.countryList[i].name);
                                    }
                                );
                        }
                    }
                } else if (store.id === "appStore") {
                    let appStoreReviews = require('app-store-scraper');

                    for (let i = 0; i < store.countryList.length; i++) {
                        appStoreReviews.ratings({
                            id: appId,
                            country: store.countryList[i].id
                        })
                            .then(
                                result => {
                                    let dataItem = {
                                        "id": store.countryList[i].id,
                                        "name": store.countryList[i].name,
                                        "ratings": result.ratings,
                                        "histogram": [result.histogram[1], result.histogram[2], result.histogram[3],
                                            result.histogram[4], result.histogram[5]]
                                    }

                                    store.data.push(dataItem);

                                    console.log(store.data);

                                    if (i === store.countryList.length - 1) {
                                        setGameStores(gameStores.map(store => {
                                            if (store.id === "appStore") {
                                                store.infoReady = true;
                                            }

                                            return store
                                        }))
                                    }
                                }
                            )
                            .catch(
                                error => {
                                    alert("Ошибка " + error + " во время получения данных страны " + store.countryList[i].name);
                                }
                            );
                    }
                } else if (store.id === "steam") {
                    // console.log(appId);
                    if (store.removeEnglish) {
                        for (let i = 0; i < store.languageList.length; i++) {
                            if (store.languageList[i].id !== "english") {
                                steamRekursivelyGetReviews("*", appId, store.languageList[i].id);
                            }
                        }
                    } else {
                        for (let i = 0; i < store.languageList.length; i++) {
                            steamRekursivelyGetReviews("*", appId, store.languageList[i].id);
                        }
                    }
                }
            }

            return store
        })/*)*/
    }

    async function steamRekursivelyGetReviews(cursor, appId, lang) {
        let response = await fetch(
            `https://store.steampowered.com/appreviews/${appId}?json=1&filter=recent&purchase_type=all&num_per_page=100&cursor=` + cursor + `&language=${lang}`, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Access-Control-Allow-Origin': 'http://localhost:3000/'
                }
            });

        if (response.ok) {
            let json = await response.json();
            console.log(json);

            setGameStores(gameStores.map(store => {
                if (store.id === "steam") {
                    for (let i = 0; i < json.reviews.length; i++) {
                        let dataItem = {
                            "language": json.reviews[i].language,
                            "voted_up": json.reviews[i].voted_up
                        };

                        // store.infoReady = true;
                        store.data.push(dataItem);
                    }
                }

                return store
            }))

            if (json.reviews.length === 100) {
                steamRekursivelyGetReviews(encodeURIComponent(json.cursor), appId, lang);
            } else {
                setGameStores(gameStores.map(store => {
                    if (store.id === "steam") {
                        store.infoReady = true;
                    }

                    return store
                }))

                // console.log(gameStores);
            }
        } else {
            alert("Ошибка HTTP: " + response.status + " во время получения данных языка " + lang);
        }
    }

    return (
        <div className="wrapper">
            <Form gameStores={gameStores} storeCLick={storeCLick} getReviewsInfo={getReviewsInfo}
                  steamRemoveEnglish={steamRemoveEnglish} googlePlayFoundByFilter={googlePlayFoundByFilter} />
            <br />
            <ReviewsInfo gameStores={gameStores}/>
        </div>
    );
}

export default App;
