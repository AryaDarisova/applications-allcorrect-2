import React from "react";
import Form from "./games_store_parser/Form";
import ReviewsInfo from "./games_store_parser/ReviewsInfo";

function App() {
    let countGooglePlayLanguages = 0;
    let countSteamLanguages = 0;
    let googlePlayReviews = require('google-play-scraper');

    const [gameStores, setGameStores] = React.useState([
        {id: 'googlePlay', name: 'Google Play', checked: false, infoReady: false, data: [],
            languageList: [
                {id: "arabic", name: "Arabic", languageCodes: ['AR']},
                {id: "chineseSimpl", name: "Chinese (Simpl)", languageCodes: ['ZH-CN']},
                {id: "chineseTrad", name: "Chinese (Trad)", languageCodes: ['ZH-TW', 'ZH-HK']},
                {id: "czech", name: "Czech", languageCodes: ['CS']},
                {id: "danish", name: "Danish", languageCodes: ['DA']},
                {id: "dutch", name: "Dutch", languageCodes: ['NL']},
                {id: "english", name: "English", languageCodes: ['EN']},
                {id: "finnish", name: "Finnish", languageCodes: ['FI']},
                {id: "french", name: "French", languageCodes: ['FR']},
                {id: "german", name: "German", languageCodes: ['DE']},
                {id: "greek", name: "Greek", languageCodes: ['EL']},
                {id: "hebrew", name: "Hebrew", languageCodes: ['HE']},
                {id: "hindi", name: "Hindi", languageCodes: ['HI']},
                {id: "icelandic", name: "Icelandic", languageCodes: ['IS']},
                {id: "indonesian", name: "Indonesian", languageCodes: ['ID']},
                {id: "italian", name: "Italian", languageCodes: ['IT']},
                {id: "japanese", name: "Japanese", languageCodes: ['JA']},
                {id: "korean", name: "Korean", languageCodes: ['KO']},
                {id: "malayan", name: "Malayan", languageCodes: ['MS']},
                {id: "norwegian", name: "Norwegian", languageCodes: ['NO']},
                {id: "polish", name: "Polish", languageCodes: ['PL']},
                {id: "portugueseBR", name: "Portuguese (BR)", languageCodes: ['PT-BR']},
                {id: "portuguesePT", name: "Portuguese (PT)", languageCodes: ['PT-PT']},
                {id: "russian", name: "Russian", languageCodes: ['RU']},
                {id: "spanish", name: "Spanish", languageCodes: ['ES']},
                {id: "swedish", name: "Swedish", languageCodes: ['SV']},
                {id: "thai", name: "Thai", languageCodes: ['TH']},
                {id: "turkish", name: "Turkish", languageCodes: ['TR']},
                {id: "vietnamese", name: "Vietnamese", languageCodes: ['VI']},
            ]},
        {id: 'appStore', name: 'App Store', checked: false, infoReady: false, data: [],
            countryList: [
                //Localization country codes
                {id: "arabic", name: "Arabic", countryCodes: ['EG', 'SA', 'AE']},
                {id: "chineseSimpl", name: "Chinese (Simpl)", countryCodes: ['CN', 'SG']},
                {id: "chineseTrad", name: "Chinese (Trad)", countryCodes: ['HK', 'TW']},
                {id: "danish", name: "Danish", countryCodes: ['DK']},
                {id: "dutch", name: "Dutch", countryCodes: ['NL']},
                {id: "english", name: "English", countryCodes: ['US', 'CA', 'AU', 'GB', 'IE', 'NZ']},
                {id: "finnish", name: "Finnish", countryCodes: ['FI']},
                {id: "french", name: "French", countryCodes: ['FR']},
                {id: "german", name: "German", countryCodes: ['DE']},
                {id: "greek", name: "Greek", countryCodes: ['GR']},
                {id: "hebrew", name: "Hebrew", countryCodes: ['IL']},
                {id: "hindi", name: "Hindi", countryCodes: ['IN']},
                {id: "icelandic", name: "Icelandic", countryCodes: ['IS']},
                {id: "indonesian", name: "Indonesian", countryCodes: ['ID']},
                {id: "italian", name: "Italian", countryCodes: ['IT']},
                {id: "japanese", name: "Japanese", countryCodes: ['JP']},
                {id: "korean", name: "Korean", countryCodes: ['KR']},
                {id: "malayan", name: "Malayan", countryCodes: ['MY']},
                {id: "norwegian", name: "Norwegian", countryCodes: ['NO']},
                {id: "polish", name: "Polish", countryCodes: ['PL']},
                {id: "portugueseBRZ", name: "Portuguese (BRZ)", countryCodes: ['BR']},
                {id: "portugueseEUR", name: "Portuguese (EUR)", countryCodes: ['PT']},
                {id: "russian", name: "Russian", countryCodes: ['RU', 'BY', 'KZ', 'KG']},
                {id: "spanish", name: "Spanish", countryCodes: ['ES']},
                {id: "swedish", name: "Swedish", countryCodes: ['SE']},
                {id: "thai", name: "Thai", countryCodes: ['TH']},
                {id: "turkish", name: "Turkish", countryCodes: ['TR']},
                {id: "vietnamese", name: "Vietnamese", countryCodes: ['VN']},
                {id: "czech", name: "Czech", countryCodes: ['CZ']},
            ]},
        {id: 'steam', name: 'Steam', checked: false, infoOnGet: false, infoReady: false, removeEnglish: false,
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
            ],  data: [], languageClearPercent: 0.10, languageClearPercentOnInput: 0.10},
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
                if (store.id === "googlePlay") {
                    countGooglePlayLanguages = 0;
                    setInfoReady("googlePlay", false);
                    setInfoOnGet("googlePlay", true);

                    /*if (store.removeEnglish) {
                        for (let i = 0; i < store.languageList.length; i++) {
                            if (store.languageList[i].id !== "english") {
                                steamRekursivelyGetReviews("*", appId, store.languageList[i].id, store.languageList.length - 1);
                            }
                        }
                    } else {*/
                        for (let i = 0; i < store.languageList.length; i++) {
                            for (let j = 0; j < store.languageList[i].languageCodes.length; j++) {
                                googlePlayRekursivelyGetReviews(null, appId, store.languageList[i].languageCodes[j],
                                    store.languageList.length, store.languageList[i].name);
                            }
                        }
                    /*}*/


                    /*
                    setInfoReady("googlePlay", false);
                    let googlePlayReviews = require('google-play-scraper');

                    for (let i = 0; i < store.languageList.length; i++) {
                        for (let j = 0; j < store.languageList[i].languageCodes.length; j++) {
                            googlePlayReviews.app({
                                appId: appId,
                                lang: store.languageList[i].languageCodes[j]
                            })
                                .then(
                                    result => {
                                        let dataItem = {
                                            "id": store.languageList[i].languageCodes[j],
                                            "name": store.languageList[i].name,
                                            "ratings": result.ratings,
                                            "histogram": [result.histogram[1], result.histogram[2], result.histogram[3],
                                                result.histogram[4], result.histogram[5]]
                                        }

                                        store.data.push(dataItem);

                                        if (i === (store.languageList.length - 1) &&
                                            j === (store.languageList[i].languageCodes.length - 1)) {
                                            setInfoReady("googlePlay", true);
                                        }
                                    }
                                )
                                .catch(
                                    error => {
                                        alert("Ошибка " + error + " во время получения данных языка " +
                                            store.languageList[i].name + " - " + store.languageList[i].languageCodes[j]);
                                    }
                                );
                        }
                    }*/
                } else if (store.id === "appStore") {
                    setInfoReady("appStore", false);
                    let appStoreReviews = require('app-store-scraper');

                    for (let i = 0; i < store.countryList.length; i++) {
                        for (let j = 0; j < store.countryList[i].countryCodes.length; j++) {
                            appStoreReviews.ratings({
                                id: appId,
                                country: store.countryList[i].countryCodes[j]
                            })
                                .then(
                                    result => {
                                        let dataItem = {
                                            "id": store.countryList[i].countryCodes[j],
                                            "name": store.countryList[i].name,
                                            "ratings": result.ratings,
                                            "histogram": [result.histogram[1], result.histogram[2], result.histogram[3],
                                                result.histogram[4], result.histogram[5]]
                                        }

                                        store.data.push(dataItem);

                                        if (i === (store.countryList.length - 1) &&
                                            j === (store.countryList[i].countryCodes.length - 1)) {
                                            setInfoReady("appStore", true);
                                            /*setGameStores(gameStores.map(store => {
                                                if (store.id === "appStore") {
                                                    store.infoReady = true;
                                                }

                                                return store
                                            }))*/
                                        }
                                    }
                                )
                                .catch(
                                    error => {
                                        alert("Ошибка " + error + " во время получения данных страны " +
                                            store.countryList[i].name + " - " + store.countryList[i].countryCodes[j]);
                                    }
                                );
                        }
                    }
                } else if (store.id === "steam") {
                    countSteamLanguages = 0;
                    setInfoReady("steam", false);
                    setInfoOnGet("steam", true);

                    if (store.removeEnglish) {
                        for (let i = 0; i < store.languageList.length; i++) {
                            if (store.languageList[i].id !== "english") {
                                steamRekursivelyGetReviews("*", appId, store.languageList[i].id, store.languageList.length - 1);
                            }
                        }
                    } else {
                        for (let i = 0; i < store.languageList.length; i++) {
                            steamRekursivelyGetReviews("*", appId, store.languageList[i].id, store.languageList.length);
                        }
                    }
                }
            }

            return store
        })
    }

    function setInfoReady(storeName, value) {
        setGameStores(gameStores.map(store => {
            if (store.id === storeName) {
                store.infoReady = value;

                if (!value) {
                    store.data = [];
                }
            }

            return store
        }))
    }

    function setInfoOnGet(storeName, value) {
        setGameStores(gameStores.map(store => {
            if (store.id === storeName) {
                store.infoOnGet = value;
            }

            return store
        }))
    }

    function setSteamLanguageClearPercent(value) {
        setGameStores(gameStores.map(store => {
            if (store.id === "steam") {
                // store.languageClearPercent = store.languageClearPercentOnInput;
                store.languageClearPercent = value;
                console.log(store.languageClearPercent);
            }

            return store
        }))
    }

    function setSteamLanguageClearPercentOnInput(e) {
        console.log("попали в изменение процентов on input");

        setGameStores(gameStores.map(store => {
            if (store.id === "steam") {
                store.languageClearPercentOnInput = e.target.elements.inputSteamClearLanguagesPercent.value;
            }

            return store
        }))
    }

    /*async */function googlePlayRekursivelyGetReviews(nextPaginationToken, appId, lang, langLength, langName) {
        googlePlayReviews.reviews({
            appId: appId,
            lang: lang,
            sort: googlePlayReviews.sort.NEWEST,
            paginate: true,
            nextPaginationToken: nextPaginationToken,
            /*headers: {
                "Origin": "http://localhost:3000",
                // "Origin": "https://applications-allcorrect-5742j.ondigitalocean.app",
                "Cache-Control": "no-cache"
            },*/
            // requestOptions: {proxy: 'https://google.com'}
        })
            .then(
                result => {
                    // console.log(lang, result);

                    setGameStores(gameStores.map(store => {
                        if (store.id === "googlePlay") {
                            for (let i = 0; i < result.data.length; i++) {
                                let dataItem = {
                                    "language": langName + " (" + lang + ")",
                                    "score": result.data[i].score
                                };

                                store.data.push(dataItem);
                            }
                        }

                        return store
                    }))

                    if (result.nextPaginationToken) {
                        googlePlayRekursivelyGetReviews(result.nextPaginationToken, appId, lang, langLength, langName);
                    } else {
                        if (countGooglePlayLanguages === (langLength - 1)) {
                            setInfoOnGet("googlePlay", false);
                            setInfoReady("googlePlay", true);
                        } else {
                            countGooglePlayLanguages++;
                        }
                    }
                }
            );


    }

    async function steamRekursivelyGetReviews(cursor, appId, lang, langLength) {
        /*let response = await fetch(
            `https://applications-allcorrect-5742j.ondigitalocean.app:8080/store.steampowered.com/appreviews/${appId}?json=1&filter=recent&purchase_type=all&num_per_page=100&cursor=` + cursor + `&language=${lang}`, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Access-Control-Allow-Origin': 'https://store.steampowered.com',
                    'Request-Method': 'GET',
                    'Origin': 'https://applications-allcorrect-5742j.ondigitalocean.app',
                    'Referer': 'https://applications-allcorrect-5742j.ondigitalocean.app',
                    'x-requested-with': 'fetch'
                }
            });*/

        let response = await fetch(
            `/appreviews/${appId}?json=1&filter=recent&purchase_type=all&num_per_page=100&cursor=` + cursor + `&language=${lang}`
        );

        if (response.ok) {
            let json = await response.json();
            // console.log(json);

            setGameStores(gameStores.map(store => {
                if (store.id === "steam") {
                    for (let i = 0; i < json.reviews.length; i++) {
                        let dataItem = {
                            "language": json.reviews[i].language,
                            "voted_up": json.reviews[i].voted_up
                        };

                        store.data.push(dataItem);
                    }
                }

                return store
            }))

            if (json.reviews.length === 100) {
                steamRekursivelyGetReviews(encodeURIComponent(json.cursor), appId, lang, langLength);
            } else {
                if (countSteamLanguages === (langLength - 1)) {
                    setInfoOnGet("steam", false);
                    setInfoReady("steam", true);
                } else {
                    countSteamLanguages++;
                }
            }
        } else {
            alert("Ошибка HTTP: " + response.status + " во время получения данных языка " + lang);
        }
    }

    return (
        <div className="wrapper">
            <Form gameStores={gameStores} storeCLick={storeCLick} getReviewsInfo={getReviewsInfo}
                  steamRemoveEnglish={steamRemoveEnglish} /*googlePlayFoundByFilter={googlePlayFoundByFilter}*/ />
            <br />
            <ReviewsInfo gameStores={gameStores} setSteamLanguageClearPercent={setSteamLanguageClearPercent}
                         setSteamLanguageClearPercentOnInput={setSteamLanguageClearPercentOnInput}/>
        </div>
    );
}

export default App;
