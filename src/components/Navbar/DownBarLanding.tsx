import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { ImWhatsapp } from "react-icons/im";
import { CgMail } from "react-icons/cg";
import { FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";

type DownBarLandingProps = {
  setfn: React.Dispatch<React.SetStateAction<boolean>>;
};

const DownBarLanding: React.FC<DownBarLandingProps> = ({
  setfn,
}: {
  setfn: (open: boolean) => void;
}) => {
  const menuVariants = {
    hidden: {
      y: "-100%", // Start above the viewport
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    visible: {
      y: 0, // Slide to its normal position
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren", // Animate children after the parent
        staggerChildren: 0.2, // Stagger the animation of child sections
      },
    },
  };

  // Animation variants for each section (the two w-2/4 divs)
  const sectionVariants = {
    hidden: {
      opacity: 0,
      x: -50, // Start slightly to the left
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        when: "beforeChildren", // Animate items after the section
        staggerChildren: 0.1, // Stagger the animation of menu items
      },
    },
  };

  // Animation variants for each menu item (<p> tag)
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  const [hoverData, setHoverData] = useState<string>("");
  // const dataArr = [
  //   {
  //     head: "How it works",
  //     content:
  //       "After registration and assesment , students can learn and aquire skills out of their school syllabus",
  //     link: "Quick Guide",
  //   },
  //   {
  //     head: "What are the things we offer",
  //     content:
  //       "Personalised learning \n Interactive tutorials \n Smart assessment",
  //     link: "About Us",
  //   },
  //   {
  //     head: "Reach out us",
  //     content: "support@intellecta.com \n +91 9455522267 \n",
  //     link: "Contact Us",
  //   },
  // ];

  return (
    <AnimatePresence>
      <motion.div
        className="absolute top-16 left-0 w-full bg-[#343e48] text-white flex py-6 space-y-4 shadow-md h-[95vh] md:px-36 "
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={menuVariants}
      >
        {/* First Section */}
        <motion.div
          className={`md:w-2/4  w-full flex flex-col justify-center items-start gap-6  px-5`}
          variants={sectionVariants}
        >
          <motion.p variants={itemVariants}>
            <a
              href="#home"
              className={`hover:text-gray-400 } md:text-7xl text-5xl ` }
              onClick={() => setfn(false)}
              onMouseOver={() => setHoverData("Home")}
              onMouseLeave={() => setHoverData("")}
            >
              <span className={`text-2xl mr-3`}>01</span>
              Home
            </a>
          </motion.p>
          <motion.p variants={itemVariants}>
            <a
              href="#works"
              className="hover:text-gray-400 md:text-7xl text-5xl"
              onClick={() => setfn(false)}
              onMouseOver={() => setHoverData("Quick Guide")}
            >
              <span
                className={`text-2xl mr-3 ${
                  hoverData == "Quick Guide" && "text-red-500"
                }`}
              >
                02
              </span>
              Quick Guide
            </a>
          </motion.p>
          <motion.p variants={itemVariants}>
            <a
              href="#about"
              className="hover:text-gray-400 md:text-7xl text-5xl"
              onClick={() => setfn(false)}
              onMouseOver={() => setHoverData("About Us")}
            >
              <span
                className={`text-2xl mr-3 ${
                  hoverData == "About Us" && "text-red-500"
                }`}
              >
                03
              </span>
              About Us
            </a>
          </motion.p>
          <motion.p variants={itemVariants}>
            <a
              href="#footer"
              className="hover:text-gray-400 md:text-7xl text-5xl "
              onClick={() => setfn(false)}
              onMouseOver={() => setHoverData("Contact Us")}
              // onMouseLeave={() => setHoverData("")}
            >
              <span
                className={`text-2xl mr-3 ${
                  hoverData == "Contact Us" && "text-red-500"
                }`}
              >
                04
              </span>
              Contact Us
            </a>
          </motion.p>
        </motion.div>

        {/* Second Section */}
        <motion.div
          className=" w-2/4 md:flex flex-col justify-center pl-20  hidden  "
          variants={sectionVariants}
        >
          {/* {dataArr.map(
            (item: any , index:number) => */}
          {hoverData == "Quick Guide" && (
            <motion.p variants={itemVariants}>
              <a
                href="#works"
                className="hover:text-gray-400 flex flex-col gap-3"
                onClick={() => setfn(false)}
              >
                <p className="text-5xl">How it works</p>
                <p className="text-lg">
                  After registration and assesment,
                  <br /> students can learn and aquire skills out of their
                  school syllabus
                </p>
              </a>
            </motion.p>
          )}
          {hoverData == "About Us" && (
            <motion.p variants={itemVariants}>
              <a
                href="#about"
                className="hover:text-gray-400 flex flex-col gap-3"
                onClick={() => setfn(false)}
              >
                <p className="text-5xl">What are the things we offer</p>
                {/* <p>content</p> */}
                <ul className="text-lg">
                  <li>- Personalised learning</li>
                  <li>- Interactive tutorials</li>
                  <li>- Smart assessment</li>
                </ul>
              </a>
            </motion.p>
          )}
          {hoverData == "Contact Us" && (
            <motion.p variants={itemVariants}>
              <a
                href="#footer"
                className="hover:text-gray-400 flex flex-col gap-3"
                onClick={() => setfn(false)}
              >
                <p className="text-5xl">Reach out to us</p>
                <ul className="text-2xl flex flex-col gap-2">
                  <li className="flex items-center gap-2">
                    <FaGithub />
                    <p className="text-lg">- https://github.com/angadkt</p>
                  </li>
                  <li className="flex items-center gap-2">
                    <ImWhatsapp />
                    <p className="text-lg">- 9875679890</p>
                  </li>
                  <li className="flex items-center gap-2">
                    <CgMail />
                    <p className="text-lg">- intellect@gmail.com</p>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaInstagram />
                    <p className="text-lg">- https://www.instagram.com/</p>
                  </li>
                  <li className="flex items-center gap-2">
                    <CiLinkedin />
                    <p className="text-lg">- https://www.linkedin.com/feed/</p>
                  </li>
                  <li className="flex items-center gap-2">
                    <IoCallOutline />
                    <p className="text-lg">- 9875679890</p>
                  </li>
                </ul>
              </a>
            </motion.p>
          )}
        </motion.div>
          
      </motion.div>
    </AnimatePresence>
  );
};

export default DownBarLanding;
