import { VscAccount } from "react-icons/vsc";
import Dock from "./Dock";
import { IoHomeOutline } from "react-icons/io5";
import { LucideGamepad2 } from "lucide-react";
import { MdLeaderboard } from "react-icons/md";

const items = [
  {
    icon: <IoHomeOutline className="text-xl" />,
    label: "Home",
    onClick: () => alert("Home!"),
    href: "/games",
  },
  {
    icon: <LucideGamepad2 />,
    label: "All games",
    onClick: () => alert("Archive!"),
    href: "/games/allgames",
  },
  {
    icon: <MdLeaderboard />,
    label: "Leaderboard",
    onClick: () => alert("Leaderboard!"),
    href: "/games/leaderboard",
  },
  {
    icon: <VscAccount size={18} />,
    label: "Profile",
    onClick: () => alert("Profile!"),
    href: "/games/myprofile",
  },
];

const DockLid = () => {
  return (
    <div className="z-50 fixed bottom-10">
      <Dock
        items={items}
        panelHeight={68}
        baseItemSize={50}
        magnification={70}
      />
    </div>
  );
};

export default DockLid;
