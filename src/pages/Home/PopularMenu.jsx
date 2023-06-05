

import SharedTitle from '../../shared/SharedTitle';
import SingleMenu from '../../components/SingleMenu';
import useMenu from '../../hooks/useMenu';

const PopularMenu = () => {
    const [menu]=useMenu();
    const popular=menu.filter(one=>one.category==='popular');
    // const [menu,setMenu]=useState([]);
    // useEffect(()=>{
    //     fetch('menu.json')
    //     .then(res=>res.json())
    //     .then(data=>{
    //         const popularMenu=data.filter(one=>one.category==='popular');
    //         setMenu(popularMenu)
    //     })
    // },[])
    return (
        <div className='w-[90%] mx-auto'>
            <SharedTitle subHeading='check it out' heading='from our menu'></SharedTitle>
     <div className='grid md:grid-cols-2 gap-5 mb-10'>
        {
            popular.map(singleMenu=><SingleMenu singleMenu={singleMenu} key={singleMenu._id}></SingleMenu>)
        }
     </div>
     <div className='text-center'>
        <button className='btn btn-outline border-0 border-b-4 mt-4'>View full menu</button>
     </div>
        </div>
    );
};

export default PopularMenu;