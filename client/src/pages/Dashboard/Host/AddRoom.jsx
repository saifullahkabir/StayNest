import { useState } from "react";
import AddRoomForm from "../../../components/Form/AddRoomForm";

const AddRoom = () => {
    const [dates, setDates] = useState({
        startDate: new Date(),
        endDate: null,
        key: 'selection'
    })

    // Date range Handler
    const handleDates = item => {
        console.log(item);
        setDates(item.selection);
    }

    return (
        <div>
            {/* Form */}
            <AddRoomForm dates={dates} handleDates={handleDates}></AddRoomForm>
        </div>
    );
};

export default AddRoom;