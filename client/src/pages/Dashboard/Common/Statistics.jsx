import useRole from "../../../hooks/useRole";
import AdminStatistics from "../Admin/AdminStatistics";
import GuestStatistics from "../Guest/GuestStatistics";
import HostStatistics from "../Host/HostStatistics";
import { useToggle } from "../../../context/ToggleContext";
import { Helmet } from "react-helmet-async";

const Statistics = () => {
  const [role] = useRole();
  const { isGuestView } = useToggle();

  // Default title
  let pageTitle = "Dashboard";

  if (role === "admin") pageTitle = "Admin Statistics | Dashboard";
  else if (role === "host")
    pageTitle = isGuestView
      ? "Guest Statistics | Dashboard"
      : "Host Statistics | Dashboard";
  else if (role === "guest") pageTitle = "Guest Statistics | Dashboard";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>

      <div data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="500">
        {role === "admin" && <AdminStatistics />}
        {role === "host" && (isGuestView ? <GuestStatistics /> : <HostStatistics />)}
        {role === "guest" && <GuestStatistics />}
      </div>
    </>
  );
};

export default Statistics;
