import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Importing React Router components
import Layout from './pages/Layout';  // Import the Layout component
import HomePage from './pages/HomePage';  // Import the HomePage component
import ViewBook from './pages/ViewBook';
import EditBook from './pages/EditBook';
import AddBook from './pages/AddBook';
import SearchResults from './pages/SearchResults';
import "bootstrap/dist/css/bootstrap.min.css";
import './styles.css';  // Import custom styles (like CSS)

const App = () => {
    return (
        <Router>
            {/* Layout wraps all your pages */}
            <Layout>
                <Routes>
                    {/* Define routes for your app */}
                    <Route path="/" element={<HomePage />} />  {/* Route to HomePage */}
                    <Route path="/view/:bookId" element={<ViewBook />} /> {/* Route to ViewBook */}
                    <Route path="/edit/:bookId" element={<EditBook />} />
                    <Route path="/add" element={<AddBook />} />
                    <Route path="/search/:query" element={<SearchResults/>} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;
