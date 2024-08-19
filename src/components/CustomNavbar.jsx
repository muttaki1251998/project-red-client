import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { logout } from '../store/authSlice';
import { useRouter } from 'next/router';

export default function CustomNavbar() {
  const [scroll, setScroll] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 160) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push('/'); // Redirect to the home page after logout
  };

  const menuVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: 'auto', opacity: 1, transition: { duration: 0.2 } },
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-700 ease-in-out ${
        scroll ? 'bg-[#35475C] bg-opacity-50 h-32' : 'bg-[#35475C] bg-opacity-50 h-32'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          <Link href={`/`} legacyBehavior>
            <a className="flex-shrink-0 flex items-center">
              <img
                src="/logo.png"
                alt="Logo"
                className={`object-contain ${
                  scroll
                    ? 'h-24 w-24 md:h-32 md:w-32 lg:h-48 lg:w-48'
                    : 'h-24 w-24 md:h-32 md:w-32 lg:h-48 lg:w-48'
                }`}
              />
              <div>
                <h1 className="text-white text-lg md:text-2xl lg:text-3xl">SCHOLAR BANGLA</h1>
                <p className="text-xl text-red-500 uppercase font-bold">
                      #ReverseBrainDrainBd
                    </p>
              </div>
            </a>
          </Link>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {isLoggedIn ? (
                <button onClick={handleLogout} className="text-white hover:text-gray-300">
                  LOGOUT
                </button>
              ) : (
                <>
                  <Link href="/register" legacyBehavior>
                    <a className="text-white hover:text-gray-300">SIGN UP</a>
                  </Link>
                  <Link href="/login" legacyBehavior>
                    <a className="text-white hover:text-gray-300">SIGN IN</a>
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white hover:text-gray-300">
              MENU
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-green-900"
          >
            <ul className="py-2">
              {isLoggedIn ? (
                <li>
                  <button onClick={handleLogout} className="block px-4 py-2 text-lg text-white dark:text-gray-200">
                    LOGOUT
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <Link href="/register" legacyBehavior>
                      <a className="block px-4 py-2 text-lg text-white dark:text-gray-200">SIGN UP</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/login" legacyBehavior>
                      <a className="block px-4 py-2 text-lg text-white dark:text-gray-200">SIGN IN</a>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
