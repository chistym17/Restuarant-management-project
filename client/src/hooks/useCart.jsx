import { useQuery } from "@tanstack/react-query";
import AxiosBase from "../ServerConfig/AxiosConfig";

const useCart = () => {
    const { data:cart=[],refetch } = useQuery({
        queryKey: ['cart'],
        queryFn: async () => {
            const res = await AxiosBase.get('/cartitems')
            return res.data

        }
    })
return [cart,refetch]
};

export default useCart;