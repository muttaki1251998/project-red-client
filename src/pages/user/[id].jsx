import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const UserDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_BACKEND_API_URL}/profile/${id}`, {
            headers: {
              'x-frontend-id': 'project-red',
            },
          });
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      
      fetchUser();
    }
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto flex justify-center items-center min-h-screen p-8">
      <div className="flex flex-col md:flex-row gap-8 max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
        {/* Left Section: Profile Picture */}
        <div className="md:w-1/3 flex justify-center md:justify-start">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-full h-full object-cover border-4 border-gray-300"
          />
        </div>

        {/* Right Section: User Information */}
        <div className="md:w-2/3">
          {/* Header: Full Name */}
          <h1 className="text-4xl font-bold text-gray-800">{user.fullname}</h1>

          {/* User Info */}
          <div className="mt-4 space-y-2">
            <p><span className="font-semibold text-gray-700">Email:</span> {user.email}</p>
            <p><span className="font-semibold text-gray-700">Phone:</span> {user.phone}</p>
            <p><span className="font-semibold text-gray-700">Occupation:</span> {user.occupation}</p>
            <p><span className="font-semibold text-gray-700">Degree:</span> {user.degree}</p>
            <p><span className="font-semibold text-gray-700">University:</span> {user.university}</p>
            <p><span className="font-semibold text-gray-700">Address:</span> {user.address}</p>
            <p><span className="font-semibold text-gray-700">City:</span> {user.city}</p>
            <p><span className="font-semibold text-gray-700">Country:</span> {user.country}</p>

            {/* Conditional Rendering of Links */}
            {user.facebookLink && (
              <p>
                <span className="font-semibold text-gray-700">Facebook:</span>{' '}
                <a href={user.facebookLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {user.facebookLink}
                </a>
              </p>
            )}
            {user.linkedInLink && (
              <p>
                <span className="font-semibold text-gray-700">LinkedIn:</span>{' '}
                <a href={user.linkedInLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {user.linkedInLink}
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
