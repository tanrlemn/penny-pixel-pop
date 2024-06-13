// local components
import Navbar from '../_navigation/navbar';

export default function PagesLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
