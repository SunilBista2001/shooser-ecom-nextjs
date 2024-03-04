import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/navbar/Navbar";

const LobbyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default LobbyLayout;
