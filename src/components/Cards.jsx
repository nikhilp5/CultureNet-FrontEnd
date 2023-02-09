import React from "react";


const CardBootstrap = ({ item }) => {            
    // destructuring props
return (
<>
<div className="container-fluid">
 <div className="row justify-content-center">
   {item.map((Val) => {
     return (
       <div
         className="col-md-3 col-sm-6 card my-2 py-10 border-5em"
         key={Val.id}
       >
         <div className="card-img-top text-center">
           <img src={Val.img} alt={Val.title} className="photo w-50" />
         </div>
         <div className="card-body">
           <div className="card-title fw-bold fs-6 text-center">
             {Val.title}
           </div>
           <div className="fs-20 text-center">{Val.desc}</div>
         </div>
       </div>
     );
   })}
 </div>
</div>
</>
);
};

export default CardBootstrap;