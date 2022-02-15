import React, {useState} from "react";
import {Tab, Tabs} from "react-bootstrap";
import Charter from "./Charter";
import ProjectBible from "./ProjectBible";
import ProjectBibleActions from "./ProjectBibleActions";
import Modal from "./Modal";

export default function ManagedQualityOnProjectView(props) {
    const [key, setKey] = useState('project_bible');
    const [modalActive, setModalActive] = useState(false);
    const [modalInfo, setModalInfo] = useState([{
        width: "60%",
        height: "70%",
        data: [{
            id: "Тип клиента", data: [
                {id: "новый клиент", checked: false},
                {id: "лояльный клиент", checked: false}
            ]
        }, {
            id: "Услуга", data: [
                {id: "Перевод", checked: false},
                {id: "Редактура", checked: false},
                {id: "Корректура", checked: false},
                {id: "Оценка", checked: false},
                {id: "LQA", checked: false},
                {id: "Ingame Review", checked: false},
                {id: "Озвучка", checked: false},
                {id: "Bugfixing", checked: false}
            ]
        }, {
            id: "Объем проекта", data: [
                {id: "до 1500 сл на/яп", checked: false},
                {id: "от 1500 до 15000 сл на/яп", checked: false},
                {id: "от 15000 до 100000 сл на/яп", checked: false}
            ]
        }, {
            id: "Тип проекта", data: [
                {id: "новый проект", checked: false},
                {id: "апдейт", checked: false},
                {id: "тест", checked: false}
            ]
        }, {
            id: "ЯП", data: [
                {id: "en-ru", checked: false},
                {id: "ru-en", checked: false},
                {id: "en-mlv", checked: false},
                {id: "asia-en", checked: false},
                {id: "asia-ru", checked: false},
                {id: "asia-asia", checked: false},
                {id: "en-en", checked: false},
                {id: "ru-ru", checked: false},
                {id: "mlv-en", checked: false},
                {id: "en-ara", checked: false},
                {id: "en-сложные шрифты", checked: false}
            ]
        }, {
            id: "С кем общаемся", data: [
                {id: "продюсер", checked: false},
                {id: "писатель", checked: false},
                {id: "локменеджер", checked: false},
                {id: "секретарь", checked: false},
                {id: "маркетинг", checked: false},
                {id: "владелец", checked: false},
                {id: "вм", checked: false},
                {id: "геймдизайнер", checked: false},
                {id: "лэнгкипер", checked: false},
                {id: "новый человек", checked: false}
            ]
        }, {
            id: "Как проверяют качество", data: [
                {id: "никак", checked: false},
                {id: "игроки", checked: false},
                {id: "носитель", checked: false},
                {id: "другой вендор", checked: false},
                {id: "LQA", checked: false},
                {id: "неноситель", checked: false},
                {id: "изменилась проверка качества", checked: false},
            ]
        }, {
            id: "Ставки для клиента", data: [
                {id: "достаточные", checked: false},
                {id: "впритык", checked: false},
                {id: "в минус", checked: false}
            ]
        }, {
            id: "Качество коммуникации", data: [
                {id: "формальная", checked: false},
                {id: "легко", checked: false},
                {id: "языковой барьер", checked: false},
                {id: "не на одной волне", checked: false}
            ]
        }, {
            id: "Тул клиента", data: [
                {id: "есть тул", checked: false},
                {id: "нет тула", checked: false},
                {id: "изменился тул", checked: false}
            ]
        }, {
            id: "Срок", data: [
                {id: "комфортный", checked: false},
                {id: "сжатый", checked: false},
                {id: "ужасный", checked: false}
            ]
        }, {
            id: "Усложнители", data: [
                {id: "составные строки", checked: false},
                {id: "плохой сорс", checked: false},
                {id: "короткие строки", checked: false},
                {id: "стремные яп", checked: false},
                {id: "сложные теги и переменные", checked: false},
                {id: "генерация строк", checked: false},
                {id: "мало референсов", checked: false},
                {id: "происхождение (оригинальный текст или часть метавселенной)", checked: false},
                {id: "сложная тематика", checked: false},
                {id: "legacy-TM от заказчика", checked: false},
                {id: "много референсов (не систематизированы)", checked: false},
                {id: "порядок строк в диалогах", checked: false},
                {id: "мультиплатформенность", checked: false},
                {id: "правки сорса", checked: false},
                {id: "маркетинг", checked: false},
                {id: "сложный формат файлов", checked: false},
                {id: "МТ", checked: false},
                {id: "добавился усложнитель", checked: false},
                {id: "высоковозвратный проект", checked: false},
                {id: "hog-предметы", checked: false},
                {id: "негатив", checked: false},
                {id: "нет id строк", checked: false}
            ]
        }, {
            id: "Вид обратной связи", data: [
                {id: "форма оценки", checked: false},
                {id: "баг-репорт", checked: false},
                {id: "комменты игроков", checked: false},
                {id: "свободная форма", checked: false}
            ]
        }, {
            id: "Команда", data: [
                {id: "проверенная", checked: false},
                {id: "новички", checked: false},
                {id: "несколько лингвистов на яп", checked: false},
                {id: "внештат ру", checked: false}
            ]
        }, {
            id: "Кто работает с текстом", data: [
                {id: "только мы", checked: false},
                {id: "другие вендоры", checked: false},
                {id: "заказчик", checked: false}
            ]
        }, {
            id: "Как отвечают на вопоросы", data: [
                {id: "быстро и понятно", checked: false},
                {id: "быстро и непонятно", checked: false},
                {id: "медленно и понятно", checked: false},
                {id: "медленно и непонятно", checked: false},
                {id: "не отвечают", checked: false}
            ]
        }
        ]
    }]);

    function setActiveFunction(val) {
        setModalActive(val);
        console.log("set modal!", modalActive);
    }

    return(
        <div className="managedQualityOnProjectCreate">
            <div className="row center">
                <div className="col-sm-12">
                    <h4>Управляемое качество на проекте</h4>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-sm-12">
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className="mb-3"
                    >
                        <Tab eventKey="charter" title="Charter">
                            <Charter />
                        </Tab>
                        <Tab eventKey="project_bible" title="Project Bible">
                            <ProjectBible active={modalActive} setActive={setActiveFunction} />
                        </Tab>
                        <Tab eventKey="project_bible_actions" title="Project Bible (+AM PM actions)">
                            <ProjectBibleActions />
                        </Tab>
                        <Tab eventKey="project_stages" title="Project Stages">
                            lalala
                        </Tab>
                        <Tab eventKey="check_list" title="Чек-лист МППА">
                            lalala
                        </Tab>
                        <Tab eventKey="tags" title="Tags">
                            lalala
                        </Tab>
                        <Tab eventKey="spec" title="Spec">
                            lalala
                        </Tab>
                        <Tab eventKey="tags_old" title="Tags (old)">
                            lalala
                        </Tab>
                    </Tabs>
                </div>
            </div>
            <Modal active={modalActive} setActive={setModalActive} modalInfo={modalInfo} />
        </div>
    )
}