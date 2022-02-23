import React from 'react';

import {Navigate, useParams} from "react-router-dom";
import {store} from "../store";

console.log("store = %o", store);

const ArticleDetails = () => {
    const state = store.getState().newsReducer;

    console.log("state = %o", state);

    let {id} = useParams();
    let idParam =+ id;

    // Checking if the states are still stocked in redux store, if not, we redirect to home (redirect to '/')
    if (state.newsList.length === 0) {
        return <Navigate to={'/'}/>
    }

    const newsList = state.newsList[0][0];
    const newsDetails = Object.values(newsList).filter(({id}) => id === idParam)[0];
    const doesIdExists = Object.values(newsList).find(({id}) => id === idParam);

    console.log("param1 id = " + id);
    console.log("idParam = " + idParam);
    console.log("newsList = %o", newsList);
    console.log("newsDetails = %o", newsDetails);
    console.log("doesIdExists = %o", doesIdExists);

    const formatDate = (date) => {
        console.log("date originale = %o", newsDetails.publishedAt);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dateObject = new Date(date);
        const formattedDate = dateObject.toLocaleDateString("fr-FR", options)
        console.log("formatted date = %o", formattedDate);

        return formattedDate;
    }

    const formatArticleContent = (content) => {
        return content.slice(0, -14);
    }

    if (Object.keys(newsDetails).length > 0 && newsDetails.constructor === Object) {
        return (
            <div className="px-10 my-4 py-6 rounded shadow-xl bg-white w-4/5 mx-auto">
                <div className="flex justify-between items-center">
                    <span className="font-light text-gray-600">Publié le <b>{formatDate(newsDetails.publishedAt)}</b>, par <b>{newsDetails.author}</b></span>
                    <span className="font-light text-gray-600">Source : <b> {newsDetails.source.name} </b></span>
                </div>
                <div className="mt-8 text-center">
                    <h2 className="text-2xl text-gray-700 font-bold">
                        {newsDetails.title}
                    </h2>
                    <p className="my-2 text-gray-600">
                        {newsDetails.description}
                    </p>
                    <div className="my-8">
                        <img className="rounded shadow-xl bg-white mx-auto w-96 h-52" src={newsDetails.urlToImage} alt={newsDetails.title} />
                    </div>
                    <p className="mt-2 text-gray-600">
                        {formatArticleContent(newsDetails.content)}
                    </p>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <p><a href={newsDetails.url} target="blank" className="text-blue-600 hover:underline">Voir l'article complet</a></p>
                </div>
            </div>
        );
    } else {
        return <Navigate to="/"/>
        // return <h1>Problem with API call : API response not recieved yet</h1>;
    }
};

export default ArticleDetails;