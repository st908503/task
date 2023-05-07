import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';


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
            name: 'Name',
            selector: row => row.name
        },
        {
            date_of_birth_or_age: 'Age',
            selector: row => row.date_of_birth_or_age
        },
        {
            gender: 'Sex',
            selector: row => row.gender
        },
        {
            mobile: 'Mobile',
            selector: row => row.mobile
        },
        {
            address: 'Address',
            selector: row => row.address
        },
        {
            government_id: 'Govt ID',
            selector: row => row.government_id
        },
        {
            gurdian_detail: 'Guardian Details',
            selector: row => row.gurdian_detail
        },
        {
            nationality: 'Nationality',
            selector: row => row.nationality
        },
    ]

    return (
        <>
            <div className='flex mt-20 flex-col items-center'>

                <h1 className='font-bold text-2xl'>UserData</h1>
            </div>
            <DataTable columns={columns} data={userDetails} pagination />

            <Link to='/'><button className='border-green-700 bg-green-700 text-white border-2 px-3 py-1 absolute mt-10 right-10 rounded'>Back to Form</button></Link>
        </>
    )
}

export default UserData



