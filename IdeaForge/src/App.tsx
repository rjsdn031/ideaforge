import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/index';
// import PostDetail from './pages/posts/[slug]';
// import TagPage from './pages/tags/[tag]';
// import AboutPage from './pages/about';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 p-4">
          <Routes>
          <Route path="/" element={<MainPage />} />
          {/* <Route path="/posts/:slug" element={<PostDetail />} /> */}
          {/* <Route path="/tags/:tag" element={<TagPage />} /> */}
          {/* <Route path="/about" element={<AboutPage />} /> */}
        </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
