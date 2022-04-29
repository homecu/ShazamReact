/* eslint-disable no-unreachable */
/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useEffect, useState } from "react";

export const CardsContext = createContext({});

export const CardsProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  const [user, setUser] = useState({
    primaryAddress: "",
    secondaryAddress: "",
    phone: 0,
  });
  const [changeSaved, setChangeSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cardDetail, setCardDetailActive] = useState([]);
  const [error, setError] = useState(false);
  const [cardBlock, setCardBlock] = useState(true);
  const [loadingToggle, setLoadingToggle] = useState(false);
  const [travelMemos, setTravelMemos] = useState([]);
  const [places, setPlaces] = useState([]);

  const [alertSettingsValues, setAlertSettingsValues] = useState({
    highDollarThreshold: 0,
    primaryEmail: false,
    secondaryEmail: false,
    sms: false,
  });

  useEffect(() => {
    loadCards();
    getUser();
  }, []);

  const getUser = async () => {
    try {
      setError(false);
      setLoading(true);
      const res = await fetch(
        "http://localhost:8000/banking/hcuShazam.prg?cu=CRUISECU&op=getUser",
        {
          method: "GET",
          mode: "cors",
          credentials: "include",
          redirect: "follow",
          referrerPolicy: "strict-origin",
        }
      );
      const json = await res.json();
      console.log(json);
      setUser({
        ...user,
        primaryAddress: json.data.emailAddress,
        secondaryAddress: json.data.secondaryEmailAddress,
        phone: json.data.phoneNumber,
      });
      setLoading(false);
      setError(false);
    } catch (er) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };
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

  const getAlertSettings = async (alertId) => {
    const data = { tokenPan: cardDetail.tokenPan, alertId };
    try {
      setLoading(true);
      const res = await fetch(
        "http://localhost:8000/banking/hcuShazam.prg?cu=CRUISECU&op=getAlertSettings",
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
      setAlertSettingsValues({
        ...alertSettingsValues,
        highDollarThreshold: json.data.highDollarThreshold,
        primaryEmail: json.data.primaryEmail,
        secondaryEmail: json.data.secondaryEmail,
        sms: json.data.sms,
      });
      // setCardBlock(json.data.blocked);
      setLoading(false);
      setError(false);
    } catch (er) {
      console.log(er);
      setLoading(false);
      setError(true);
    }
  };

  const setAlertSettings = async (
    alertId,
    primaryEmail,
    secondaryEmail,
    sms,
    highDollarThreshold = null
  ) => {
    const data = {
      tokenPan: cardDetail.tokenPan,
      alertId,
      primaryEmail,
      secondaryEmail,
      sms,
      highDollarThreshold,
    };
    try {
      setLoading(true);
      const res = await fetch(
        "http://localhost:8000/banking/hcuShazam.prg?cu=CRUISECU&op=setAlertSettings",
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

      if (res.status === 200) {
        setChangeSaved(true);
      }
      setTimeout(() => {
        setChangeSaved(false);
      }, 3000);

      console.log(json.data);
      // setCardBlock(json.data.blocked);
      setLoading(false);
      setError(false);
    } catch (er) {
      console.log(er);
      setLoading(false);
      setError(true);
    }
  };

  const setCardDetail = (res) => {
    console.log(res);
    setCardDetailActive(res);
  };

  const getCardTravelMemos = async () => {
    const data = { tokenPan: cardDetail.tokenPan };
    try {
      setLoading(true);
      const res = await fetch(
        "http://localhost:8000/banking/hcuShazam.prg?cu=CRUISECU&op=getCardTravelMemos",
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
      setTravelMemos(json.data);
      setLoading(false);
      setError(false);
    } catch (er) {
      console.log(er);
      setLoading(false);
      setError(true);
    }
  };
  function SortArray(x, y) {
    return x.place.localeCompare(y.place);
  }
  const getDestinations = async () => {
    const data = { tokenPan: cardDetail.tokenPan };
    try {
      setLoading(true);
      const res = await fetch(
        "http://localhost:8000/banking/hcuShazam.prg?cu=CRUISECU&op=getDestinations",
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
      setPlaces(
        Object.entries(json)
          .map((e) => ({ place: e[1], code: e[0] }))
          .sort(SortArray)
      );

      setTravelMemos(json.data);
      setLoading(false);
      setError(false);
    } catch (er) {
      console.log(er);
      setLoading(false);
      setError(true);
    }
  };

  const createTravelMemo = async (destinations, endDate, startDate, memo, tripName) => {
    const data = {
      tokenPan: cardDetail.tokenPan,
      destinations,
      endDate,
      startDate,
      memo,
      tripName,
    };
    try {
      setLoading(true);
      const res = await fetch(
        "http://localhost:8000/banking/hcuShazam.prg?cu=CRUISECU&op=createTravelMemo",
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
      console.log(json);
      setTravelMemos(json.data);
      setLoading(false);
      setError(false);
    } catch (er) {
      console.log(er);
      setLoading(false);
      setError(true);
    }
  };

  // const arrayOfObj = Object.entries(hola).map((e) => ({ place: e[1], code: e[0] }));
  return (
    <CardsContext.Provider
      value={{
        user,
        error,
        cards,
        places,
        loading,
        cardBlock,
        cardDetail,
        travelMemos,
        changeSaved,
        loadingToggle,
        alertSettingsValues,
        loadCards,
        setCardDetail,
        getDestinations,
        changeStatusCard,
        getAlertSettings,
        setAlertSettings,
        loadCardDetailStatus,
        createTravelMemo,
        getCardTravelMemos,
      }}
    >
      {children}
    </CardsContext.Provider>
  );
};
