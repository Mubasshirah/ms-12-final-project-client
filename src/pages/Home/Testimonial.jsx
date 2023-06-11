import { useState } from "react";
import SharedTitle from "../../shared/SharedTitle";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import { Rating } from '@smastrom/react-rating'
import { FaCaretDown } from "react-icons/fa";
import '@smastrom/react-rating/style.css'
const Testimonial = () => {
    const [reviews, setReview] = useState([]);
    const [rating, setRating] = useState(0);
    useEffect(() => {
        fetch('http://localhost:5000/review')
            .then(res => res.json())
            .then(data => setReview(data))
    }, [])
    return (
        <div className='w-[90%] mx-auto'>
            <SharedTitle subHeading="What our client say" heading="Testimonial">

            </SharedTitle>

            <Swiper
                pagination={{
                    type: "fraction",
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {
                    reviews.map(review => <SwiperSlide key={review._id}>
                        <div className="md:px-48 px-16 py-20 text-center">
                            <div   className="py-5">
                                 <Rating
                                    style={{ maxWidth: 180 ,margin: '0 auto'}}

                                    value={review.rating}
                                    onChange={setRating}
                                /></div>
                               <div className="flex items-center justify-center">
                               <FaCaretDown className="text-8xl text-yellow-500 " />
                               </div>
                            <p>{review.details}</p>
                            <h3 className="text-2xl font-bold">{review.name}</h3>
                        </div>
                    </SwiperSlide>)
                }

            </Swiper>
        </div>
    );
};

export default Testimonial;