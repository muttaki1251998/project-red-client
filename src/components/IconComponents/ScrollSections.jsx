import React from 'react';
import { Link, Element } from 'react-scroll';
import Intro from '../Intro';

const ScrollSections = ({ profilePictureURL, profileBio, profileDescription }) => (
  <div>
    <Element name="section1" className="element">
      <div className="h-screen flex items-center justify-center bg-gray-200 relative">
        <h1 className="text-5xl">Section 1</h1>
        <Link to="section2" smooth={true} duration={500} className="absolute bottom-10 cursor-pointer">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Scroll Down</button>
        </Link>
      </div>
    </Element>

    <Element name="section2" className="element">
      <div className="h-screen flex items-center justify-center bg-gray-300 relative">
        <Intro profilePicture={profilePictureURL} profileBio={profileBio} profileDescription={profileDescription} />
        <Link to="section3" smooth={true} duration={500} className="absolute bottom-10 cursor-pointer">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Scroll Down</button>
        </Link>
      </div>
    </Element>

    <Element name="section3" className="element">
      <div className="h-screen flex items-center justify-center bg-gray-400 relative">
        <h1 className="text-5xl">Section 3</h1>
        <Link to="section1" smooth={true} duration={500} className="absolute bottom-10 cursor-pointer">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Scroll Up</button>
        </Link>
      </div>
    </Element>
  </div>
);

export default ScrollSections;
