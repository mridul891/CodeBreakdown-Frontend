import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"



export const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const navigate = useNavigate()
  const onSubmit = async (data) => {
    console.log("the object is ", data)
    const options = {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }
    try {
      const respose = await fetch('https://codebreakdown-backend.onrender.com/users/signup', options)
      const data = await respose.json()
      console.log(data);
      if (data) {
        let messages = document.querySelector(".div")
        let hm1 = document.querySelector('.p');
        hm1.innerText = data.message;
        messages.append(hm1)
      }
    } catch (error) {
      console.log(error)
    }
  }
  // watch input value by passing the name of it


  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div className="h-[100vh] w-[100vw] flex flex-col justify-center bg-purple-400 items-center text-black ">
      {/* register your input into the hook by invoking the "register" function */}
      <div className="min-h-screen bg-purple-400 flex justify-center items-center" >
        <div className="absolute w-60 h-60 rounded-xl bg-purple-300 -top-5 -left-16 z-0 transform rotate-45 hidden md:block"></div>
        <div className="absolute w-48 h-48 rounded-xl bg-purple-300 bottom-0 right-0 transform rotate-12 hidden md:block"></div>
        <form className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h1 className="text-3xl font-bold text-black text-center mb-4 cursor-pointer">Create Account</h1>
            <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">Create an account to enjoy all the services for free!</p>
            <div className="div">
              <p className="p text-[#FF0000] text-center mb-2"></p>
            </div>
          </div>
          <div className="space-y-4">
            <input type="text" placeholder="name" {...register("name", { required: true })} className="block text-sm bg-[#eaeaf0] py-3 px-4 rounded-xl w-full border outline-purple-500" />
            {errors.name && <span className="text-[#FF0000]">*This field is required</span>}
            <input type="email" placeholder="Email Addres" {...register("email", { required: true })} className="block bg-[#eaeaf0] text-sm py-3 px-4 rounded-xl w-full border outline-purple-500" />
            {errors.email && <span className="text-[#FF0000]">*This field is required</span>}
            <input type="password" placeholder="Password" {...register("password", { required: true })} className="block bg-[#eaeaf0] text-sm py-3 px-4 rounded-xl w-full border outline-purple-500" />
            {errors.password && <span className="text-[#FF0000]">*This field is required</span>}

            {/* {errors.exampleRequired && <span>This field is required</span> */}
          </div>
          <div className="text-center mt-6">
            <input className="w-full py-2 font-bold text-xl text-white bg-purple-400 rounded-xl hover:bg-purple-500 transition-all" value="Register" type="submit" />
            <p className="mt-4 text-sm"> Have An Account?
              <Link to='/login'>
                <span className="underline cursor-pointer"> Login</span>
              </Link>
            </p>
          </div>
        </form>
        <div className="w-40 h-40 absolute bg-purple-300 rounded-full top-0 right-12 hidden md:block"></div>
        <div className="w-20 h-40 absolute bg-purple-300 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block"></div>
      </div>
    </div>
  )
}