import Lottie from "react-lottie"
import Animation from "../assets/Animation.json"
const Loader = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Animation, // Pass the animation JSON data
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    return (
        <Lottie
            options={defaultOptions}
            height={400} // Set height of the animation
            width={400} // Set width of the animation
        />
    )
}

export default Loader