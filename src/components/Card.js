import React from "react";


export default function Card({ card }) {
  //! Önemli hata- sayfa refresh olunca hata veriyor.
  
      
  return (
    <div key={card.id}>
      <img src={card.images.small} alt="" />
    </div>
  );
}
