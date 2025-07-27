import React, { useContext, useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
    const [showPassword,setShowPassword] = useState(false)
    const [errors, setErrors] = useState({})
        const [isSubmitting, setIsSubmitting] = useState(false);
    const [data,setData] = useState({
        email : "",
        password : ""
    })
    const navigate = useNavigate()
    const { fetchUserDetails, fetchUserAddToCart } = useContext(Context)

    const handleOnChange = (e) =>{
        const { name , value } = e.target

        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
        setErrors({})
    }

    const validateConfig = {
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


    const handleSubmit = async(e) =>{
        e.preventDefault()
        const formResult = validatForm(data)
        if (Object.keys(formResult).length) return

        try {
            setIsSubmitting(true)
            const dataResponse = await fetch(SummaryApi.signIn.url,{
            method : SummaryApi.signIn.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
        })

        const dataApi = await dataResponse.json()

        if(dataApi.success){
            toast.success(dataApi.message)
            navigate('/')
            fetchUserDetails()
            fetchUserAddToCart()
        }

        if(dataApi.error){
            toast.error(dataApi.message)
        }
        } catch (error) {
            toast.error("Login failed")
        }finally {
                setIsSubmitting(false)
            }

    }

    // console.log("data login",data)
    
  return (
    <section id='login'>
        <div className='mx-auto container p-4'>

            <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                    <div className='w-20 h-20 mx-auto'>
                        <img src={loginIcons} alt='login icons'/>
                    </div>

                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                        <div className='grid relative'>
                            <label>Email : </label>
                            <div className='bg-slate-100 p-2 mt-[12px]'>
                                <input 
                                    type='email' 
                                    placeholder='enter email' 
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent'/>
                            </div>
                            <p className="absolute top-4 text-red-500 text-[14px]">{errors.email}</p>
                        </div>

                        <div className='relative'>
                            <label>Password : </label>
                            <div className='bg-slate-100 p-2 flex mt-[14px]'>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder='enter password'
                                    value={data.password}
                                    name='password' 
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent'/>
                                <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((preve)=>!preve)}>
                                    <span>
                                        {
                                            showPassword ? (
                                                <FaEyeSlash/>
                                            )
                                            :
                                            (
                                                <FaEye/>
                                            )
                                        }
                                    </span>
                                </div>
                            </div>
                            <p className="absolute top-4 text-red-500 text-[14px]">{errors.password}</p>
                            <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-600'>
                                Forgot password ?
                            </Link>
                        </div>

                        <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6' disabled={isSubmitting}>{isSubmitting ? "LoggingIn" : "Login in"}</button>

                    </form>

                    <p className='my-5'>Don't have account ? <Link to={"/sign-up"} className=' text-red-600 hover:text-red-700 hover:underline'>Sign up</Link></p>
            </div>


        </div>
    </section>
  )
}

export default Login