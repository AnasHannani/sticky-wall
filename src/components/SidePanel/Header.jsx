import { useApp } from '../../data/DataContext';
import SearchBar from './SearchBar';  // or appropriate path


// Header.jsx
const Header = () => {
  const { toggleMenu } = useApp();
  return (
    <>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Menu</h2>
        <button
          onClick={toggleMenu}
          className="p-2 rounded-lg hover:bg-gray-200 transition-colors sm:hidden"
        >
          <span>✕</span>
        </button>
      </div>
      <SearchBar />
    </>
  );
};

export default Header;  