import PropTypes from 'prop-types';
import { useState } from 'react';

import TopicList from './TopicList';
import ResourcesList from './ResourcesList';
import ModalContainer from '../../ModalContainer/ModalContainer';
import EditModalBody from './EditModalBody';

import './dailyClass.css';

export default function DailyClass({ isTrainer, dailyScheduleData, trainer }) {

    const [showEdit, setShowEdit] = useState(false);
    const topicsTitle = "Aprenderemos los conceptos core sobre CSS:";
    const dailyImage = {
        src: "/assets/img/daily-class-1.png",
        alt: "Day 1 Bootcamp:CSS",
        caption: "UI Engineering Studio. Day 1. Bootcamp:CSS"
    };
    const resources = [
        {
            title: "What is flex?",
            href: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox"
        },
        {
            title: "Understanding Grid Layout",
            href: "https://developer.mozilla.org/en-US/docs/Web/CSS/grid"
        },
        {
            title: "CSS Selectors",
            href: "https://www.w3schools.com/cssref/css_selectors.asp"
        },
    ];

    const trainers = ["Miguel Romero", "Juan Crisóstomo", "Angel Pantoja"];

    function toggleEdit() {
        setShowEdit(() => !showEdit);
    }

    return (
        <>
            <section className="dailyClass">
                <div className="dailyClass__contentLeft">
                    <h1 className="dailyClass__title">Día {dailyScheduleData.day} - {dailyScheduleData.topic}</h1>
                    <div className="dailyClass__topics">
                        <TopicList summary={dailyScheduleData.summary} topicsTitle={topicsTitle}></TopicList>
                    </div>
                    <div className="dailyClass__resources">
                        <ResourcesList resources={resources}></ResourcesList>
                    </div>
                </div>
                <div className="dailyClass__contentRigth">
                    <figure className="dailyClass__figure">
                        <img className="dailyClass__image" src={process.env.PUBLIC_URL + dailyImage.src} alt={dailyImage.alt}></img>
                        <figcaption hidden>{dailyImage.caption}</figcaption>
                    </figure>
                    <p className="dailyClass__trainer">Trainer: <a href="/">{trainer.firstName + trainer.lastName}</a></p>
                </div>
                {isTrainer &&
                    <>
                        <button className="dailyClass__options"><img src={process.env.PUBLIC_URL + "/assets/img/options.png"} alt=""></img></button>
                        <button className="dailyClass__edit" onClick={toggleEdit}>Editar</button>
                    </>
                }
            </section>
            {isTrainer &&
                <ModalContainer
                    children={
                        <EditModalBody
                            day={dailyScheduleData.day}
                            topicTitle={dailyScheduleData.topic}
                            summary={dailyScheduleData.summary}
                            trainers={trainers}
                        />}
                    show={showEdit}
                    handleClose={toggleEdit}
                    handlePrimary={() => alert("clicked send Daily class edit")}
                    primaryBtnName={"Guardar"}
                    secondaryBtnName={"Cerrar"}
                />}
        </>
    );
}

DailyClass.propTypes = {
    isTrainer: PropTypes.bool,
    dailyScheduleData: PropTypes.shape({
        date: PropTypes.string,
        day: PropTypes.number,
        id: PropTypes.number,
        id_Trainer: PropTypes.number,
        id_training: PropTypes.number,
        summary: PropTypes.array,
        topic: PropTypes.string
    }),
    trainer: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string
    }),
    dailyImage: PropTypes.shape({
        src: PropTypes.string,
        alt: PropTypes.string,
        caption: PropTypes.string
    })
}