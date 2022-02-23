import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {setHasError, setNewsList} from "../store/actions";
import {Link, Redirect} from "react-router-dom";

import Spinner from "./UI/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const HomePage = () => {
    const {newsList} = useSelector(state => state.newsReducer);
    const dispatch = useDispatch();

    const [toggleState, setToggleState] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalResult, setTotalResult] = useState(0);
    const [hasMoreItem, setHasMoreItem] = useState(true);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    // console.log("test api call = " + process.env.REACT_APP_API_BASE_URL + "everything?q=tesla&from=2022-02-09&sortBy=publishedAt&apiKey=" + process.env.REACT_APP_API_KEY);

    useEffect(() => {
        const getNewsList = async () => {
            // let options = {
            //     method: 'GET',
            //     url: process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_API_KEY,
            // };
            //
            // axios.request(options).then(response => {
            //     console.log(response.data.articles);
            //
            //     // setNewsList([response.data.articles]);
            //     dispatch(setNewsList([response.data.articles]));
            // }).catch(error => {
            //     console.error("API Error = %o", error);
            // });

            try {
                // const response = await axios.get(process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_API_KEY);
                const response = await axios.get(process.env.REACT_APP_API_BASE_URL + "everything?q=tesla&from=2022-02-09&sortBy=publishedAt&apiKey=" + process.env.REACT_APP_API_KEY + "&language=fr&serchIn=title&pageSize=10&page=" + pageNumber);
                console.log("API Response = %o", response);
                // setNewsList([response.data.articles]);

                const result = [response.data.articles][0].map((article, index) => ({...article, id: index}));

                dispatch(setNewsList([result]));
                setNewsList([result]);
                setTotalResult(response.data.totalResult);

                // const articles = newsList[0];

                // dispatch(setNewsList([response]));
                // console.log("NewList = %o", newsList);
            } catch (error) {
                console.error("API error = %o" + error);
            }
        }
        getNewsList();
    }, [dispatch, pageNumber])

    const loadFollowingData = () => {
        // if (totalResult >= 10) {
            console.log("load Following data");
            // setHasMoreItem(false);
        console.log("page number before update = %o", pageNumber)
            setPageNumber(pageNumber +1);
            console.log("page number after update = %o", pageNumber)
            // return;
        // }
    }

    if (newsList !== undefined && newsList.length > 0) {
        // const articles = newsList[0];
        // const result = articles.map((article, index) => ({...article, id: index}));

        // console.log("result response obj = %o", result);

        console.log("newslist response obj = %o", newsList);

        return (
            // <div className="w-full bg-white rounded-lg shadow-lg lg:w-1/3">
            //     {newsList[0][0].map((item, index) => (
            //         <div key={index}>
            //             <ul className="divide-y-2 divide-gray-400">
            //                 <li className="flex justify-between p-3 hover:bg-blue-600 hover:text-blue-200"><img style={{width: "50px", heigth: "50px" }} src={item.urlToImage} alt={item.title} /> {item.title} {item.source.name}</li>
            //                 {/*<li className="flex justify-between p-3 hover:bg-blue-600 hover:text-blue-200">{item.title}</li>*/}
            //                 {/*<li className="flex justify-between p-3 hover:bg-blue-600 hover:text-blue-200">{item.source.name}</li>*/}
            //             </ul>
            //             {/*<li>{item.source.name}</li>*/}
            //             {/*<li><img src={item.urlToImage} alt={item.title} /></li>*/}
            //             {console.log(item)}
            //             {/*{console.log("item = %o", Object.keys(items)[0])}*/}
            //         </div>
            //     ))}
            // </div>

            <div className="container" style={{width: "100%", height: "500px"}}>
                <div className="bloc-tabs">
                    <button
                        className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                        onClick={() => toggleTab(1)}
                    >
                        Accueil
                    </button>
                    <button
                        className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                        onClick={() => toggleTab(2)}
                    >
                        Article details
                    </button>
                    <button
                        className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                        onClick={() => toggleTab(3)}
                    >
                        Full article
                    </button>
                </div>

                <div className="content-tabs">
                    <div className={toggleState === 1 ? "content  active-content" : "content"}>
                        <h2>Articles list</h2>
                        <hr />
                        <InfiniteScroll
                            dataLength={totalResult}
                            next={loadFollowingData}
                            hasMore={hasMoreItem}
                            loader={<><Spinner /><h4>Loading...</h4></>}
                            endMessage={
                                <p className="text-center">
                                    <b>You have seen  all data</b>
                                </p>
                            }
                        >

                            {newsList[0][0].map((item, index) => (
                                <div key={index}>
                                    <Link to={`/article-details/${item.id}`} className="list-group-item list-group-item-action">
                                        <ul className="cursor-pointer text-center border-b-2 border-green-500 hover:bg-blue-600 hover:text-blue-200">
                                            <li className="flex justify-between p-3"><img style={{width: "150px"}} src={item.urlToImage} alt={item.title} /> </li>
                                            <li className="flex justify-between p-3">Titre : {item.title}</li>
                                            <li className="flex justify-between p-3">Source : {item.source.name}</li>
                                        </ul>
                                    </Link>
                                </div>
                            ))}
                        </InfiniteScroll>
                    </div>

                    <div
                        className={toggleState === 2 ? "content  active-content" : "content"}
                    >
                        <h2>Article details</h2>
                        <hr />
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
                            voluptatum qui adipisci.
                        </p>
                    </div>

                    <div
                        className={toggleState === 3 ? "content  active-content" : "content"}
                    >
                        <h2>Full article</h2>
                        <hr />
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos sed
                            nostrum rerum laudantium totam unde adipisci incidunt modi alias!
                            Accusamus in quia odit aspernatur provident et ad vel distinctio
                            recusandae totam quidem repudiandae omnis veritatis nostrum
                            laboriosam architecto optio rem, dignissimos voluptatum beatae
                            aperiam voluptatem atque. Beatae rerum dolores sunt.
                        </p>
                    </div>
                </div>
            </div>
        );
    } else {
        return <><Spinner /> <h1>Problem with API call : API response not recieved yet</h1></>;
    }
};

export default HomePage;