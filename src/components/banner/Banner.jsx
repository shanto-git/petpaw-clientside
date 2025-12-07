import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import { AiOutlineDoubleRight } from "react-icons/ai";
import petImg from "../../assets/dog-cat.png"
import catImg from "../../assets/Cat.png"
import dogImg from "../../assets/dog.png"

const slides = [
  {
    title: "Find Your Furry Friend Today!",
    desc: "Adopt a loving companion waiting for you.",
    img: petImg,
  },
  {
    title: "Adopt, Don’t Shop — Give a Pet a Home.",
    desc: "Every pet deserves warmth, love and care.",
    img: dogImg,
  },
  {
    title: "Because Every Pet Deserves Love.",
    desc: "Give a second chance to furry friends.",
    img: catImg,
  }
];

const Banner = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[index];
  const textVariant = {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 }
  };

  const imageVariant = {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 100, opacity: 0 }
  };

  return (
    <div className="w-full bg-sky-200 shadow-md max-h-[480px] overflow-hidden relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="flex flex-col md:flex-row items-center"
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.6 }}
        >
          <div className="w-full md:w-1/2 p-5 md:p-8 text-center md:text-left">
            <motion.div
            className=""
            variants={textVariant}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {slide.title}
            </h1>
            <p className="text-gray-600 mt-2 text-sm md:text-base">
              {slide.desc}
            </p>
            
          </motion.div>
          <Link to="/pets">
          <button className="mt-4 btn btn-secondary hover:text-black md:btn-md">
              Explore Now<AiOutlineDoubleRight />
            </button></Link>
          </div>
          <motion.div
            className="w-full md:w-1/2"
            variants={imageVariant}
            transition={{ duration: 0.6 }}
          >
            <img
              src={slide.img}
              className="w-full h-[480px] object-cover rounded-md"
              alt="Pet Banner"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Banner;
