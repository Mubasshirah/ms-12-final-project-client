import bg1 from '../../assets/home/chef-service.jpg';

const BistroAbout = () => {
    return (
        <div style={{backgroundImage:`url(${bg1})`, backgroundPosition:'center', backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundAttachment:'fixed',        height:'100vh' , width:'100%',position:'relative'}}>
            
                <p className='bg-white  p-5 md:w-3/4  absolute 
            top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam repellat, temporibus dolorem assumenda cum vel dignissimos labore quidem quos ex explicabo cumque exercitationem odio minima beatae nostrum unde totam doloribus aspernatur. Cumque quos quidem ipsa fugit, nostrum accusamus maxime at rem obcaecati inventore qui impedit tempore doloribus repellat architecto, nulla aliquid quisquam eum aspernatur perspiciatis autem et? Iusto officiis provident aliquid, quam quod optio voluptates fugiat alias quo velit aut aperiam maiores reprehenderit enim eligendi magni iure illum vel consequuntur nisi atque facilis. Saepe provident aspernatur tempore, tenetur similique, possimus rem fugit porro laborum dolores consequatur natus tempora repellat? Totam.</p>
            
            
        </div>
    );
};

export default BistroAbout;