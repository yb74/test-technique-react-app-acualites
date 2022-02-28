import { Routes ,Route } from 'react-router-dom';

import './App.css';

import HomePage from "./components/HomePage";
import Header from "./components/Header/Header";
import Tabs from "./components/Tabs";
import ArticleDetails from "./components/ArticleDetails";
import NotFound from "./components/NotFound";

function App() {
    return (
        <div className="App">
            <Header />
            {/*<Tabs />*/}
            {/* A <Switch> looks through its children <Route>s and
    renders the first one that matches the current URL. */}
            <Routes>
                <Route exact path='/' element={<HomePage/>} />
                <Route path="/article-details/:id" element={<ArticleDetails/>} />
                <Route path='*' element={<NotFound/>} />
            </Routes>
        </div>
    );
}

export default App;
