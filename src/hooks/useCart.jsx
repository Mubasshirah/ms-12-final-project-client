import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import useAxiosSecure from './useAxiosSecure';

const useCart=()=>{
    const {user,loading}=useContext(AuthContext);
    const [axiosSecure]=useAxiosSecure();
    const { refetch,  data: cart=[]} = useQuery({
        queryKey: ['carts', user?.email],
        enabled: !loading,
        queryFn: async ()=>{
            const response=await axiosSecure(`/carts?email=${user?.email}`);
            console.log('res from axios',response)
             return response.data
        },
      })
return [cart,refetch]
}
export default useCart;