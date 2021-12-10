import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import FeaturedPost from './FeatheredPost';
import Footer from './Footer';
import SearchBar from './SearchBar';

const theme = createTheme();

export default function Blog() {
  const [vacations, setVacations] = useState([]);

  const updateView = async () => {
    fetch(`http://localhost:1000/vacation`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        !data.arr ? setVacations(data) : alert(data.err);
        console.log(data);
      });
  };

  useEffect(() => {
    updateView();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header vacation={vacations} setVacations={setVacations} updateView={updateView} title={localStorage.user == "user" ? "Your Next Vacation" : "Admin"} />
      </Container>
      <Container>
        <SearchBar vacation={vacations} />
      </Container>
      <Container>
        {vacations.map(vacation => <FeaturedPost key={vacation.id} vacation={vacation} setVacations={setVacations} updateView={updateView} />)}
      </Container>
      <Container>
        <Footer title="Some Footer Text" />
      </Container>
    </ThemeProvider>
  );
}