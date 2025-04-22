import { useState } from "react";
import AddRoomForm from "../../../components/Form/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../api/utils";

const AddRoom = () => {
    const { user } = useAuth();
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

    const handleAddRoom = async e => {
        e.preventDefault();
        const form = e.target;
        const location = form.location.value;
        const category = form.category.value;
        const title = form.title.value;
        const to = '';
        const from = ''
        const price = form.price.value;
        const quests = form.total_quests.value;
        const bedrooms = form.bedrooms.value;
        const bathrooms = form.bathrooms.value;
        const description = form.description.value;
        const image = form.image.files[0];
        const host = {
            name: user?.displayName,
            image: user?.photoURL,
            email: user?.email
        }
        const image_url = await imageUpload(image);
    }

    return (
        <div>
            {/* Form */}
            <AddRoomForm
                dates={dates}
                handleDates={handleDates}
                handleAddRoom={handleAddRoom}
            ></AddRoomForm>
        </div>
    );
};

export default AddRoom;