import useRole from "../../../hooks/useRole";
import AdminStatistics from "../Admin/AdminStatistics";
import GuestStatistics from "../Guest/GuestStatistics";
import HostStatistics from "../Host/HostStatistics";
import { useToggle } from "../../../context/ToggleContext";

const Statistics = () => {
    const [role] = useRole();
    const { isGuestView } = useToggle();

    if (role === 'admin') return <AdminStatistics />;
    if (role === 'host') {
        return isGuestView ? <GuestStatistics /> : <HostStatistics />;
    }
    if (role === 'guest') return <GuestStatistics />;

    return null;
};

export default Statistics;
