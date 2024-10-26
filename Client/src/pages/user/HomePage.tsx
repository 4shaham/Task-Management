import NavbarWithMegaMenu from "../../components/Navbar";
import FooterWithSitemap from "../../components/Footer";
import GoogleCalendarUI from "./ManagerPage";

function HomePage() {
  return (
    <div>
      <div className="w-full p-4">
        <NavbarWithMegaMenu />
        <div className="min-h-screen">
           <GoogleCalendarUI />
        </div>
        <FooterWithSitemap />
      </div>
    </div>
  );
}

export default HomePage;
