// import loggedin from "@/redux/slices/loggedin"
import { login, logout, selectUser } from "@/feature/userSlice"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
// import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"


// import loggedin from './../redux/slices/loggedin/index';






export const LoginForm = () => {


    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm()


    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(selectUser);

    const setCookie = (name, value, days) => {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    const onSubmit = async (data) => {
        console.log("the oobject is ", data)

        const options = {
            method: "POST",
            body: JSON.stringify({
                email: data.email,
                password: data.password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            const token = document.cookie;
            if (token) {
                dispatch(login({
                    isauthenticated: true
                }))
                navigate('/')
            }
            const response = await fetch('https://codebreakdown-backend.onrender.com/users/signin', options)
            const data = await response.json()
            console.log(data)

            // If the use succefully loged in 
            if (!data.message) {
                // console.log(data.message)
                setCookie("values", data.token, 7);
                dispatch(login({
                    email: data.email,
                    password: data.password,
                    isauthenticated: true
                }))
                navigate('/')
            }
            //if the user Fails to login
            let messages = document.querySelector(".div")
            let hm1 = document.querySelector('.p');
            hm1.innerText = data.message;
            messages.append(hm1)

        } catch (error) {
            console.log(error)
        }

    }


    // watch input value by passing the name of it
    const okSubmit = async () => {
        dispatch(logout())
        navigate('/')
    }
    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */

        <div>
            {user
                ? <div className="h-[100vh] w-[100vw] flex flex-col justify-center bg-purple-400 items-center text-black ">
                    {/* register your input into the hook by invoking the "register" function */}
                    <div className="min-h-screen bg-purple-400 flex justify-center items-center" >
                        <div className="absolute w-60 h-60 rounded-xl bg-purple-300 -top-5 -left-16 z-0 transform rotate-45 hidden md:block"></div>
                        <div className="absolute w-48 h-48 rounded-xl bg-purple-300 bottom-0 right-0 transform rotate-12 hidden md:block"></div>
                        <form className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20" onSubmit={handleSubmit(okSubmit)}>
                            <div>
                                <h1 className="text-3xl font-bold text-black text-center mb-4 cursor-pointer">Logout Account</h1>
                                <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">Thanks For enjoying Our services</p>
                            </div>
                            <div className="text-center mt-6">
                                <button className="w-full py-2  text-xl text-white bg-purple-400 rounded-xl hover:bg-purple-500 transition-all">Logout</button>
                            </div>
                        </form>
                        <div className="w-40 h-40 absolute bg-purple-300 rounded-full top-0 right-12 hidden md:block"></div>
                        <div className="w-20 h-40 absolute bg-purple-300 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block"></div>
                    </div>
                </div>
                :
                <div className="h-[100vh] w-[100vw] flex flex-col justify-center bg-purple-400 items-center text-black ">
                    {/* register your input into the hook by invoking the "register" function */}
                    <div className="min-h-screen bg-purple-400 flex justify-center items-center" >
                        <div className="absolute w-60 h-60 rounded-xl bg-purple-300 -top-5 -left-16 z-0 transform rotate-45 hidden md:block"></div>
                        <div className="absolute w-48 h-48 rounded-xl bg-purple-300 bottom-0 right-0 transform rotate-12 hidden md:block"></div>
                        <form className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20" onSubmit={handleSubmit(onSubmit)}>
                            <div >
                                <h1 className="text-3xl font-bold text-black text-center mb-4 cursor-pointer">Login to Account</h1>
                                <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">Create an account to enjoy all the services for free!</p>
                                <div className="div">
                                    <p className="p text-[#FF0000] text-center mb-2"></p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <input type="email" placeholder="Email Address" {...register("email", { required: true })} className="block text-sm py-3 bg-[#eaeaf0] px-4 rounded-lg w-full border outline-purple-500" />
                                {errors.email && <span className="text-[#FF0000]">*This field is required</span>}
                                <input type="password" placeholder="Password" {...register("password", { required: true })} className="block text-sm py-3 bg-[#eaeaf0] px-4 rounded-lg w-full border outline-purple-500" />
                                {errors.password && <span className="text-[#FF0000]">*This field is required</span>}
                            </div>
                            <div className="text-center mt-6">
                                <input disabled={isSubmitting} className="w-full py-2 font-bold text-xl text-white bg-purple-400 rounded-xl hover:bg-purple-500 transition-all" type="submit" value="Login" />
                                <p className="mt-4 text-sm">Doesn&apos;t Have An Account? <Link to='/signup'>
                                    <span className="underline  cursor-pointer"> Register</span></Link></p>
                            </div>
                        </form>
                        <div className="w-40 h-40 absolute bg-purple-300 rounded-full top-0 right-12 hidden md:block"></div>
                        <div className="w-20 h-40 absolute bg-purple-300 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block"></div>
                    </div>
                </div>

            }
        </div>
    )
}