import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUsers, detailUser } from "../../../state/ActionCreators/users";
import { RootState } from "../../../state/reducers";
import { FaEye, FaTrash, FaSearch } from "react-icons/fa";
import UserDetailsModal from "./UserDetailsModal";
import { toast, ToastContainer } from "react-toastify";
import Loading from "../../Loading";
import "react-toastify/dist/ReactToastify.css";

const UserManagement = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);
  const userDetails = useSelector((state: RootState) => state.user.userDetails);

  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);
  const usersPerPage = 5;

  useEffect(() => {
    dispatch<any>(listUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch<any>(listUsers());
  }, [!searchTerm]);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const handleSearch = () => {
    if (searchTerm) {
      const result = users.filter((user: any) => {
        const firstName = user.FirstName ? user.FirstName.toLowerCase() : "";
        const lastName = user.LastName ? user.LastName.toLowerCase() : "";
        const email = user.Email ? user.Email.toLowerCase() : "";

        return (
          firstName.includes(searchTerm.toLowerCase()) ||
          lastName.includes(searchTerm.toLowerCase()) ||
          email.includes(searchTerm.toLowerCase())
        );
      });
      setFilteredUsers(result);
    } else {
      setFilteredUsers(users);
    }
    setCurrentPage(1);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const openModal = (userId: number) => {
    dispatch<any>(detailUser(userId));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    toast.error("Currently User cannot be deleted");
  };

  return currentUsers.length >0 ? (

    
    <div className="flex flex-col justify-center items-center min-h-screen w-full bg-gray-900 px-4 sm:px-8 md:px-16 lg:px-24 lg:w-screen">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-white">
        Customers
      </h2>

      <div className="w-full md:w-4/5 max-w-full p-6 bg-white shadow-lg rounded-lg">
        <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
          <div className="relative w-full sm:w-2/3 lg:w-1/3 mb-4 sm:mb-0">
            <input
              type="text"
              className="px-4 py-2 pl-10 border rounded-md w-full"
              placeholder="Search or filter by Name or Email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800" />
          </div>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-lg font-medium text-gray-600">ID</th>
                <th className="px-4 py-3 text-left text-lg font-medium text-gray-600">FirstName</th>
                <th className="px-4 py-3 text-left text-lg font-medium text-gray-600">LastName</th>
                <th className="px-4 py-3 text-left text-lg font-medium text-gray-600">Email</th>
                <th className="px-4 py-3 text-left text-lg font-medium text-gray-600">Region</th>
                <th className="px-4 py-3 text-left text-lg font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="text-md text-gray-700">
              {currentUsers.map(
                (user: any) =>
                  user.ID ? (
                    <tr
                      key={user.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-4 break-all">{user.id}</td>
                      <td className="px-4 py-4 break-all">{user.FirstName}</td>
                      <td className="px-4 py-4 break-all">{user.LastName}</td>
                      <td className="px-4 py-4 break-all">{user.Email}</td>
                      <td className="px-4 py-4 break-all">{user.Region}</td>
                      <td className="px-4 py-4 flex flex-wrap space-x-2">
                        <button
                          className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center hover:bg-green-600 transition"
                          onClick={() => openModal(user.id)}
                        >
                          <FaEye className="mr-2" /> Details
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center hover:bg-red-600 transition"
                          onClick={handleDelete}
                        >
                          <FaTrash className="mr-2" /> Delete
                        </button>
                      </td>
                    </tr>
                  ) : null
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-center">
          {Array.from(
            { length: Math.ceil(filteredUsers.length / usersPerPage) },
            (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 mx-1 rounded-lg ${
                  currentPage === index + 1
                    ? "bg-green-500 text-white"
                    : "bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>

      {isModalOpen && (
        <UserDetailsModal userDetails={userDetails} onClose={closeModal} />
      )}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </div>
  ) : (
     
    <Loading/>
  );
};

export default UserManagement;
