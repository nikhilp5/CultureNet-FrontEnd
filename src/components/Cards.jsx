import React from "react";


const CardBootstrap = ({ item }) => {            
    // destructuring props
return (
<>
<div className="container-fluid mt-size: 0 fs-20" style={{width: '60rem'}}>
 <div className="row justify-content-center mb-0">
   {item.map((Val) => {
     return (
       <div
         className="col-md-3 col-sm-6 card my-2 py-15 border-7em"
         key={Val.id}
       >
         <div className="card-img-top text-center mt-3">
           <img src={Val.img} alt={Val.title} className="photo w-50" />
         </div>
         <div className="card-body">
           <div className="card-title fw-bold fs-6 text-center mb-0 mt-0">
             {Val.title}
           </div>
           <div className="fs-15 text-center">By {Val.author}</div>
           <div className="fs-18 text-center mb-0">Category: {Val.category}</div>
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