import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Spinner } from '@nextui-org/react';
import axios from 'axios';
import { updateUser } from '../store/authSlice'; // Assuming you have an updateUser action in your authSlice

const UserProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentUser, setCurrentUser] = useState(user);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    occupation: '',
    profilePicture: null,
    facebookLink: '',
    linkedInLink: '',
    address: '',
    city: '',
    country: '',
    degree: '',
    university: ''
  });

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      // Pre-fill the form with user's current data
      setFormData({
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        occupation: user.occupation,
        facebookLink: user.facebookLink,
        linkedInLink: user.linkedInLink,
        address: user.address,
        city: user.city,
        country: user.country,
        degree: user.degree,
        university: user.university
      });
    }
  }, [user, router]);

  useEffect(() => {
    // Update the current user data when the user state changes
    setCurrentUser(user);
  }, [user]);

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({
        ...formData,
        profilePicture: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading spinner

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const response = await axios.patch(`${process.env.NEXT_BACKEND_API_URL}/users/${user._id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-frontend-id': 'project-red'
        }
      });

      // Update the Redux store with the new user data after successful edit
      dispatch(updateUser(response.data.user));
      setCurrentUser(response.data.user); // Update local state with the new user data
      setLoading(false); // Hide loading spinner
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error updating user data:", error);
      setLoading(false); // Hide loading spinner
    }
  };

  if (!currentUser) {
    return <p className="text-center mt-8 text-gray-700">No user data available. Please log in.</p>;
  }

  return (
    <div className="container mx-auto flex justify-center items-center min-h-screen p-8">
      <div className="flex flex-col md:flex-row gap-8 max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg relative">
        {/* Edit Button */}
        <Button onPress={onOpen} className="absolute top-4 right-4">
          Edit
        </Button>

        {/* Left Section: Profile Picture */}
        <div className="md:w-1/3 flex justify-center md:justify-start">
          <img
            src={currentUser.profilePicture}
            alt="Profile"
            className="w-full h-full object-cover border-4 border-gray-300"
          />
        </div>

        {/* Right Section: User Information */}
        <div className="md:w-2/3">
          {/* Header: Full Name */}
          <h1 className="text-4xl font-bold text-gray-800">{currentUser.fullname}</h1>

          {/* User Info */}
          <div className="mt-4 space-y-2">
            <p><span className="font-semibold text-gray-700">Email:</span> {currentUser.email}</p>
            <p><span className="font-semibold text-gray-700">Phone:</span> {currentUser.phone}</p>
            <p><span className="font-semibold text-gray-700">Occupation:</span> {currentUser.occupation}</p>
            <p><span className="font-semibold text-gray-700">Degree:</span> {currentUser.degree}</p>
            <p><span className="font-semibold text-gray-700">University:</span> {currentUser.university}</p>
            <p><span className="font-semibold text-gray-700">Address:</span> {currentUser.address}</p>
            <p><span className="font-semibold text-gray-700">City:</span> {currentUser.city}</p>
            <p><span className="font-semibold text-gray-700">Country:</span> {currentUser.country}</p>

            {/* Conditional Rendering of Links */}
            {currentUser.facebookLink && (
              <p>
                <span className="font-semibold text-gray-700">Facebook:</span>{' '}
                <a href={currentUser.facebookLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {currentUser.facebookLink}
                </a>
              </p>
            )}
            {currentUser.linkedInLink && (
              <p>
                <span className="font-semibold text-gray-700">LinkedIn:</span>{' '}
                <a href={currentUser.linkedInLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {currentUser.linkedInLink}
                </a>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Modal for Editing User Data */}
      <Modal isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>Edit Profile</ModalHeader>
            <ModalBody>
              {loading ? (
                <div className="flex justify-center">
                  <Spinner />
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700">Full Name</label>
                    <input
                      type="text"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Occupation</label>
                    <input
                      type="text"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Degree</label>
                    <input
                      type="text"
                      name="degree"
                      value={formData.degree}
                      onChange={handleChange}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">University</label>
                    <input
                      type="text"
                      name="university"
                      value={formData.university}
                      onChange={handleChange}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Facebook Link</label>
                    <input
                      type="text"
                      name="facebookLink"
                      value={formData.facebookLink}
                      onChange={handleChange}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">LinkedIn Link</label>
                    <input
                      type="text"
                      name="linkedInLink"
                      value={formData.linkedInLink}
                      onChange={handleChange}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Profile Picture</label>
                    <input
                      type="file"
                      name="profilePicture"
                      onChange={handleChange}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" type="submit" disabled={loading}>
                Save Changes
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UserProfile;
