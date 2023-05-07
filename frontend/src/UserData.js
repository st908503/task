import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';


const UserData = () => {

    const [userDetails, setUserDetails] = useState([])

    async function logJSONData() {
        try {
            const response = await fetch("http://localhost:8000/results");
            const jsonData = await response.json();
           setUserDetails(jsonData.userDetails);
        }
        catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        logJSONData()
    }, [])

    const columns = [
        {
            name: 'Enter name',
            selector: row => row.name
        },
        {
            date_of_birth_and_age: 'Enter Age',
            selector: row => row.age
        },
        {
            mobile: 'Enter Mobile',
            selector: row => row.mobile
        },
        {
            address: 'Enter Address',
            selector: row => row.address
        },
        {
            nationality: 'Enter Nationality',
            selector: row => row.nationality
        },
    ]

    return (
        <>
            <div className='flex flex-col items-center'>

                <h1>UserData</h1>
            </div>
            <DataTable columns={columns} data={userDetails} pagination />
        </>
    )
}

export default UserData



