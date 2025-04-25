import {
  FaDiscord,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa6";

const GameFooter = () => {
  return (
    <div >
      <footer className="bg-[#0f172a] text-white mt-20">
        <div className="w-full px-6 py-10 flex justify-around md:grid-cols-4 gap-8">
          <div className="max-w-sm">
            <h2 className="text-2xl font-bold mb-3 ">Intellecta</h2>
            <p className="text-sm text-gray-400">
              Dive into a world of fun and competition. Play, climb the ranks,
              and become a legend!
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="/games" className="hover:text-violet-400 transition">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/games/allgames"
                  className="hover:text-violet-400 transition"
                >
                  Games
                </a>
              </li>
              <li>
                <a
                  href="/games/leaderboard"
                  className="hover:text-violet-400 transition"
                >
                  Leaderboard
                </a>
              </li>
              <li>
                <a
                  href="/games/myprofile"
                  className="hover:text-violet-400 transition"
                >
                  Profile
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-violet-400 transition">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-violet-400 transition">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-violet-400 transition">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-violet-400 transition">
                <FaDiscord />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-10 py-4 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Intellecta. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default GameFooter;
