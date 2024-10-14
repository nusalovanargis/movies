import Header from "./components/ui/header/Header";
import Footer from "./components/ui/footer/Footer";
import Movies from "./components/ui/movies/Movies";
import {Route, Routes} from "react-router-dom";
import SearchPage from "./components/ui/search-page/SearchPage";

const App = () => {
    return (
            <>
                <Header />
                <Routes>
                    <Route path="/" element={<Movies />} />
                    <Route path="/search" element={<SearchPage />} />
                </Routes>
                <Footer />
            </>
    );
};

export default App