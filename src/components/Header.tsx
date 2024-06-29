import { Link } from 'react-router-dom';
import { LanguageSelector } from './LanguageSelector';

export const Header = () => {
  return (
    <div className="flex justify-between items-center mb-4 bg-gray-100 dark:bg-black p-5 w-full">
      <h1>🍓 Driscoll's Coding Test 🍓</h1>
      <nav>
        <ul className="flex gap-5">
          <li>
            <Link to="/users" className="text-blue-500 hover:text-blue-700">
              Users
            </Link>
          </li>
          <li>
            <Link to="/news" className="text-blue-500 hover:text-blue-700">
              News
            </Link>
          </li>
        </ul>
      </nav>
      <LanguageSelector />
    </div>
  );
};
