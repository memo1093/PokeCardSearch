import React, { useEffect } from "react";
import { useSelector } from "react-redux";


export default function CardDetail({ match }) {
  const cardId = match.params.id;
  const cards =
    useSelector((state) => state.cards.data.data) ||
    JSON.parse(localStorage.getItem("cards"));
  const card = cards.find((card) => card.id === cardId);

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
    document.title = card.name;
  }, [card, cards]);


  return (
    <div key={card.id} className="cardDetailContainer">
      <div className="cardDetailImage">
        <h3>{card.name}</h3>
        <a href={`${card.images.large}`} target='popup'><img src={card.images.small} alt={card.name} /></a>
        
      </div>

      <div className="cardDetails">
        <h3 style={{ color: "white" }}>{card.flavorText}</h3>
        <div>
          {card.hp ? (
            <div>
              <div className="cardDetail">
                <h3>Hp </h3>
                <p>{card.hp}</p>
              </div>
            </div>
          ) : (
            ""
          )}

          {card.supertype === "Pokémon" ? (
            <div className="cardDetail">
              <h3>Evolves To </h3>
              {card.evolvesTo ? <p> {card.evolvesTo}</p> : <p>Final stage</p>}
            </div>
          ) : (
            ""
          )}
        </div>

        {card.types ? (
          <div className="cardDetail">
            <h3>Types</h3>
            <div>
              {card.types.map((type) => {
                return (
                  <img
                    className="icon"
                    src={`../img/${type}.png`}
                    alt={type}
                  ></img>
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="cardDetail">
          <h3>Subtypes</h3>
          <div>
            {card.subtypes.map((subtype) => (
              <p> {subtype}</p>
            ))}
          </div>
        </div>

        {card.attacks ? (
          <div className="cardDetail">
            <h3>Attacks</h3>
            <ul>
              {card.attacks.map((attack) => (
                <li key={attack.name}>
                  <p>{attack.name}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          ""
        )}

        {card.weaknesses ? (
          <div className="cardDetail">
            <h3>Weaknesses</h3>
            <ul>
              {card.weaknesses.map((weaknesses) => (
                <li key={weaknesses.type}><p>{weaknesses.type}</p></li>
              ))}
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
