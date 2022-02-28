export const LOADING = 'LOADING';
export const NEWS_LIST = 'NEWS_LIST';
export const SINGLE_NEWS_DETAILS = 'SINGLE_NEWS_DETAILS';
export const ERROR = 'ERROR';

export const setNewsList = (newsListArr) => dispatch => {
    dispatch({
        type: NEWS_LIST,
        payload: newsListArr
    });
}

export const setSingleNewsDetails = (singleNewsDetailsArr) => dispatch => {
    dispatch({
        type: SINGLE_NEWS_DETAILS,
        payload: singleNewsDetailsArr
    });
}

export const setIsLoading = (loading) => dispatch => {
    dispatch({
        type: LOADING,
        payload: loading
    });
}

export const setHasError = (error) => dispatch => {
    dispatch({
        type: ERROR,
        payload: error
    });
}