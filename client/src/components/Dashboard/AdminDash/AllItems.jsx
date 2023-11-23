import Header from "../../Shared/Header/Header";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import Container from "../../Shared/Container";
import AxiosBase from "../../../ServerConfig/AxiosConfig";
import AxiosSecure from "../../../ServerConfig/AxiosSecure";
import Swal from "sweetalert2";
const AllItems = () => {

    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;




    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {
        console.log(data)
        const imageFile = { image: data.image[0] }
        const res = await AxiosBase.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            // 
            const menuRes = await AxiosSecure.post('/menu', menuItem);
            if (menuRes.data.insertedId) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is added to the menu.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log('with image url', res.data);
    };

    return (
        <Container>

            <div>
                <Header heading="add an item" subHeading="What's new?" ></Header>
                <div className="">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Recipe Name*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Recipe Name"
                                {...register('name', { required: true })}
                                required
                                className="input input-bordered w-full" />
                        </div>
                        <div className="flex gap-6">
                            {/* category */}
                            <div className="form-control w-full my-6">
                                <label className="label">
                                    <span className="label-text">Category*</span>
                                </label>
                                <select defaultValue="default" {...register('category', { required: true })}
                                    className="select select-bordered w-full">
                                    <option disabled value="default">Select a category</option>
                                    <option value="salad">Salad</option>
                                    <option value="pizza">Pizza</option>
                                    <option value="soup">Soup</option>
                                    <option value="dessert">Dessert</option>
                                    <option value="drinks">Drinks</option>
                                </select>
                            </div>

                            {/* price */}
                            <div className="form-control w-full my-6">
                                <label className="label">
                                    <span className="label-text">Price*</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Price"
                                    {...register('price', { required: true })}
                                    className="input input-bordered w-full" />
                            </div>

                        </div>
                        {/* recipe details */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Recipe Details</span>
                            </label>
                            <textarea {...register('recipe')} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                        </div>

                        <div className="form-control w-full my-6">
                            <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                        </div>

                        <button className="btn">
                            Add Item <FaUtensils className="ml-4"></FaUtensils>
                        </button>
                    </form>
                </div>
            </div>













        </Container>
    );
};

export default AllItems;