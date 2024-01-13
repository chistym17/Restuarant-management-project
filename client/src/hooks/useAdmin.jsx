import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import AxiosSecure from "../ServerConfig/AxiosSecure";


const useAdmin = () => {
    const { user } = useAuth();
    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async () => {
            const res = await AxiosSecure.get(`/admin/${user.email}`);
            return res.data?.admin;
        }
    })
    return [isAdmin, isAdminLoading]
};

export default useAdmin;