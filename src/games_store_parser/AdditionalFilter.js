export default function AdditionalFilter({checked, steamRemoveEnglish/*, googlePlayFoundByFilter*/}) {
    return(
        <div>
            {
                checked.map(store => {
                    if (store.checked) {
                        if (store.id === "appStore") {
                            /*return(
                                <div key={store.id}>There is {store.name}</div>
                            )*/
                        } else if (store.id === "googlePlay") {
                            /*return (
                                <div key={store.id}>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input"
                                                       id="googlePlayFoundByCountry" name="googlePlayFoundByCountry"
                                                       checked={store.foundByCountry} onChange={() => googlePlayFoundByFilter(store.foundByCountry)}/>
                                                <label className="form-check-label" htmlFor="googlePlayFoundByCountry">Искать по странам</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input"
                                                       id="googlePlayFoundByLanguage" name="googlePlayFoundByLanguage"
                                                       checked={store.foundByLanguage} onChange={() => googlePlayFoundByFilter(store.foundByLanguage)}/>
                                                <label className="form-check-label" htmlFor="googlePlayFoundByLanguage">Искать по языкам</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )*/
                        } else if (store.id === "steam") {
                            return (
                                <div key={store.id}>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <label htmlFor="inputAppName" className="form-label"><strong>Название приложения/игры</strong></label>
                                            <input className="form-control" id="inputAppName" name="inputAppName"
                                                   placeholder=""/>
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input"
                                                       id="steamRemoveEnglishLanguage" name="steamRemoveEnglishLanguage"
                                                       checked={store.removeEnglish} onChange={() => steamRemoveEnglish()}/>
                                                <label className="form-check-label" htmlFor="steamLanguagesAll">Исключить английский</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    }
                })
            }
        </div>
    )
}