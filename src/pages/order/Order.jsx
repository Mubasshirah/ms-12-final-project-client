
import { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Cover from '../../shared/Cover';
import orderImg from  "../../assets/shop/banner2.jpg"
import useMenu from '../../hooks/useMenu';
import OrderTab from './OrderTab';
import { useParams } from 'react-router-dom';
const Order = () => {
    const categories=['offered','salad','pizza','soup','dessert','drinks'];
    const {category}=useParams();
    const initialINdex=categories.indexOf(category);

    const [tabIndex, setTabIndex] = useState(initialINdex);
   const [menu]=useMenu();
   console.log(category);
   const drinks=menu.filter(one=>one.category==='drinks');
   const offered=menu.filter(one=>one.category==='offered');
   const pizza=menu.filter(one=>one.category==='pizza');
   const soup=menu.filter(one=>one.category==='soup');
   const salad=menu.filter(one=>one.category==='salad');
   const dessert=menu.filter(one=>one.category==='dessert');
    return (
        <div>
            <Cover img={orderImg} title="Our Dishes" description="Order from our menu"></Cover>
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
            <TabList>
                <Tab>Offered</Tab>
                <Tab>Salad</Tab>
                <Tab>Pizza</Tab>
                <Tab>soup</Tab>
                <Tab>Dessert</Tab>
                <Tab>Drinks</Tab>
            </TabList>
            <TabPanel>
              <OrderTab items={offered}></OrderTab>
            </TabPanel>
            <TabPanel>
              <OrderTab items={salad}></OrderTab>
            </TabPanel>
            <TabPanel>
            <OrderTab items={pizza}></OrderTab>
            </TabPanel>
            <TabPanel>
            <OrderTab items={soup}></OrderTab>
            </TabPanel>
            <TabPanel>
            <OrderTab items={dessert}></OrderTab>
            </TabPanel>
            <TabPanel>
            <OrderTab items={drinks}></OrderTab>
            </TabPanel>
        </Tabs>
        </div>
    );
};

export default Order;