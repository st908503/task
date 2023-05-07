import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

const UserData = () => {
  const [userDetails, setUserDetails] = useState([]);

  async function logJSONData() {
    try {
      const response = await fetch("http://localhost:8000/results");
      const jsonData = await response.json();
      setUserDetails(jsonData.userDetails);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    logJSONData();
  }, []);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      style: {
        borderRight: "1px solid gray",
        backgroundColor: "#f6f6f6",
      },
    },
    {
      name: "Age",
      selector: (row) => row.date_of_birth_or_age,
      sortable: true,
      style: {
        borderRight: "1px solid gray",
        backgroundColor: "#f6f6f6",
      },
    },
    {
      name: "Sex",
      selector: (row) => row.gender,
      style: {
        borderRight: "1px solid gray",
        backgroundColor: "#f6f6f6",
      },
    },
    {
      name: "Mobile",
      selector: (row) => row.mobile,
      style: {
        borderRight: "1px solid gray",
        backgroundColor: "#f6f6f6",
      },
    },
    {
      name: "Address",
      selector: (row) => row.address,
      style: {
        borderRight: "1px solid gray",
        backgroundColor: "#f6f6f6",
      },
    },
    {
      name: "Govt ID",
      selector: (row) => row.idType,
      cell: (row) => (
        <div>
          {row.idType === "pan" ? `PAN/${row.pan}` : `Aadhar/${row.aadhar}`}
        </div>
      ),
      style: {
        borderRight: "1px solid gray",
        backgroundColor: "#f6f6f6",
      },
    },
    {
      name: "Guardian Details",
      selector: (row) => row.guardian_details,
      style: {
        borderRight: "1px solid gray",
        backgroundColor: "#f6f6f6",
      },
    },
    {
      name: "Nationality",
      selector: (row) => row.nationality,
      style: {
        borderRight: "1px solid gray",
        backgroundColor: "#f6f6f6",
      },
    },
  ];

  return (
    <>
      <div className="flex mt-20 flex-col items-center">
        <h1 className="font-bold text-2xl mb-10">User Details</h1>
      </div>
      <div>
        <DataTable
          className="border-t border-gray-300"
          columns={columns}
          data={userDetails}
          pagination
          noHeader
        />
      </div>

      <Link to="/">
        <button className="border-green-700 bg-green-700 text-white border-2 px-3 py-1 absolute mt-10 right-10 rounded">
          Back to Form
        </button>
      </Link>
    </>
  );
};

export default UserData;
