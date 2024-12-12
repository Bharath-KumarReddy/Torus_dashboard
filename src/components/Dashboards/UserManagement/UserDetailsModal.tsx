import { FaTimes } from 'react-icons/fa';

const UserDetailsModal = ({ userDetails, onClose }: any) => {
  if (!userDetails) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96 max-w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">User Details</h3>
          <button onClick={onClose} className="text-white bg-red-700 hover:text-gray-800">
            <FaTimes />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-semibold">First Name:</span>
            <span>{userDetails.FirstName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Email:</span>
            <span>{userDetails.Email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Status:</span>
            <span>{userDetails.Status}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Age:</span>
            <span>{userDetails.Age}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Phone No:</span>
            <span>{userDetails.ContactNo}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Address:</span>
            <span>{userDetails.Address}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Region:</span>
            <span>{userDetails.Region}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Registered Date:</span>
            <span>{userDetails.RegisterDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
