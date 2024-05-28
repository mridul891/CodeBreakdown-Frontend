import { Button } from "@/components/ui/button";
import { selectUser } from "@/feature/userSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = useSelector(selectUser);

  return (
    <nav className="flex flex-col justify-start lg:flex-row lg:items-center lg:justify-between  lg:mx-10 lg:py-5  ">
      <svg
        width="80"
        height="42"
        viewBox="0 0 80 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M71.1666 20H47.8333M71.1666 20L62.4166 12M71.1666 20L62.4166 28"
          stroke="black"
          strokeWidth="5.25983"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="20" cy="21" r="7" stroke="black" strokeWidth="2" />
        <mask id="path-3-inside-1_1_41" fill="white">
          <path d="M40.0239 21.5C40.563 21.5 41.0024 21.9373 40.9768 22.4758C40.8146 25.8787 39.8065 29.1932 38.0369 32.1163C36.0986 35.3183 33.3206 37.9284 30.0042 39.6637C26.6879 41.399 22.9597 42.1932 19.224 41.9603C15.4884 41.7273 11.8878 40.476 8.8127 38.3421C5.73764 36.2082 3.30547 33.2732 1.77996 29.8552C0.254445 26.4373 -0.306195 22.6669 0.158838 18.953C0.623871 15.2391 2.09683 11.7234 4.41798 8.78707C6.53703 6.10644 9.28917 4.00216 12.4202 2.65943C12.9156 2.44696 13.4791 2.70559 13.6677 3.21058V3.21058C13.8564 3.71558 13.5987 4.27549 13.1043 4.49044C10.3068 5.70678 7.84743 7.59673 5.94945 9.99771C3.84934 12.6544 2.51665 15.8353 2.0959 19.1956C1.67515 22.5558 2.1824 25.9671 3.56265 29.0596C4.94289 32.152 7.14344 34.8076 9.92567 36.7383C12.7079 38.6689 15.9656 39.8011 19.3455 40.0118C22.7255 40.2226 26.0986 39.504 29.0991 37.934C32.0997 36.3639 34.6131 34.0024 36.3669 31.1054C37.9519 28.4872 38.8617 25.522 39.0221 22.4757C39.0505 21.9373 39.4848 21.5 40.0239 21.5V21.5Z" />
        </mask>
        <path
          d="M40.0239 21.5C40.563 21.5 41.0024 21.9373 40.9768 22.4758C40.8146 25.8787 39.8065 29.1932 38.0369 32.1163C36.0986 35.3183 33.3206 37.9284 30.0042 39.6637C26.6879 41.399 22.9597 42.1932 19.224 41.9603C15.4884 41.7273 11.8878 40.476 8.8127 38.3421C5.73764 36.2082 3.30547 33.2732 1.77996 29.8552C0.254445 26.4373 -0.306195 22.6669 0.158838 18.953C0.623871 15.2391 2.09683 11.7234 4.41798 8.78707C6.53703 6.10644 9.28917 4.00216 12.4202 2.65943C12.9156 2.44696 13.4791 2.70559 13.6677 3.21058V3.21058C13.8564 3.71558 13.5987 4.27549 13.1043 4.49044C10.3068 5.70678 7.84743 7.59673 5.94945 9.99771C3.84934 12.6544 2.51665 15.8353 2.0959 19.1956C1.67515 22.5558 2.1824 25.9671 3.56265 29.0596C4.94289 32.152 7.14344 34.8076 9.92567 36.7383C12.7079 38.6689 15.9656 39.8011 19.3455 40.0118C22.7255 40.2226 26.0986 39.504 29.0991 37.934C32.0997 36.3639 34.6131 34.0024 36.3669 31.1054C37.9519 28.4872 38.8617 25.522 39.0221 22.4757C39.0505 21.9373 39.4848 21.5 40.0239 21.5V21.5Z"
          fill="#D9D9D9"
          stroke="black"
          strokeWidth="2"
          mask="url(#path-3-inside-1_1_41)"
        />
        <circle cx="59.5" cy="20.5" r="19.5" stroke="black" strokeWidth="2" />
      </svg>
      <div>
        <ul className="flex">
          <li className="mr-10 font-[poppins] text-black">
            <Link to="/convert" className="text-black">
              Convert
            </Link>
          </li>
          <li className="mr-10 font-[poppins]">
            <Link to="/generate" className="text-black">
              Generate
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <Link to="/login">
          <Button className=" py-2 mr-10 text-xl text-white bg-black rounded-xl hover:bg-stone-900 transition-all">
            {user ? "Logout" : "Login"}
          </Button>
        </Link>
        <Link to="/signup">
          <Button
            className={`py-2 mr-10 text-xl text-white bg-black rounded-xl hover:bg-stone-900 transition-all ${
              user ? "hidden" : ""
            } `}
          >
            Sign in
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
