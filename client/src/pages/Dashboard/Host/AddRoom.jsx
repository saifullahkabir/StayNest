import { useState } from "react";
import AddRoomForm from "../../../components/Form/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../api/utils";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [imagePreview, setImagePreview] = useState();
    const [imageText, setImageText] = useState('Upload Image')
    const [dates, setDates] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    })

    // Date range Handler
    const handleDates = item => {
        setDates(item.selection);
    }

    // Post request to server
    const { mutateAsync } = useMutation({
        mutationFn: async (roomData) => {
            const { data } = await axiosSecure.post(`/room`, roomData);
            return data;
        },
        onSuccess: () => {
            toast.success('Room Added Successfully!');
            navigate('/dashboard/my-listings');
            setLoading(false);
        }
    })

    const handleAddRoom = async e => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;
        const location = form.location.value;
        const category = form.category.value;
        const title = form.title.value;
        const from = dates.startDate;
        const to = dates.endDate;
        const price = form.price.value;
        const guests = form.total_guest.value;
        const bedrooms = form.bedrooms.value;
        const bathrooms = form.bathrooms.value;
        const description = form.description.value;
        const image = form.image.files[0];
        const host = {
            name: user?.displayName,
            image: user?.photoURL,
            email: user?.email
        }
        try {
            setLoading(true);
            const image_url = await imageUpload(image);
            const roomData = {
                title,
                category,
                location,
                from,
                to,
                price,
                guests,
                bedrooms,
                bathrooms,
                description,
                image: image_url,
                host
            }
            console.table(roomData);

            // Post request to server
            await mutateAsync(roomData);

        }
        catch (err) {
            toast.error(err.message);
            setLoading(false);
        }
    }

    // handle image change 
    const handleImage = image => {
        setImagePreview(URL.createObjectURL(image));
        setImageText(image.name);
    }

    return (
        <>
            <Helmet>
                <title>Add Room | Dashboard</title>
            </Helmet>

            <AddRoomForm
                dates={dates}
                handleDates={handleDates}
                handleAddRoom={handleAddRoom}
                setImagePreview={setImagePreview}
                imagePreview={imagePreview}
                handleImage={handleImage}
                imageText={imageText}
                loading={loading}
            ></AddRoomForm>
        </>
    );
};

export default AddRoom;