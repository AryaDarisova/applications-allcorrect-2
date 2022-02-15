import React from "react";
import QualityProjectTags from "./QualityProjectTags";
import {Form, Table} from "react-bootstrap";

export default function ManagedQualityOnProjectView(props) {
    const [tags, setTags] = React.useState([{
        id: "Тип клиента", data: [
            {id: "новый клиент", checked: false},
            {id: "лояльный клиент", checked: false}
        ]}, {
        id: "Услуга", data: [
            {id: "Перевод", checked: false},
            {id: "Редактура", checked: false},
            {id: "Корректура", checked: false},
            {id: "Оценка", checked: false},
            {id: "LQA", checked: false},
            {id: "Ingame Review", checked: false},
            {id: "Озвучка", checked: false},
            {id: "Bugfixing", checked: false}
        ]}, {
        id: "Объем проекта", data: [
            {id: "до 1500 сл на/яп", checked: false},
            {id: "от 1500 до 15000 сл на/яп", checked: false},
            {id: "от 15000 до 100000 сл на/яп", checked: false}
        ]}, {
        id: "Тип проекта", data: [
            {id: "новый проект", checked: false},
            {id: "апдейт", checked: false},
            {id: "тест", checked: false}
        ]}, {
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
        ]}, {
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
        ]}, {
        id: "Как проверяют качество", data: [
            {id: "никак", checked: false},
            {id: "игроки", checked: false},
            {id: "носитель", checked: false},
            {id: "другой вендор", checked: false},
            {id: "LQA", checked: false},
            {id: "неноситель", checked: false},
            {id: "изменилась проверка качества", checked: false},
        ]}, {
        id: "Ставки для клиента", data: [
            {id: "достаточные", checked: false},
            {id: "впритык", checked: false},
            {id: "в минус", checked: false}
        ]}, {
        id: "Качество коммуникации", data: [
            {id: "формальная", checked: false},
            {id: "легко", checked: false},
            {id: "языковой барьер", checked: false},
            {id: "не на одной волне", checked: false}
        ]}, {
        id: "Тул клиента", data: [
            {id: "есть тул", checked: false},
            {id: "нет тула", checked: false},
            {id: "изменился тул", checked: false}
        ]}, {
        id: "Срок", data: [
            {id: "комфортный", checked: false},
            {id: "сжатый", checked: false},
            {id: "ужасный", checked: false}
        ]}, {
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
        ]}, {
        id: "Вид обратной связи", data: [
            {id: "форма оценки", checked: false},
            {id: "баг-репорт", checked: false},
            {id: "комменты игроков", checked: false},
            {id: "свободная форма", checked: false}
        ]}, {
        id: "Команда", data: [
            {id: "проверенная", checked: false},
            {id: "новички", checked: false},
            {id: "несколько лингвистов на яп", checked: false},
            {id: "внештат ру", checked: false}
        ]}, {
        id: "Кто работает с текстом", data: [
            {id: "только мы", checked: false},
            {id: "другие вендоры", checked: false},
            {id: "заказчик", checked: false}
        ]}, {
        id: "Как отвечают на вопоросы", data: [
            {id: "быстро и понятно", checked: false},
            {id: "быстро и непонятно", checked: false},
            {id: "медленно и понятно", checked: false},
            {id: "медленно и непонятно", checked: false},
            {id: "не отвечают", checked: false}
        ]}
    ]);

    const [testInfo, setTestInfo] = React.useState([
        {
            stage_manager: "",
            stage: "Пре-сейл",
            stage_insides: "",
            to_start_stage: "",
            deliverable_phase: "",
            tags: "",
            stage_participants: "",
            client_pays_us: "Пока делаем все только для услуги Перевод, остальные - out of scope"
        },
        {
            stage_manager: "SM\\AM",
            stage: "Расчет",
            stage_insides: "Создать клиента и проект в 1С",
            to_start_stage: "Ставки\n" +
                "Тип клиента",
            deliverable_phase: "",
            tags: "новый клиент",
            stage_participants: "",
            client_pays_us: ""
        },
        {
            stage_manager: "SM\\AM",
            stage: "Расчет",
            stage_insides: "Создать смету с заполненными яп и ставками",
            to_start_stage: "",
            deliverable_phase: "",
            tags: "новый проект\n" +
                "апдейт",
            stage_participants: "",
            client_pays_us: ""
        },
        {
            stage_manager: "SM\\AM",
            stage: "Расчет",
            stage_insides: "Отправить на ордер расчет со всей историей переписки",
            to_start_stage: "",
            deliverable_phase: "",
            tags: "новый клиент\n" +
                "новый проект",
            stage_participants: "",
            client_pays_us: ""
        },
        {
            stage_manager: "PM\n" +
                "Teamlead",
            stage: "Расчет",
            stage_insides: "Прочитать переписку",
            to_start_stage: "Переписка",
            deliverable_phase: "Смета заказчика, расходы и срок, тип текста и риски",
            tags: "всё",
            stage_participants: "",
            client_pays_us: ""
        }
    ]);

    function filterByTag(header, tag) {
        console.log("checked:", tag);
    }

    return(
        <div className="managedQualityOnProject">
            <div className="row">
                <div className="col-sm-2 ">
                    <QualityProjectTags tags={tags} filterByTag={filterByTag} />
                </div>
                <div className="col-sm-10 ">
                    <Table responsive bordered>
                        <thead>
                        <tr>
                            <th>Ответственный за этап</th>
                            <th>Этап</th>
                            <th>Внутренности этапа</th>
                            <th>Какая инфа нужна для старта этапа</th>
                            <th>Deliverable этапа</th>
                            <th>Тэги</th>
                            <th>Участники этапа</th>
                            <th>* то, за что нам платит клиент</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            testInfo.map(value => {
                                return (
                                    <tr>
                                        <td>{value.stage_manager}</td>
                                        <td>{value.stage}</td>
                                        <td>{value.stage_insides}</td>
                                        <td>{value.to_start_stage}</td>
                                        <td>{value.deliverable_phase}</td>
                                        <td>{value.tags}</td>
                                        <td>{value.stage_participants}</td>
                                        <td>{value.client_pays_us}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}