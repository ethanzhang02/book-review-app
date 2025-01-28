import React from 'react';
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';  // Import React-Bootstrap components
import { useNavigate } from 'react-router-dom';  // For navigation (React Router)

const Layout = ({ children }) => {
  const navigate = useNavigate();  // For handling navigation

  // Handle search form submission
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const searchQuery = document.getElementById("search_query").value.trim();
    if (searchQuery === '') {
      document.getElementById("search_query").focus();
      document.getElementById("search_query").value = "";
    } else {
      navigate(`/search/${searchQuery}`);  // Navigate to the search results
    }
  };

  // Navigate to the add book page
  const handleAddButtonClick = () => {
    navigate('/add');
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Bestsellers Boulevard</Navbar.Brand>  {/* Branding */}
          <Navbar.Toggle aria-controls="navbarNavAltMarkup" />  {/* Toggle button for mobile */}
          <Navbar.Collapse id="navbarNavAltMarkup">
            <Nav className="me-auto">  {/* Navigation links */}
              <Form className="d-flex" onSubmit={handleSearchSubmit}>
                <FormControl
                  type="search"
                  id="search_query"
                  placeholder="Search Books"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="primary" type="submit" className="me-2">Search</Button>  {/* Search button */}
              </Form>
              <Button variant="primary" onClick={handleAddButtonClick}>Add Book</Button>  {/* Add Book button */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main content area */}
      <div className="container">
        {children}  {/* Render dynamic content (pages) here */}
      </div>
    </div>
  );
};

export default Layout;
