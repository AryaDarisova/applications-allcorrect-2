import React from "react";
import AppStoreDiagram from "./AppStoreDiagram";
import AppStoreBarDiagram from "./AppStoreBarDiagram";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import GooglePlayDiagram from "./GooglePlayDiagram";
import GooglePlayBarDiagram from "./GooglePlayBarDiagram";
import SteamStoreBarDiagram from "./SteamStoreBarDiagram";

const styles = {
    blockCenter: {
        textAlign: 'center'
    },

    blockRight: {
        textAlign: 'right'
    },

    blockView: {
        border: '1px solid #ccc',
        padding: '.5rem 1rem',
        borderRadius: '5px',
        margin: '.5rem'
    },

    columnBlock: {
        width: '33%',
        display: 'inline-block'
    },

    inputPercent: {
        width: '50px',
    },

    inputCheckbox: {
        marginLeft: '0px',
    }
}

export default function ReviewsInfo(props) {
    const [storesAddFilter, setStoresAddFilter] = React.useState([
        {id: 'googlePlay', clearLanguages: true, languageClearPercent: 0.10, switchChartBarToPie: false},
        {id: 'appStore', clearLanguages: true, languageClearPercent: 0.10, switchChartBarToPie: false},
        {id: 'steam', clearLanguages: true, languageClearPercent: 0.10}
    ])

    function clearLanguages(storeId) {
        setStoresAddFilter(storesAddFilter.map(store => {
            if (store.id === storeId) {
                store.clearLanguages = !store.clearLanguages
            }

            return store
        }))
    }

    function setClearLanguagesPercent(storeId, percent) {
        setStoresAddFilter(storesAddFilter.map(store => {
            if (store.id === storeId) {
                store.languageClearPercent = percent
            }

            return store
        }))
    }

    function switchChartBarToPie(storeId) {
        setStoresAddFilter(storesAddFilter.map(store => {
            if (store.id === storeId) {
                store.switchChartBarToPie = !store.switchChartBarToPie
            }

            return store
        }))
    }

    return(
        <div>
            {
                props.gameStores.map(store => {
                  if (store.checked) {
                      if (store.id === "googlePlay") {
                          if (store.infoReady) {
                              let values = new Map();
                              let allReviewsCount = 0;

                              store.data.map(item => {
                                  let value = new Map();

                                  if (!values.has(item.language)) {
                                      let histogram = [0, 0, 0, 0, 0];

                                      if (item.score === 1) {
                                          histogram[0]++;
                                      } else if (item.score === 2) {
                                          histogram[1]++;
                                      } else if (item.score === 3) {
                                          histogram[2]++;
                                      } else if (item.score === 4) {
                                          histogram[3]++;
                                      } else if (item.score === 5) {
                                          histogram[4]++;
                                      }

                                      allReviewsCount++;

                                      value.set("name", item.language);
                                      value.set("histogram", histogram);
                                      value.set("all", 1);

                                      values.set(item.language, value);
                                  } else {
                                      let histogram = values.get(item.language).get("histogram");
                                      let all = values.get(item.language).get("all");

                                      if (item.score === 1) {
                                          histogram[0]++;
                                      } else if (item.score === 2) {
                                          histogram[1]++;
                                      } else if (item.score === 3) {
                                          histogram[2]++;
                                      } else if (item.score === 4) {
                                          histogram[3]++;
                                      } else if (item.score === 5) {
                                          histogram[4]++;
                                      }

                                      all++;
                                      allReviewsCount++;

                                      value.set("name", item.language);
                                      value.set("histogram", histogram);
                                      value.set("all", all);

                                      values.set(item.language, value);
                                  }

                                  return item
                              })

                              let dataArray = [];

                              values.forEach(function (value, key) {
                                  dataArray.push({
                                      name: key,
                                      histogram: value.get("histogram"),
                                      all: value.get("all"),
                                  });
                              })

                              dataArray.sort((a, b) => b.all - a.all);

                              return(
                                  <div key={store.id}>
                                      <div className="row">
                                          <div className="col-sm-8">

                                          </div>
                                          <div className="col-sm-4">
                                              <div className="form-check" style={styles.blockView}>
                                                  <div className="row">
                                                      <div className="col-sm-2 form-check">
                                                          <input type="checkbox" className="form-check-input"
                                                                 id="googlePlayClearLanguages"
                                                                 name="googlePlayClearLanguages"
                                                                 checked={storesAddFilter[0].switchChartBarToPie}
                                                                 onChange={() => switchChartBarToPie("googlePlay")} style={styles.inputCheckbox}/>
                                                      </div>
                                                      <div className="col-sm-10">
                                                          <label className="form-check-label">Переключить графики на вид "Pie"</label>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      <br />
                                      <div className="row">
                                          <div className="col-sm-12">
                                              {
                                                  storesAddFilter[0].switchChartBarToPie ? (
                                                      dataArray.map(dataItem => {
                                                          return (
                                                              <div key={dataItem.name} style={styles.columnBlock}>
                                                                  <GooglePlayDiagram data={dataItem}/>
                                                              </div>
                                                          )
                                                      })
                                                  ) : (
                                                      <div key={store.id}>
                                                          <GooglePlayBarDiagram clearLanguages={storesAddFilter[0].clearLanguages}
                                                                              languageClearPercent={storesAddFilter[0].languageClearPercent}
                                                                              data={values} allReviewsCount={allReviewsCount}
                                                                              clearLanguagesFunc={clearLanguages}
                                                                              setClearLanguagesPercent={setClearLanguagesPercent}/>
                                                      </div>
                                                  )
                                              }
                                          </div>
                                      </div>
                                  </div>
                              )
                          } else if (store.infoOnGet) {
                              return (
                                  <div key={store.id}>
                                      <div className="row">
                                          <div className="col-sm-4">

                                          </div>
                                          <div className="col-sm-4" style={styles.blockView}>
                                              <div style={styles.blockCenter}>
                                                  Получено {store.reviewsCount} отзывов <FontAwesomeIcon icon={faSpinner} spin/>
                                              </div>
                                          </div>
                                          <div className="col-sm-4">

                                          </div>
                                      </div>
                                  </div>
                              )
                          }
                      } else if (store.id === "appStore") {
                          if (store.infoReady && store.data.length) {
                              let values = new Map();
                              let allReviewsCount = 0;

                              store.data.sort((a, b) => b.ratings - a.ratings);

                              store.data.map(item => {
                                  let value = new Map();

                                  value.set("name", item.name + " (" + item.id + ")");
                                  value.set("histogram", item.histogram);
                                  value.set("all", item.ratings);

                                  allReviewsCount += item.ratings;

                                  values.set(item.name + " (" + item.id + ")", value);

                                  return item
                              })

                              return(
                                  <div key={store.id}>
                                      <div className="row">
                                          <div className="col-sm-8">

                                          </div>
                                          <div className="col-sm-4">
                                              <div className="form-check" style={styles.blockView}>
                                                  <div className="row">
                                                      <div className="col-sm-2 form-check">
                                                          <input type="checkbox" className="form-check-input"
                                                                 id="appStoreClearLanguages"
                                                                 name="appStoreClearLanguages"
                                                                 checked={storesAddFilter[1].switchChartBarToPie}
                                                                 onChange={() => switchChartBarToPie("appStore")} style={styles.inputCheckbox}/>
                                                      </div>
                                                      <div className="col-sm-10">
                                                          <label className="form-check-label">Переключить графики на вид "Pie"</label>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      <br />
                                      <div className="row">
                                          <div className="col-sm-12">
                                              {
                                                  storesAddFilter[1].switchChartBarToPie ? (
                                                      store.data.map(dataItem => {
                                                          return (
                                                              <div key={dataItem.id} style={styles.columnBlock}>
                                                                  <AppStoreDiagram data={dataItem}/>
                                                              </div>
                                                          )
                                                      })
                                                  ) : (
                                                      <div key={store.id}>
                                                          <AppStoreBarDiagram clearLanguages={storesAddFilter[1].clearLanguages}
                                                                              languageClearPercent={storesAddFilter[1].languageClearPercent}
                                                                              data={values} allReviewsCount={allReviewsCount}
                                                                              clearLanguagesFunc={clearLanguages}
                                                                              setClearLanguagesPercent={setClearLanguagesPercent}/>
                                                      </div>
                                                  )
                                              }
                                          </div>
                                      </div>
                                  </div>
                              )
                          }
                      } else if (store.id === "steam") {
                          if (store.infoReady) {
                              let values = new Map();
                              let allReviewsCount = 0;

                              store.data.map(item => {
                                  let value = new Map();

                                  if (!values.has(item.language)) {
                                      let positive = 0;
                                      let negative = 0;

                                      if (item.voted_up) {
                                          positive++;
                                      } else {
                                          negative++;
                                      }

                                      allReviewsCount++;

                                      value.set("name", item.language);
                                      value.set("positive", positive);
                                      value.set("negative", negative);
                                      value.set("all", 1);

                                      values.set(item.language, value);
                                  } else {
                                      let positive = values.get(item.language).get("positive");
                                      let negative = values.get(item.language).get("negative");
                                      let all = values.get(item.language).get("all");

                                      if (item.voted_up) {
                                          positive++;
                                      } else {
                                          negative++;
                                      }

                                      all++;
                                      allReviewsCount++;

                                      value.set("name", item.language);
                                      value.set("positive", positive);
                                      value.set("negative", negative);
                                      value.set("all", all);

                                      values.set(item.language, value);
                                  }

                                  return item
                              })

                              return(
                                  <div key={store.id}>
                                      <br />
                                      <SteamStoreBarDiagram appName={store.appName}
                                                            clearLanguages={storesAddFilter[2].clearLanguages}
                                                            languageClearPercent={storesAddFilter[2].languageClearPercent}
                                                            data={values} allReviewsCount={allReviewsCount}
                                                            clearLanguagesFunc={clearLanguages}
                                                            setClearLanguagesPercent={setClearLanguagesPercent}/>
                                  </div>
                              )
                          } else if (store.infoOnGet) {
                              return (
                                  <div key={store.id}>
                                      <div className="row">
                                          <div className="col-sm-4">

                                          </div>
                                          <div className="col-sm-4" style={styles.blockView}>
                                              <div style={styles.blockCenter}>
                                                  Получено {store.reviewsCount} отзывов <FontAwesomeIcon icon={faSpinner} spin/>
                                              </div>
                                          </div>
                                          <div className="col-sm-4">

                                          </div>
                                      </div>
                                  </div>
                              )
                          }
                      }
                  }
                })
            }
        </div>
    )
}