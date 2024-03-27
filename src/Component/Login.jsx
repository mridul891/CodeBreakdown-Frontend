import { useForm } from "react-hook-form"
import { Navigate, useNavigate } from "react-router-dom"



export const LoginForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate()
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
            const respose = await fetch('http://localhost:8080/users/signin', options)
            if (respose) {
                navigate('/convert')
            }
        } catch (error) {
            console.log(error)
        }
    }
    // watch input value by passing the name of it


    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <div className="h-[100vh] w-[100vw] flex  flex-col justify-center items-center ">


            <h1 className="">Login</h1>

            <div className="">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* register your input into the hook by invoking the "register" function */}
                    <div className="">
                        <label htmlFor="email" className="font-semibold text-gray-600 py-2">Enter the Email</label>
                        <input name="email" type="email" className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"{...register("email", { required: true })} />
                    </div>


                    {/* include validation with required or other standard HTML validation rules */}
                    <div>
                        <label htmlFor="">Enter the Password</label>
                        <input type="password" {...register("password", { required: true })} />
                    </div>

                    {/* errors will return when field validation fails  */}
                    {errors.exampleRequired && <span>This field is required</span>}


                    <input type="submit" />
                </form>
            </div>

        </div>
    )
}