import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, useHistory } from "react-router";
import { Link } from "react-router-dom";
import { fetchCards } from "../features/cardSlice";
import Card from "./Card";
import CardDetail from "./CardDetail";
import Pagination from "./Pagination";

function CardRenderer({ search }) {
  const dispatch = useDispatch();
  const cardData = useSelector((state) => state.cards);
  const cards = useSelector((state) => state.cards.data.data);
  let history = useHistory();

  const [display, setDisplay] = useState("block");
  const [warning, setWarning] = useState("");
  const [name, setName] = useState(search ? search.name : "");
  const [page, setPage] = useState(1);

  const handleChange = (e) => {
    setName(e.target.value);
    setPage(1)
  };
  const handleSubmit = (e) => {
    if (name) {
      dispatch(fetchCards({ name, page }));
      history.push("/");
      setDisplay("none");
      e.preventDefault();
    } else {
      alert("Please write something");
    }
  };

  useEffect(() => {
    if (cardData.data.totalCount === 0) {
      setWarning(" I couldnt find any cards. Please try different typings.");
    } else {
      setWarning("");
      
    }
  },[cardData.data.totalCount]);

  return (
    <main className='container'>
      <nav className="searchNav">
        <a href="/">
          <img src={"../img/pikachu.gif"} alt="PokeSearchLogo" />
          <h2>PokéCard Search</h2>
        </a>
        <form onSubmit={handleSubmit}>
         <input
            type="text"
            className="searchInput"
            onClick={() => setName("")}
            value={name}
            onChange={handleChange}
            autoFocus
            placeholder='Search for a card'
            
          />
          <button className="searchButton" type="submit">
            {" "}
            Search{" "}
          </button>
        </form>
      </nav>
      <div>
        <h3 style={{ display: `${display}` }}>
          Search whatever you want about Pokémon TCG Cards
        </h3>
        {warning.length > 0 ? (
          <h3>
            {warning} <img src="../img/flareon.gif" alt="flareon"></img>{" "}
          </h3>
        ) : (
          ""
        )}
      </div>

      {cardData.status === "loading" ? (
        <img src={"../img/Dual Ring-1s-211px.gif"} alt="loading"></img>
      ) : (
        ""
      )}
      <Route
        exact
        path="/"
        render={() => (
          <>
            <div className="cards">
              {cards
                ? cards.map((card) => (
                    <Link to={`/card/${card.id}`}>
                      <Card key={card.id} card={card}></Card>
                    </Link>
                  ))
                : ""}
            </div>
            {cards ? (
              <Pagination
                className="paginate"
                pageSize={cardData.data.pageSize}
                totalCount={cardData.data.totalCount}
                name={name}
                currentPage={cardData.data.page}
              />
            ) : (
              ""
            )}
            <div style={{textAlign:"center", margin:'10px'}}>
              <p>All data made available by the <a href='https://pokemontcg.io/' target='popup'>Pokémon TCG API</a></p>
              <p>This website is not produced, endorsed, supported, or affiliated with Nintendo or The Pokémon Company.</p>

            </div>
          </>
        )}
      />
      <Route exact path="/card/:id" component={CardDetail} />
    </main>
  );
}

export default CardRenderer;
