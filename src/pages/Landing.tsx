import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import "@glidejs/glide/dist/css/glide.theme.min.css";
import "../index.css";
import createAccount from "../assets/CreateAccount.png";
import userAssesment from "../assets/UserAssesment.png";
import aiChat from "../assets/AIChat.png";
import aiAssistance from "../assets/AiAssistance.png";
import gamified from "../assets/Gamified.png";
import trackProgress from "../assets/TrackProgress.png";
import keepLearn from "../assets/LearnGrow.png";
import blob from "../assets/blob.svg";
import studentImage1 from "../assets/Section_1.png";
import studentImage2 from "../assets/Section_2.png";
import studentImage3 from "../assets/Section_3.png";
import profile1 from "../assets/Review_1.jpg";
import profile2 from "../assets/Review_2.jpg";
import profile3 from "../assets/Review_3.jpg";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/NavbarLanding";
import BlurText from "../components/TextAnimations/BlurText";
import LandingImage from "../assets/LandingImages/landingFront.png"
import MovingCard from "../utils/ui/MovingCards";

const Landing: React.FC = () => {
  const steps = [
    { id: 1, title: "1. Create Account", image: createAccount },
    { id: 2, title: "2. User Assesment", image: userAssesment },
    { id: 3, title: "3. AI Powered Learning Recommendations", image: aiAssistance },
    { id: 4, title: "4. Interactive AI Tutor Assesments", image: aiChat },
    { id: 5, title: "5. Gamified Learning", image: gamified },
    { id: 6, title: "6. Track Your Progress", image: trackProgress },
    { id: 7, title: "7. Learn and Grow", image: keepLearn },
  ];
  
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const glideInstance = useRef<any>(null);
  
    useEffect(() => {
      if (sliderRef.current) {
        glideInstance.current = new (Glide as any)(sliderRef.current, {
          type: "carousel",
          startAt: 0,
          perView: 3, // Show 3 cards at once
          gap: 20,
          autoplay: 2000,
          hoverpause: true,
          rewind: true, // Loop back to the start
          breakpoints: {
            1024: { perView: 2 },
            768: { perView: 1 }, 
          },
        });
  
        glideInstance.current.mount();
      }
  
      return () => {
        glideInstance.current?.destroy();
      };
    }, []);

  return (
    <>
    <Navbar/>
    {/* landing page - 1 */}
    <div id="home" className="w-full h-screen flex flex-wrap-reverse md:flex-nowrap items-center justify-center text-white bg-overlay bg-[#081a37] px-5 md:px-36">
      {/* Content */}
      <div className="text-center sm:text-left md:mb-16">
          <BlurText 
          text="Unlock Your Potential with AI Learning"
          className="text-3xl justify-center md:justify-start sm:text-5xl font-bold mb-6 flex" 
          />
          <p className="text-lg sm:text-xl mb-6 max-w-2xl">
          Join Intellecta and experience AI-driven, personalized learning
          tailored just for you. Sign in now to access interactive lessons,
          smart tutoring, and a future-ready education.
          </p>

          {/* Buttons */}
          <div className="flex gap-6 justify-center sm:justify-start">
          <Link to="/register">
          <button className="bg-[#F7D232] cursor-pointer hover:bg-transparent border-2 border-[#F7D232] hover:text-white text-black sm:justify-items-start font-semibold py-3 px-6 rounded-lg  ">
            Get Started
          </button>
          </Link>
          <button className="border-2 border-[#F7D232] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#F7D232] hover:text-black transition duration-300">
            <a href="#works">See More</a>
          </button>
        </div>
      </div>
      {/* image section */}
        <div className="w-full h-[400px] md:w-[500px] md:h-[600px] flex justify-end items-center mb-8 md:mb-36">
        <img src={LandingImage} alt="load" className="w-full h-full object-cover" />
        </div>
    </div>

      {/* landing page - else */}
    <div id="works" className="bg-[#0B1A36] py-20 text-white text-center bg-gradient-to-b from-[#081A37] to-[#3A6073] ">
      {/* Section Title */}
      <div className="h-[600px] py-5 md:px-36 px-5 ">
        <div className="mb-6  ">
          <h2 className="text-3xl font-bold mt-4">How To Get Started</h2>
        </div>

        {/* Glide Slider */}
        <div className="glide relative w-full h-96" ref={sliderRef}>
          {/* Track */}
          <div className="glide__track py-6" data-glide-el="track">
            <ul className="glide__slides">
              
              {steps.map((step) => (
                    <MovingCard key={step.id} step={step}/>
              ))}
            </ul>
          </div>
        
        </div>
      </div>
      {/* sliding-end */}

      <div id="about" className="relative text-white py-24 px-6 md:px-16 lg:px-24">
        {/* About Us */}
        <div className="mb-6">
          {/* <div className="inline-block px-4 py-1 bg-white text-black rounded-lg font-semibold shadow-2xl">
          ℹ️ About Us
          </div> */}
          <h2 className="text-3xl font-bold mt-4">What We Offer ?</h2>
        </div>

        {/* Section_1 */}
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10">
          {/* Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-4xl font-semibold mb-4">Personalized Learning</h2>
            <div className="h-1 w-52 bg-[#F3F25B] mb-4"></div>
              <p className="text-lg text-white">
                Our AI analyzes your learning style and pace to create customized study plans that adapt to your progress and knowledge gaps.
              </p>
            <button className="mt-10 px-6 py-3 bg-[#F3F25B] text-black font-medium rounded-lg shadow-md hover:bg-yellow-500 transition">
            View More
            </button>
          </div>

          {/* Image with Abstract Shape */}
          <div className="lg:w-1/2 relative md:block hidden">
            {/* Background Blob Image */}
            <img
              src={blob}
              alt="Blob Shape"
              className="relative w-[475px] h-[475px] mx-auto"
            />

            <img
              src={studentImage1} // Replace with the actual image
              alt="Happy Student"
              className="absolute top-1/2 left-1/2 transform -translate-x-[120px] -translate-y-[130px]  -rotate-12 w-[225px] h-[225px] object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="hidden lg:block absolute right-52 top-60 text-5xl animate-bounce">✨</div>
        <div className="hidden lg:block absolute right-[700px] top-60 w-10 h-10 border-2 border-yellow-300 rotate-45 animate-spin"></div>
        <div className="hidden lg:block absolute right-[700px] bottom-36 text-5xl animate-bounce">✨</div>
        <div className="hidden lg:block absolute right-56 bottom-40 w-10 h-10 border-2 border-yellow-300 rotate-45 animate-spin"></div>
      </div>
        
        
      <div className="relative text-white py-12 px-6 md:px-16 lg:px-24">
        {/* Section_2 */}
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10">
          {/* Image with Abstract Shape */}
          <div className="lg:w-1/2 relative md:block hidden">
            {/* Background Blob Image */}
            <img
              src={blob}
              alt="Blob Shape"
              className="relative w-[475px] h-[475px] mx-auto"
            />

            {/* Foreground Image (Above the Blob) */}
            <img
              src={studentImage2} 
              alt="Happy Student"
              className="absolute top-1/2 left-1/2 transform -translate-x-[120px] -translate-y-[130px] -rotate-12 w-[225px] h-[225px] object-cover rounded-lg"
            />
          </div>

          {/* Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-4xl font-semibold mb-4">Interactive Tutorials</h2>
            <div className="h-1 w-44 bg-[#F3F25B] mb-4"></div>
              <p className="text-lg text-white">
                Engage with dynamic content that responds to your inputs, making learning an active and immersive experience rather than passive consumption.
              </p>
            <button className="mt-10 px-6 py-3 bg-[#F3F25B] text-black font-medium rounded-lg shadow-md hover:bg-yellow-500 transition">
            View More
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="hidden lg:block absolute left-52 top-20 text-5xl animate-bounce">✨</div>
        <div className="hidden lg:block absolute left-[700px] top-20 w-10 h-10 border-2 border-yellow-300 rotate-45 animate-spin"></div>
        <div className="hidden lg:block absolute left-[675px] bottom-28 text-5xl animate-bounce">✨</div>
        <div className="hidden lg:block absolute left-56 bottom-32 w-10 h-10 border-2 border-yellow-300 rotate-45 animate-spin"></div>
      </div>

      <div className="relative text-white py-12 px-6 md:px-16 lg:px-24">
        {/* Section_3 */}
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10">
          {/* Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-4xl font-semibold mb-4">Smart Assesment</h2>
            <div className="h-1 w-24 bg-[#F3F25B] mb-4"></div>
              <p className="text-lg text-white">
                Our intelligent testing system identifies knowledge gaps and adjusts difficulty levels in real-time to optimize your learning efficiency.
              </p>
            <button className="mt-10 px-6 py-3 bg-[#F3F25B] text-black font-medium rounded-lg shadow-md hover:bg-yellow-500 transition">
            View More
            </button>
          </div>

          {/* Image with Abstract Shape */}
          <div className="lg:w-1/2 relative md:block hidden">
            {/* Background Blob Image */}
            <img
              src={blob}
              alt="Blob Shape"
              className="relative w-[475px] h-[475px] mx-auto"
            />

            {/* Foreground Image (Above the Blob) */}
            <img
              src={studentImage3}
              alt="Happy Student"
              className="absolute top-1/2 left-1/2 transform -translate-x-[120px] -translate-y-[130px] -rotate-12 w-[225px] h-[225px] object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="hidden lg:block absolute right-52 top-20 text-5xl animate-bounce">✨</div>
        <div className="hidden lg:block absolute right-[700px] top-20 w-10 h-10 border-2 border-yellow-300 rotate-45 animate-spin"></div>
        <div className="hidden lg:block absolute right-[700px] bottom-28 text-5xl animate-bounce">✨</div>
        <div className="hidden lg:block absolute right-56 bottom-32 w-10 h-10 border-2 border-yellow-300 rotate-45 animate-spin"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center gap-4 md:gap-8">
        
        {/* Card 1 */}
        <div className="w-40 h-40 bg-[#FFFFC1] rounded-lg flex flex-col justify-center items-center shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">5+</h2>
          <p className="text-sm text-black text-center font-semibold">Years Experience</p>
        </div>

        {/* Card 2 */}
        <div className="w-40 h-40 bg-[#FFFFC1] rounded-lg flex flex-col justify-center items-center shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">15+</h2>
          <p className="text-sm text-black text-center font-semibold">Selected Courses</p>
        </div>

        {/* Card 3 */}
        <div className="w-40 h-40 bg-[#FFFFC1] rounded-lg flex flex-col justify-center items-center shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">500+</h2>
          <p className="text-sm text-black text-center font-semibold">Students</p>
        </div>

        {/* Card 4 */}
        <div className="w-40 h-40 bg-[#FFFFC1] rounded-lg flex flex-col justify-center items-center shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">300+</h2>
          <p className="text-sm text-black text-center font-semibold">Positive Reviews</p>
        </div>

        {/* Card 5 */}
        <div className="w-40 h-40 bg-[#FFFFC1] rounded-lg flex flex-col justify-center items-center shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">20+</h2>
          <p className="text-sm text-black text-center font-semibold">Learning Games</p>
        </div>
      </div>

      <div className="py-20 px-4 md:py-24">
        <div className="mb-20">
          {/* <div className="inline-block px-4 py-1 bg-white text-black rounded-lg font-semibold">
          ⭐ Testimonials
          </div> */}
          <h2 className="text-3xl font-bold mt-4">Public Cheers For Us</h2>
        </div>

        {/* Testimonials Container */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-4">
        
        {/* Testimonial 1 */}
        <div className="relative p-6 bg-white rounded-lg shadow-lg pt-10 pb-10">
          <div className="absolute -top-10 left-8">
            <img
              src={profile1}
              alt="Kyle Roberts"
              className="w-20 h-20 rounded-full border-4 border-white"
            />
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-bold text-black">Kyle Roberts</h3>
            <p className="text-sm text-gray-500">Parent</p>
            
            <div className="flex mt-2 text-blue-500 justify-center">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
            
            <p className="text-gray-700 mt-4">
            Intellecta has transformed the way my child learns! The AI-powered tutoring adapts perfectly to his needs, making studying fun and engaging. I&apos;ve never seen him so excited about learning!
            </p>
          </div>
        </div>

        {/* Testimonial 2 */}
        <div className="relative bg-white p-6 rounded-lg shadow-lg pt-10 pb-10">
          <div className="absolute -top-10 left-8">
              <img
                src={profile2}
                alt="Sophia Anderson"
                className="w-20 h-20 rounded-full border-4 border-white"
              />
          </div>
          <div className="mt-2">
            <h3 className="text-lg font-bold text-gray-900">Sophia Anderson</h3>
            <p className="text-sm text-gray-500">Teacher</p>
            
            <div className="flex mt-2 text-blue-500 justify-center">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
            
            <p className="text-gray-700 mt-4">
            As a parent, I always worry about my child&apos;s progress. But with Intellecta&apos;s real-time insights, I can track his strengths and weaknesses easily. The personalized approach is fantastic!
            </p>
          </div>
        </div>

        {/* Testimonial 3 */}
        <div className="relative bg-white p-6 rounded-lg shadow-lg pt-10 pb-10">
          <div className="absolute -top-10 left-8">
            <img
              src={profile3}
              alt="Stephen Brook"
              className="w-20 h-20 rounded-full border-4 border-white"
            />
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-bold text-gray-900">Stephen Brook</h3>
            <p className="text-sm text-gray-500">Parent</p>
            
            <div className="flex mt-2 text-blue-500 justify-center">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
            
            <p className="text-gray-700 mt-4">
            Finding an accessible learning platform was tough until we found Intellecta. The adaptive features and visual learning tools have made a world of difference for my child!
            </p>
          </div>
        </div>

        </div>
      </div>
    </div>
    <Footer/>
  </>
  );
};


export default Landing;
