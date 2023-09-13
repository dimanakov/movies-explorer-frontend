import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import SearchForm from '../SearchForm/SearchForm.js';

export default function Movies() {

  function handleSubmitSearchMovies(){
    
  }

  return (
    <main>
      <Header />
      <SearchForm onSubmit={handleSubmitSearchMovies}/>
      <Footer />
    </main>
  )
}
