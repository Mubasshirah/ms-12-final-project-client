
import { Link } from 'react-router-dom';
import FoodCard from '../../components/FoodCard';
// todo: implement pagination here
const OrderTab = ({items}) => {
    return (
        <div>
          <div className='grid md:grid-cols-3 gap-4 w-[80%] mx-auto'>
               {
                    items.map(item=><FoodCard key={item._id} item={item}></FoodCard>)
                }
               </div>  
               <div className='text-center'>
               <Link to="/menu" className='btn btn-outline border-0 border-b-4 mt-4 mb-8'>Back to menu</Link>
                </div> 
              
        </div>
    );
};

export default OrderTab;