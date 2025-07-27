import React, { useContext, useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        confirmPassword: "",
        profilePic: "",
    })
    const { fetchUserDetails, fetchUserAddToCart } = useContext(Context)
    const navigate = useNavigate()

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
        setErrors({})
    }

    const handleUploadPic = async (e) => {
        const file = e.target.files[0]

        const imagePic = await imageTobase64(file)

        setData((preve) => {
            return {
                ...preve,
                profilePic: imagePic
            }
        })

    }

    const validateConfig = {
        name: [
            { required: true, message: "Please enter your Name!" },
            { minLength: 3, message: "Name must contain at least 3 Characters!" }
        ],
        email: [
            { required: true, message: "Please enter your Email!" },
            { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter a valid email address" }
        ],
        password: [
            { required: true, message: "Please enter your Password!" },
            { pattern: /^(?=.*[A-Z])(?=.*\d).+$/, message: "Password must be 8+ chars with 1 capital & 1 number" }
        ]
    }
    // console.log("data", data)

    const validatForm = (data) => {
        let errorObj = {}
        Object.entries(data).forEach(([key, value]) => {
            const rules = validateConfig[key]
            if (!rules) return
            validateConfig[key].some((rule) => {
                if (rule.required && !value) {
                    errorObj[key] = rule.message
                    return true;
                }
                if (rule.minLength && value.length < rule.minLength) {
                    errorObj[key] = rule.message
                    return true;
                }
                if (rule.pattern && !rule.pattern.test(value)) {
                    errorObj[key] = rule.message
                    return true
                }
            })
        })
        setErrors(errorObj)
        return errorObj;
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        const formResult = validatForm(data)
        if (Object.keys(formResult).length) return

        if (data.password === data.confirmPassword) {
            try {
                setIsSubmitting(true)
                const dataResponse = await fetch(SummaryApi.signUP.url, {
                    method: SummaryApi.signUP.method,
                    credentials: 'include',
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(data)
                })

                const dataApi = await dataResponse.json()

                if (dataApi.success) {
                    toast.success(dataApi.message)
                    navigate("/")
                    fetchUserDetails()
                    fetchUserAddToCart()
                }

                if (dataApi.error) {
                    toast.error(dataApi.message)
                }
            } catch (error) {
                toast.error("Registration failed")
            } finally {
                setIsSubmitting(false)
            }


        } else {
            toast.error("Please check password and confirm password")
        }

    }

    return (
        <section id='signup'>
            <div className='mx-auto container p-4'>

                <div className='bg-white p-5 w-full max-w-sm mx-auto'>

                    <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                        <div>
                            <img src={data.profilePic || loginIcons} alt='login icons' />
                        </div>
                        <form>
                            <label>
                                <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                                    Upload  Photo
                                </div>
                                <input type='file' className='hidden' onChange={handleUploadPic} />
                            </label>
                        </form>
                    </div>

                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit} noValidate>
                        <div className='grid relative'>
                            <label>Name : </label>
                            <div className='bg-slate-100 p-2 mt-[12px] '>
                                <input
                                    type='text'
                                    placeholder='enter your name'
                                    name='name'
                                    value={data.name}
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent' />
                            </div>
                            <p className="absolute top-4 text-red-500 text-[14px]">{errors.name}</p>
                        </div>
                        <div className='grid relative'>
                            <label>Email : </label>
                            <div className='bg-slate-100 p-2  mt-[12px]'>
                                <input
                                    type='email'
                                    placeholder='enter email'
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent' />
                            </div>
                                <p className="absolute top-4 text-red-500 text-[14px]">{errors.email}</p>
                        </div>

                        <div className='relative'>
                            <label>Password : </label>
                            <div className='bg-slate-100 p-2 flex  mt-[12px]'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder='enter password'
                                    value={data.password}
                                    name='password'
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent' />
                                <div className='cursor-pointer text-xl' onClick={() => setShowPassword((preve) => !preve)}>
                                    <span>
                                        {
                                            showPassword ? (
                                                <FaEyeSlash />
                                            )
                                                :
                                                (
                                                    <FaEye />
                                                )
                                        }
                                    </span>
                                </div>
                                <p className="absolute top-4 text-red-500 text-[14px]">{errors.password}</p>
                            </div>
                        </div>

                        <div className='relative'>
                            <label>Confirm Password : </label>
                            <div className='bg-slate-100 p-2 flex mt-[12px]'>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder='enter confirm password'
                                    value={data.confirmPassword}
                                    name='confirmPassword'
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent' />

                                <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((preve) => !preve)}>
                                    <span>
                                        {
                                            showConfirmPassword ? (
                                                <FaEyeSlash />
                                            )
                                                :
                                                (
                                                    <FaEye />
                                                )
                                        }
                                    </span>
                                </div>
                                <p className="absolute top-4 text-red-500 text-[14px]">{errors.password}</p>
                            </div>
                        </div>

                        <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6' disabled={isSubmitting}>{isSubmitting ? "SigningUp..." : "Sign up"}</button>

                    </form>

                    <p className='my-5'>Already have account ? <Link to={"/login"} className=' text-red-600 hover:text-red-700 hover:underline'>Login</Link></p>
                </div>


            </div>
        </section>
    )
}

export default SignUp