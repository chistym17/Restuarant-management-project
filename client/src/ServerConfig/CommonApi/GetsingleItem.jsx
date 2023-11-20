import { useState } from 'react';
import AxiosBase from '../AxiosConfig';
import useAuth from '../../hooks/useAuth';

const GetsingleItem = ({ category }) => {
    const { loading, setLoading } = useAuth()

    setLoading(true)
    const [menu, setmenu] = useState()
    AxiosBase.get(`/menu/${category}`).then(res => {
        setmenu(res.data)

        setLoading(false)
    }
    )




    return menu;


};

export default GetsingleItem;

// ``