/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useEffect, useState } from "react";

export const CardsContext = createContext({});

export const CardsProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cardDetail, setCardDetailActive] = useState();

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:8000/banking/hcuShazam.prg?cu=CRUISECU", {
      method: "GET",
      mode: "cors",
      credentials: "include",
      redirect: "follow",
      referrerPolicy: "strict-origin",
    });
    const json = await res.json();
    console.log(json);
    setCards(json.data);
    setLoading(false);
  };

  const setCardDetail = (res) => {
    console.log(res);
    setCardDetailActive(res);
  };

  return (
    <CardsContext.Provider
      value={{
        cards,
        loading,
        cardDetail,
        loadCards,
        setCardDetail,
      }}
    >
      {children}
    </CardsContext.Provider>
  );
};
