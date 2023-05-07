import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { states, cities, gender, GID, salutation, religion, m_status, b_group } from './data'
import { Link } from 'react-router-dom';

const Form = () => {

    const phoneRegExp = /^([0]|\+91)?[789]\d{9}$/

    const validationSchema = yup.object({
        name: yup.string().required('Name is required field'),
        date_of_birth_and_age: yup.string().required('DOB is required field'),
        gender: yup.string().required('Please select gender'),
        mobile: yup.string().matches(phoneRegExp, 'Phone number is not valid').min(10, "Phone number must be of minimum 10 digits").max(10, "Phone number must be of 10 digits only"),

    }).required();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });


    const submitDetails = async (data) => {
        console.log(data)
        try {
            axios.post('http://localhost:8000/formdetails', data).then((res) => console.log(res)).catch((err)=>console.log(err))
        }
        catch (err) {
            console.log(err)
        }
    }

    // const submitDetails = async (data) => {

    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: data
    //     };

    //     console.log(data)

    //     const response = await fetch('http://localhost:8000/formdetails', requestOptions);
    //     const jsonData = await response.json();

    //     console.log(jsonData);
    // }


    return (
        <div className='p-5 m-5 border-gray-500 rounded border-2 bg-gray-100'>
            <form onSubmit={handleSubmit(submitDetails)}
            // method='post'
            // action='http://localhost:8000/formdetails'
            >
                <div>
                    <h2 className='underline font-bold'>Personal Details</h2>
                    <div className='grid grid-cols-3 mt-4'>
                        <div>
                            <label htmlFor="name">Name<span className='text-red-500'>*</span></label>
                            <input type="text" placeholder='Enter Name' className='border-gray-400 border-2 rounded px-1 ml-3' {...register('name', { required: true })} />
                            {errors.name && <div className='text-red-500'>{errors.name.message}</div>}
                        </div>
                        <div>
                            <label htmlFor="date_of_birth_and_age">Date of Birth or Age<span className='text-red-500'>*</span></label>
                            <input type="text" placeholder='DD/MM/YYYY or Age in years' className='border-gray-400 border-2 rounded px-1 w-64 ml-3' {...register('date_of_birth_and_age')} />
                            {errors.date_of_birth_and_age && <div className='text-red-500'>{errors.date_of_birth_and_age.message}</div>}
                        </div>
                        <div>
                            <label htmlFor="gender">Sex<span className='text-red-500'>*</span></label>
                            <select type="text" defaultValue='Enter Sex' className='border-gray-400 border-2 rounded px-1 w-44 ml-3' {...register('gender')}>
                                <option defaultValue="Enter Sex">Enter Sex</option>
                                {gender.map((gender, index) => (
                                    <option key={index} value={gender.name}>{gender.value}</option>
                                ))}
                            </select>
                            {errors.gender && <div className='text-red-500'>{errors.gender.message}</div>}
                        </div>
                    </div>
                    <div className='grid grid-cols-3 mt-7 mb-4'>
                        <div>
                            <label htmlFor="mobile">Mobile</label>
                            <input type="text" placeholder='Enter Mobile' className='border-gray-400 border-2 rounded px-1 ml-3' {...register('mobile')} />
                            {errors.mobile && <div className='text-red-500'>{errors.mobile.message}</div>}
                        </div>
                        <div>
                            <label htmlFor="gid">Govt Issued ID</label>
                            <select type="text" placeholder='ID Type' className='border-gray-400 border-2 rounded px-1 w-24 mr-2 ml-3' {...register('gid')}>
                                <option defaultValue="Enter ">ID Type</option>
                                {GID.map((GID, index) => (
                                    <option key={index} value={GID.name}>{GID.value}</option>
                                ))}
                            </select>
                            <input type="text" placeholder='Enter Govt ID' className='border-gray-400 border-2 rounded px-1 w-52' />
                        </div>

                    </div>
                </div>
                <div>
                    <h2 className='underline font-bold'>Contact Details</h2>
                    <div className='grid grid-cols-3 mt-4 mb-4'>
                        <div>
                            <label htmlFor="gurdian_detail">Guardian Details</label>
                            <select type="text" defaultValue='Guardian Details' className='border-gray-400 border-2 rounded px-1 w-20 ml-3' {...register('guardian_detail')}>
                                
                                {salutation.map((salutation, index) => (
                                    <option key={index} value={salutation.name}>{salutation.value}</option>
                                ))}
                            </select>
                            <input type="text" placeholder='Enter Guardian Name' className='border-gray-400 border-2 rounded px-1 ml-3' />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="text" placeholder='' className='border-gray-400 border-2 rounded px-1 w-64 ml-3' {...register('email')} />
                        </div>
                        <div>
                            <label htmlFor="emergency_contact_number" className='w-10'>Emergency Contact Number</label>
                            <input type="number" placeholder='Emergency Contact Number' className='border-gray-400 border-2 rounded px-1 w-60 ml-3' {...register('emergency_contact_number')} />
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className='underline font-bold'>Address Details</h2>
                    <div className='grid grid-cols-3 mt-4 '>
                        <div>
                            <label htmlFor="address">Address</label>
                            <input type="text" placeholder='Enter Address' className='border-gray-400 border-2 rounded px-1 ml-3' {...register('address')} />
                        </div>
                        <div>
                            <label htmlFor="state">State</label>
                            <select type="text" placeholder='Enter State' className='border-gray-400 border-2 rounded px-1 w-64 ml-3' {...register('state')}>
                                <option value="Enter state">Enter state</option>
                                {states.map((state, index) => (
                                    <option key={index} value={state.name}>{state.value}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="city">City</label>
                            <select type="text" defaultValue='Enter City' className='border-gray-400 border-2 rounded px-1 w-64 ml-3' {...register('city')}>

                                {cities.map((city, index) => (
                                    <option key={index} value={city.name}>{city.value}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='grid grid-cols-3 mt-7 mb-4'>
                        <div>
                            <label htmlFor="country">Country</label>
                            <input type="text" placeholder='' className='border-gray-400 border-2 rounded px-1 ml-3' {...register('country')} />
                        </div>
                        <div>
                            <label htmlFor="pincode">Pincode</label>
                            <input type="number" placeholder='Enter Pincode' className='border-gray-400 border-2 rounded px-1 w-64 ml-3' {...register('pincode')} />
                        </div>

                    </div>
                </div>
                <div>
                    <h2 className='underline font-bold'>Other Details</h2>
                    <div className='grid grid-cols-3 mt-4'>
                        <div>
                            <label htmlFor="occupation">Occupation</label>
                            <input type="text" placeholder='Enter Occupation' className='border-gray-400 border-2 rounded px-1 ml-3' {...register('occupation')} />
                        </div>
                        <div>
                            <label htmlFor="religion">Religion</label>
                            <select type="text" placeholder='Enter Religion' className='border-gray-400 border-2 rounded px-1 w-64 ml-3' {...register('religion')}>
                                <option value="Enter state">Enter Religion</option>
                                {religion.map((religion, index) => (
                                    <option key={index} value={religion.name}>{religion.value}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="marital_status">Marital Status</label>
                            <select type="text"  className='border-gray-400 border-2 rounded px-1 ml-3' {...register('marital_status')}>
                                <option defaultValue="Enter state">Enter Marital Status</option>
                                {m_status.map((m_status, index) => (
                                    <option key={index} value={m_status.name}>{m_status.value}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='grid grid-cols-3 mt-4'>
                        <div>
                            <label htmlFor="blood_group">Blood Group</label>
                            <select type="text" placeholder='' className='border-gray-400 border-2 rounded px-1 ml-3' {...register('blood_group')}>
                                <option value="Enter state">Enter Blood Group</option>
                                {b_group.map((b_group, index) => (
                                    <option key={index} value={b_group.name}>{b_group.value}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="nationality">Nationality</label>
                            <input type="text" placeholder='' className='border-gray-400 border-2 rounded px-1 w-64 ml-3' {...register('nationality')} />
                        </div>
                    </div>
                </div>
                <div className='flex justify-end gap-5 mt-5 px-20'>
                    <button onClick={submitDetails} type='submit' className='border-green-700 bg-green-700 text-white border-2 px-3 py-1 rounded'>Submit</button>
                    <button className='border-green-700 bg-green-700 text-white border-2 px-3 py-1 rounded'><Link to='/userdata' className=''>Check saved users</Link></button>
                </div>
            </form>
        </div>

    )
}

export default Form