import { Link } from "react-router-dom";
import SingleMenu from "../../components/SingleMenu";
import Cover from "../../shared/Cover";


const MenuCategory = ({items,img,title,description}) => {
    return (
        <div>
            {description &&  <Cover img={img} title={title} description={description} ></Cover>}
          <div className='grid md:grid-cols-2 gap-5 mb-10  w-[90%] mx-auto'>
        {
            items.map(singleMenu=><SingleMenu singleMenu={singleMenu} key={singleMenu._id}></SingleMenu>)
        }
     </div>  
     <div className='text-center'>
        <Link to={`/order/${title}`} className='btn btn-outline border-0 border-b-4 mt-4 mb-8'>Order your favourite food</Link>
     </div>
        </div>
    );
};

export default MenuCategory;