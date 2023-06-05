import { Parallax } from 'react-parallax';

const Cover = ({img,title,description}) => {
    return (
       <div className='mb-10'>
         <Parallax
        blur={{ min: -50, max: 50 }}
        bgImage={img}
        bgImageAlt="the dog"
        strength={-400}
    >
        <div className="hero h-[600px] " >                                 
  <div className="hero-overlay "></div>
  <div className="hero-content text-center text-neutral-content">
    <div className=" md:px-96 px-28 py-10 bg-opacity-30 bg-black">
      <h1 className="mb-5 text-5xl font-bold">{title}</h1>
      <p className="mb-5">{description}</p>

    </div>
  </div>
</div>
    </Parallax>
       </div>
       
    );
};

export default Cover;