import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import axios from "axios";

import {store} from "../store";
import {setHasError, setNewsList, setIsLoading} from "../store/actions";
import {Link} from "react-router-dom";

import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import Spinner from "./UI/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import ErrorPage from "./ErrorPage";

const HomePage = () => {
    const {newsList} = useSelector(state => state.newsReducer);

    const state = store.getState().newsReducer;
    const isLoading = state.loading;
    const hasError = state.error;

    const dispatch = useDispatch();

    const [toggleState, setToggleState] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalResult, setTotalResult] = useState(0);
    const [hasMoreItem, setHasMoreItem] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    // filter states
    const [languageSelection, setLanguageSelection] = useState("fr");
    const [sendLanguageSelection, setSendLanguageSelection] = useState("fr");

    const [sortingSelection, setSortingSelection] = useState("publishedAt");
    const [sendSortingSelection, setSendSortingSelection] = useState("publishedAt");

    const [searchKeywordIn, setSearchKeyWordIn] = useState("title");
    const [sendSearchKeywordIn, setSendSetSearchKeyWordIn] = useState("title");

    const [researchKeyword, setResearchKeyword] = useState("tesla");
    const [sendResearchKeyword, setSendResearchKeyword] = useState("tesla");

    const toggleTab = (index) => {
        setToggleState(index);
    };


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
                dispatch(setIsLoading(true));
                // const response = await axios.get(process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_API_KEY);
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}everything?q=${sendResearchKeyword}&from=2022-02-09&sortBy=${sendSortingSelection}&apiKey=${process.env.REACT_APP_API_KEY}&language=${sendLanguageSelection}&serchIn=${sendSearchKeywordIn}&pageSize=10&page=${pageNumber}`);
                console.log("API Response = %o", response);
                // setNewsList([response.data.articles]);

                const result = [response.data.articles][0].map((article, index) => ({...article, id: index}));

                dispatch(setNewsList([result]));
                setNewsList([result]);
                setTotalResult(response.data.totalResult);

                dispatch(setIsLoading(false));

                // const articles = newsList[0];

                // dispatch(setNewsList([response]));
                // console.log("NewList = %o", newsList);

                // error handling :
            } catch (error) {
                dispatch(setHasError(true));
                console.error("API error = %o", error);
                setErrorMessage("API request error occurred");
                setIsOpen(true);
                throw new Error(error);
            }
        }
        getNewsList();
    }, [dispatch, pageNumber, sendLanguageSelection, sendSortingSelection, sendSearchKeywordIn, sendResearchKeyword])

    // filter handling
    const handleLanguageChange = (e) => {
        setLanguageSelection(e.target.value);
        console.log("language = %o", languageSelection)
    }

    const handleSortingChange = (e) => {
        setSortingSelection(e.target.value);
        console.log("sorting selection = %o", sortingSelection)
    }

    const handleSearchInChange = (e) => {
        setSearchKeyWordIn(e.target.value);
        console.log("search in = %o", searchKeywordIn)
    }

    const handleResearchKeywordChange = (e) => {
        setResearchKeyword(e.target.value);
        console.log("research keyword = %o", researchKeyword)
    }

    const FilterSubmitHandler = () => {
        console.log("submitted");
        setSendLanguageSelection(languageSelection);
        setSendSortingSelection(sortingSelection);
        setSendSetSearchKeyWordIn(searchKeywordIn);
        setSendResearchKeyword(researchKeyword);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsOpen(false);
    };

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

    if (newsList !== undefined && newsList.length > 0 && !hasError) {
        // const articles = newsList[0];
        // const result = articles.map((article, index) => ({...article, id: index}));

        // console.log("result response obj = %o", result);

        // console.log("newslist response obj = %o", newsList);

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

            <>
{/*####################################################### FILTERS SYSTEM #############################################################*/}
                <div className="w-full md:w-5/6 shadow p-5 rounded-lg bg-white mx-auto mt-8">
                    <div className="relative">
                        <div className="absolute flex items-center ml-2 h-full">
                            <svg className="w-4 h-4 fill-current text-primary-gray-dark" viewBox="0 0 16 16" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z"></path>
                            </svg>
                        </div>

                        <input type="text" placeholder="Saisissez un mot clé à rechercher"
                            className="px-8 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                            onChange={handleResearchKeywordChange}
                        />
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <p className="font-medium">
                            Filtres
                        </p>

                        <button
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
                            onClick={FilterSubmitHandler}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                                 fill="currentColor">
                                <path fillRule="evenodd"
                                      d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                                      clipRule="evenodd"/>
                            </svg>
                            Filtrer
                        </button>
                    </div>

                    <div>
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                            <select
                                className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                                onChange={handleSearchInChange}
                            >
                                <option value="none" selected disabled hidden>Sélectionnez un type de recherche</option>
                                <option value="title">Rechercher dans le titre</option>
                                <option value="content">Rechercher dans le contenu</option>
                                <option value="description">Rechercher dans la description</option>
                                <option value="source">Rechercher dans la source</option>
                            </select>

                            <select
                                className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                                defaultValue={languageSelection}
                                onChange={handleLanguageChange}
                            >
                                <option value="none" selected disabled hidden>Sélectionnez une langue</option>
                                <option value="ar">Arabe</option>
                                <option value="de">Allemand</option>
                                <option value="en">Anglais</option>
                                <option value="es">Espagnol</option>
                                <option value="fr">Français</option>
                                <option value="he">Hébreu</option>
                                <option value="it">Italien</option>
                                <option value="nl">Néerlandais</option>
                                <option value="no">Norvégien</option>
                                <option value="pt">Portuguais</option>
                                <option value="ru">Russe</option>
                                <option value="se">Same du Nord</option>
                                <option value="zh">Chinois</option>
                            </select>

                            <select
                                className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                                onChange={handleSortingChange}
                            >
                                <option value="none" selected disabled hidden>Sélectionnez un ordre de classement</option>
                                <option value="publishedAt">Classer par date de publication</option>
                                <option value="relevancy">Classer par pertinence</option>
                                <option value="popularity">Classer par popularité</option>
                            </select>
                        </div>
                    </div>
                </div>

{/*####################################################### TABS SYSTEM #############################################################*/}
                <div className="container" style={{width: "100%"}}>
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
                            Détails d'un article
                        </button>
                        <button
                            className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                            onClick={() => toggleTab(3)}
                        >
                            Article complet
                        </button>
                    </div>

                    <div className="content-tabs">
                        <div className={toggleState === 1 ? "content  active-content" : "content"}>
                            <h2>Articles list</h2>
                            {isLoading ? <Spinner /> : null}
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
                            <h2>Détails d'un article</h2>
                            <hr />
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
                                voluptatum qui adipisci.
                            </p>
                        </div>

                        <div
                            className={toggleState === 3 ? "content  active-content" : "content"}
                        >
                            <h2>Article complet</h2>
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
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={isOpen}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        message={errorMessage}
                        action={
                            <>
                                <Button color="info" size="small" onClick={handleClose}>
                                    Close
                                </Button>
                                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                                    X
                                </IconButton>
                            </>
                        }
                    />
                </div>
            </>
        );
    } else {
        return <>
            <ErrorPage />
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={isOpen}
                autoHideDuration={6000}
                onClose={handleClose}
                message={errorMessage}
                action={
                    <>
                        <Button color="info" size="small" onClick={handleClose}>
                            Close
                        </Button>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            X
                        </IconButton>
                    </>
                }
            />
        </>
    }
};

export default HomePage;