import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, Button } from "@nextui-org/react";
import { adminLogout } from "../store/adminSlice";

const AdminPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState(null);
  const isAdminLoggedIn = useSelector((state) => state.admin.isAdminLoggedIn);

  useEffect(() => {
    if (!isAdminLoggedIn) {
      router.push("/admin/admin-login");
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_BACKEND_API_URL}/admin/users`, {
          headers: {
            "x-frontend-id": "project-red",
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
      setLoading(false);
    };

    fetchUsers();
  }, [isAdminLoggedIn, router]);

  const handleVerifyUser = async (userId) => {
    try {
      await axios.patch(`${process.env.NEXT_BACKEND_API_URL}/verify/${userId}`, null, {
        headers: {
          "x-frontend-id": "project-red",
        },
      });
      // Fetch updated users after verification
      fetchUsers();
    } catch (error) {
      console.error("Error verifying user:", error);
    }
  };

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    onOpen();
  };

  const handleLogout = () => {
    dispatch(adminLogout());
    router.push("/");
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-64 h-full bg-[#1D2334] p-4 z-50 transition-transform">
        <a href="#" className="flex items-center pb-4 border-b border-b-gray-800">
          <h2 className="text-white text-2xl">ADMIN</h2>
        </a>
        <ul className="mt-4">
          <li className="mb-1 group">
            <button onClick={() => router.push("/admin")} className="flex font-semibold items-center py-2 px-4 text-white rounded-md w-full text-left">
              <i className="ri-home-2-line mr-3 text-lg"></i>
              <span className="text-sm">Dashboard</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <main className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-200 min-h-screen transition-all">
        {/* Navbar */}
        <div className="py-2 px-6 bg-[#f8f4f3] flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
          <button type="button" className="text-lg text-gray-900 font-semibold">
            <i className="ri-menu-line"></i>
          </button>
          <ul className="ml-auto flex items-center">
            <li className="ml-3">
              <button type="button" className="flex items-center">
                <div className="flex-shrink-0 w-10 h-10 relative">
                  <div className="p-1 bg-white rounded-full focus:outline-none focus:ring">
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://laravelui.spruko.com/tailwind/ynex/build/assets/images/faces/9.jpg"
                      alt="User"
                    />
                    <div className="top-0 left-7 absolute w-3 h-3 bg-lime-400 border-2 border-white rounded-full animate-ping"></div>
                    <div className="top-0 left-7 absolute w-3 h-3 bg-lime-500 border-2 border-white rounded-full"></div>
                  </div>
                </div>
                <div className="p-2 text-left">
                  <h2 className="text-sm font-semibold text-gray-800">
                    PROJECT RED
                  </h2>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {users.map((user) => (
              <div key={user._id} className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/2 relative cursor-pointer" onClick={() => openModal(user.profileIdPicture)}>
                    <img
                      src={user.profileIdPicture}
                      alt="ID Picture"
                      className={`w-full h-auto object-cover border-2 border-gray-300 rounded-md ${user.isVerified ? "opacity-50" : ""}`}
                    />
                    {user.isVerified && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-green-500 text-lg font-bold">
                        <div className="flex flex-col items-center">
                          <span>Verified</span>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="w-full md:w-1/2 cursor-pointer" onClick={() => openModal(user.profilePicture)}>
                    <img
                      src={user.profilePicture}
                      alt="Profile"
                      className="w-full h-auto object-cover border-2 border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">{user.fullname}</h3>
                  <p className="text-sm text-gray-600">Email: {user.email}</p>
                  <p className="text-sm text-gray-600">Phone: {user.phone}</p>
                  <p className="text-sm text-gray-600">Occupation: {user.occupation}</p>
                  <p className="text-sm text-gray-600">Degree: {user.degree}</p>
                  <p className="text-sm text-gray-600">University: {user.university}</p>
                  <p className="text-sm text-gray-600">Address: {user.address}</p>
                  <p className="text-sm text-gray-600">City: {user.city}</p>
                  <p className="text-sm text-gray-600">Country: {user.country}</p>
                  {user.facebookLink && (
                    <p className="text-sm text-gray-600">
                      Facebook: <a href={user.facebookLink} className="text-blue-500" target="_blank" rel="noopener noreferrer">{user.facebookLink}</a>
                    </p>
                  )}
                  {user.linkedInLink && (
                    <p className="text-sm text-gray-600">
                      LinkedIn: <a href={user.linkedInLink} className="text-blue-500" target="_blank" rel="noopener noreferrer">{user.linkedInLink}</a>
                    </p>
                  )}
                  <button
                    onClick={() => handleVerifyUser(user._id)}
                    className={`mt-4 ${user.isVerified ? "bg-green-500" : "bg-blue-500"} text-white px-4 py-2 rounded-md w-full`}
                  >
                    {user.isVerified ? "Verified" : "Verify"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Image Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>
            <Button color="danger" onPress={() => onOpenChange(false)}>
              Close
            </Button>
          </ModalHeader>
          <ModalBody>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Full Screen"
                className="w-full h-auto object-contain"
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AdminPage;
