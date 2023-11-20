import { useState, useEffect } from 'react';
import AxiosBase from '../AxiosConfig';

const GetsingleItem = ({ category }) => {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await AxiosBase.get(`/menu/${category}`);
                setMenu(response.data);
            } catch (error) {
                console.error('Error fetching menu:', error);
            }
        };

        fetchMenu();
    }, [category]);

    return menu;
};

export default GetsingleItem;
