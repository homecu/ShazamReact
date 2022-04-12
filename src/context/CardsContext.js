/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useEffect, useState } from "react";

export const CardsContext = createContext({});

export const CardsProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cardDetail, setCardDetailActive] = useState([]);
  const [error, setError] = useState(false);
  const [cardBlock, setCardBlock] = useState(true);
  const [loadingToggle, setLoadingToggle] = useState(false);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    try {
      setError(false);
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
      setError(false);
    } catch (er) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };

  const loadCardDetailStatus = async () => {
    const data = { tokenPan: cardDetail.tokenPan };
    try {
      setLoading(true);
      const res = await fetch(
        "http://localhost:8000/banking/hcuShazam.prg?cu=CRUISECU&op=getCardBlockStatus",
        {
          method: "POST",
          mode: "cors",
          credentials: "include",
          redirect: "follow",
          referrerPolicy: "strict-origin",
          body: JSON.stringify(data),
        }
      );

      const json = await res.json();

      console.log(json.data);
      setCardBlock(json.data.blocked);
      setLoading(false);
      setError(false);
    } catch (er) {
      console.log(er);
      setLoading(false);
      setError(true);
    }
  };

  const changeStatusCard = async (cardStatus) => {
    const data = { tokenPan: cardDetail.tokenPan };
    const actionBlock = cardStatus ? "removeCardBlock" : "enableCardBlock";
    try {
      setLoadingToggle(true);
      const res = await fetch(
        `http://localhost:8000/banking/hcuShazam.prg?cu=CRUISECU&op=${actionBlock}`,
        {
          method: "POST",
          mode: "cors",
          credentials: "include",
          redirect: "follow",
          referrerPolicy: "strict-origin",
          body: JSON.stringify(data),
        }
      );
      if (res.status === 200) {
        setCardBlock(!cardStatus);
      }

      // setCardBlock(json.data.blocked);
      setLoadingToggle(false);
      setError(false);
    } catch (er) {
      console.log(er);
      setLoadingToggle(false);
      setError(true);
    }
  };

  const setCardDetail = (res) => {
    console.log(res);
    setCardDetailActive(res);
  };

  return (
    <CardsContext.Provider
      value={{
        error,
        cards,
        loading,
        cardBlock,
        cardDetail,
        loadingToggle,
        loadCards,
        setCardDetail,
        changeStatusCard,
        loadCardDetailStatus,
      }}
    >
      {children}
    </CardsContext.Provider>
  );
};
