import React from "react";
import { useForm} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Link } from "react-router-dom";

const Form = () => {

    const validationSchema = yup
        .object().shape({
            name: yup.string().required('Name is required field'),
            date_of_birth_and_age: yup.string().required('DOB is required field'),
            gender: yup.string().required('Please select gender'),
            mobile: yup.string().matches(/^([0]|\+91)?[789]\d{9}$/, 'Phone number is not valid').min(10, "Phone number must be of minimum 10 digits").max(10, "Phone number must be of 10 digits only"),
            emergency_contact_number: yup.string().matches(/^([0]|\+91)?[789]\d{9}$/, 'Phone number is not valid').min(10, "Phone number must be of minimum 10 digits").max(10, "Phone number must be of 10 digits only"),
            aadhar: yup.string().required('Please enter Aadhar').matches(/^([0-9]{4}[0-9]{4}[0-9]{4}$)|([0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|([0-9]{4}-[0-9]{4}-[0-9]{4}$)/, 'Aadhar is required and must be a 12-digit number only.'),
            pan: yup.string().required('Please enter PAN').matches(/^[A-Z]{5}\d{4}[A-Z]{1}$/, 'PAN is required and must be 10-digit alpha-numeric only .')
        })
        .required();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });
    const idType = watch("idType");

    const submitDetails = async (data) => {
        console.log(data);
        try {
            axios
                .post("http://localhost:8000/formdetails", data)
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="p-5 m-5 border-gray-500 rounded border-2 bg-gray-100">
            <form onSubmit={handleSubmit(submitDetails)}>
                <div>
                    <h2 className="underline font-bold">Personal Details</h2>
                    <div className="grid grid-cols-3 mt-4">
                        <div>
                            <label htmlFor="name">
                                Name<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Name"
                                className="border-gray-400 border-2 rounded px-1 ml-3"
                                {...register("name", { required: true })}
                            />
                            {errors.name && (
                                <div className="text-red-500">{errors.name.message}</div>
                            )}
                        </div>
                        <div>
                            <label htmlFor="date_of_birth_and_age">
                                Date of Birth or Age<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="DD/MM/YYYY or Age in years"
                                className="border-gray-400 border-2 rounded px-1 w-64 ml-3"
                                {...register("date_of_birth_and_age")}
                            />
                            {errors.date_of_birth_and_age && (
                                <div className="text-red-500">
                                    {errors.date_of_birth_and_age.message}
                                </div>
                            )}
                        </div>
                        <div>
                            <label htmlFor="gender">
                                Sex<span className="text-red-500">*</span>
                            </label>
                            <select
                                type="text"
                                placeholder="Enter Sex"
                                className="border-gray-400 border-2 rounded px-1 w-44 ml-3"
                                {...register("gender")}
                            >
                                <option value=""></option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="others">Others</option>
                            </select>
                            {errors.gender && (
                                <div className="text-red-500">{errors.gender.message}</div>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-3 mt-7 mb-4">
                        <div>
                            <label htmlFor="mobile">Mobile</label>
                            <input
                                type="text"
                                placeholder="Enter Mobile"
                                className="border-gray-400 border-2 rounded px-1 ml-3"
                                {...register("mobile")}
                            />
                            {errors.mobile && (
                                <div className="text-red-500">{errors.mobile.message}</div>
                            )}
                        </div>
                        <div>
                            <label htmlFor="idType">Govt Issued ID</label>
                            <select
                                name="idType"
                                defaultValue=''
                                className="border-gray-400 border-2 rounded px-1 w-24 mr-2 ml-3"
                                {...register("idType")}
                            >
                                <option></option>
                                <option value="Aadhar">Aadhar</option>
                                <option value="PAN">PAN</option>
                            </select>
                           
                        </div>
                        {idType === "Aadhar" ? (
                            <div>
                                <label htmlFor="aadhar">Aadhar number:</label>
                                <input
                                    type="text"
                                    placeholder="Enter Aadhar Number"
                                    className="border-gray-400 border-2 rounded px-1 ml-3"
                                    id="aadhar"
                                    {...register("aadhar")}
                                />
                                {errors.aadhar && (
                                    <span className="text-red-500">{errors.aadhar.message}</span>
                                )}
                            </div>
                        ) : (
                            <div>
                                <label htmlFor="pan">PAN number:</label>
                                <input
                                    type="text"
                                    placeholder="Enter PAN"
                                    className="border-gray-400 border-2 rounded px-1 ml-3"
                                    id="pan"
                                    {...register("pan")}
                                />
                                {errors.pan && (
                                    <span className="text-red-500">{errors.pan.message}</span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <h2 className="underline font-bold">Contact Details</h2>
                    <div className="grid grid-cols-3 mt-4 mb-4">
                        <div>
                            <label htmlFor="gurdian_detail">Guardian Details</label>
                            <select
                                type="text"
                                defaultValue="Guardian Details"
                                className="border-gray-400 border-2 rounded px-1 w-20 ml-3"
                                {...register("guardian_detail")}
                            >
                                <option></option>
                                <option>Mr.</option>
                                <option>Ms.</option>
                                <option>Mrs.</option>
                            </select>
                            <input
                                type="text"
                                placeholder="Enter Guardian Name"
                                className="border-gray-400 border-2 rounded px-1 ml-3"
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                placeholder=""
                                className="border-gray-400 border-2 rounded px-1 w-64 ml-3"
                                {...register("email")}
                            />
                        </div>
                        <div className="-mx-8">
                            <label htmlFor="emergency_contact_number">
                                Emergency Contact Number
                            </label>
                            <input
                                type="number"
                                placeholder="Emergency Contact Number"
                                className="border-gray-400 border-2 rounded px-1 w-50 ml-3"
                                {...register("emergency_contact_number")}
                            />
                            {errors.mobile && (
                                <div className="text-red-500">{errors.emergency_contact_number.message}</div>
                            )}
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="underline font-bold">Address Details</h2>
                    <div className="grid grid-cols-3 mt-4 ">
                        <div>
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                placeholder="Enter Address"
                                className="border-gray-400 border-2 rounded px-1 ml-3"
                                {...register("address")}
                            />
                        </div>
                        <div>
                            <label htmlFor="state">State</label>
                            <select
                                type="text"
                                placeholder="Enter State"
                                className="border-gray-400 border-2 rounded px-1 w-64 ml-3"
                                {...register("state")}
                            >
                                <option value=""></option>
                                <option value="up">Uttar Pradesh</option>
                                <option value="mp">Madhya Pradesh</option>
                                <option value="guj ">Gujarat</option>
                                <option value="tn ">Tamil Nadu</option>
                                <option value="ut">Uttarakhand</option>
                                <option value="kt">Karnataka</option>

                            </select>
                        </div>
                        <div>
                            <label htmlFor="city">City</label>
                            <select
                                type="text"
                                defaultValue="Enter City"
                                className="border-gray-400 border-2 rounded px-1 w-64 ml-3"
                                {...register("city")}
                            >
                                <option value=""></option>
                                <option value="ag">Agra</option>
                                <option value="nd">Noida</option>
                                <option value="mt">Meerut</option>
                                <option value="vn">Varanasi</option>
                                <option value="pg">Prayagraj</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 mt-7 mb-4">
                        <div>
                            <label htmlFor="country">Country</label>
                            <input
                                type="text"
                                placeholder=""
                                className="border-gray-400 border-2 rounded px-1 ml-3"
                                {...register("country")}
                            />
                        </div>
                        <div>
                            <label htmlFor="pincode">Pincode</label>
                            <input
                                type="number"
                                placeholder="Enter Pincode"
                                className="border-gray-400 border-2 rounded px-1 w-64 ml-3"
                                {...register("pincode")}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="underline font-bold">Other Details</h2>
                    <div className="grid grid-cols-3 mt-4">
                        <div>
                            <label htmlFor="occupation">Occupation</label>
                            <input
                                type="text"
                                placeholder="Enter Occupation"
                                className="border-gray-400 border-2 rounded px-1 ml-3"
                                {...register("occupation")}
                            />
                        </div>
                        <div>
                            <label htmlFor="religion">Religion</label>
                            <select
                                type="text"
                                className="border-gray-400 border-2 rounded px-1 w-64 ml-3"
                                {...register("religion")}
                            >

                                <option value=""></option>
                                <option value="hn">Hinduism</option>
                                <option value="sk">Sikhism</option>
                                <option value="ct">Christianity</option>
                                <option value="jn">Jainism</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="marital_status">Marital Status</label>
                            <select
                                type="text"
                                className="border-gray-400 border-2 rounded px-1 ml-3"
                                {...register("marital_status")}
                            >

                                <option value=""></option>
                                <option value="md">Married</option>
                                <option value="sl">Single</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 mt-4">
                        <div>
                            <label htmlFor="blood_group">Blood Group</label>
                            <select
                                type="text"
                                placeholder=""
                                className="border-gray-400 border-2 rounded px-1 ml-3"
                                {...register("blood_group")}
                            >
                                <option value=""></option>
                                <option value="a">A</option>
                                <option value="b">B</option>
                                <option value="ab">AB</option>
                                <option value="o">O</option>

                            </select>
                        </div>
                        <div>
                            <label htmlFor="nationality">Nationality</label>
                            <input
                                type="text"
                                placeholder=""
                                className="border-gray-400 border-2 rounded px-1 w-64 ml-3"
                                {...register("nationality")}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-5 mt-5 px-20">
                    <button
                        onClick={submitDetails}
                        type="submit"
                        className="border-green-700 bg-green-700 text-white border-2 px-3 py-1 rounded"
                    >
                        Submit
                    </button>
                    <button className="border-green-700 bg-green-700 text-white border-2 px-3 py-1 rounded">
                        <Link to="/userdata" className="">
                            Check saved users
                        </Link>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Form;
