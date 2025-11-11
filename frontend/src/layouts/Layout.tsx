import Footer from '../components/shared/Footer';
import Header from '../components/shared/Header';
import Hero from '../components/shared/Hero';

interface LayoutProps {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />

      <Hero />

      <div className='container mx-auto p-6 flex-1'>
        {children}
      </div>

      <Footer />
    </div>
  );
};

export default Layout;