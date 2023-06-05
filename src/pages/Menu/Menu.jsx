import { Helmet } from "react-helmet-async";
import Cover from "../../shared/Cover";
import menuImg from "../../assets/menu/banner3.jpg"
import dessertimg from "../../assets/menu/dessert-bg.jpeg"
import pizzaimg from "../../assets/menu/pizza-bg.jpg"
import saladimg from "../../assets/menu/salad-bg.jpg"
import soupimg from "../../assets/menu/soup-bg.jpg"
import SharedTitle from "../../shared/SharedTitle";
import useMenu from "../../hooks/useMenu";
import MenuCategory from "./MenuCategory";


const Menu = () => {
    const [menu] = useMenu();

    const offered = menu.filter(one => one.category === 'offered');
    console.log(offered)
    const pizza = menu.filter(one => one.category === 'pizza');
    const soup = menu.filter(one => one.category === 'soup');
    const salad = menu.filter(one => one.category === 'salad');
    const dessert = menu.filter(one => one.category === 'dessert');
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>

            </Helmet>
            <Cover img={menuImg} title="Our Menu" description="Would you like to try a meal?"></Cover>
            <SharedTitle subHeading="Don't miss" heading="Today's Offer"></SharedTitle>
            <MenuCategory

                items={offered}
                       title="offered"
            ></MenuCategory>
            <MenuCategory
                items={dessert}
                img={dessertimg}
                title="dessert"
                description="Here is our dessert items"
            ></MenuCategory>

            <MenuCategory
                items={pizza}
                img={pizzaimg}
                title="pizza"
                description="Here is our pizza items"
            ></MenuCategory>

            <MenuCategory
                items={salad}
                img={saladimg}
                title="salad"
                description="Here is our salad items"
            ></MenuCategory>

            <MenuCategory
                items={soup}
                img={soupimg}
                title="soup"
                description="Here is our soup items"
            ></MenuCategory>

        </div>
    );
};

export default Menu;