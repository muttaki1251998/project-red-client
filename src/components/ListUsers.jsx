import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { SearchIcon } from "@heroicons/react/solid"; // Importing Heroicons

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_BACKEND_API_URL}/users`,
          {
            headers: {
              "x-frontend-id": "project-red",
            },
          }
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    return (
      user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="container mx-auto py-8">
      {/* Search Bar */}
      <div className="flex justify-end mb-4">
        <div className="relative w-80">
          <input
            type="text"
            className="block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Search a name or a city"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* User Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredUsers.map((user) => (
          <Link href={`/user/${user._id}`} key={user._id} legacyBehavior>
            <a>
              <Card
                key={user._id}
                className="w-full h-full flex flex-row items-center p-4"
              >
                <div className="w-1/3">
                  <Image
                    alt={`${user.fullname} profile picture`}
                    className="object-cover rounded-xl"
                    src={user.profilePicture}
                    width={200}
                    height={200}
                  />
                </div>
                <div className="w-2/3 pl-4">
                  <CardHeader className="pb-0 pt-2 px-0 flex-col items-start">
                    <h4 className="text-xl">{user.fullname}</h4>
                    <small className="text-default-500">{user.degree}</small>
                    <p className="text-tiny uppercase font-bold">
                      {user.occupation}
                    </p>
                    <p className="text-tiny uppercase">{user.city}</p>
                    <p className="text-tiny uppercase">{user.country}</p>
                  </CardHeader>
                </div>
              </Card>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ListUsers;
