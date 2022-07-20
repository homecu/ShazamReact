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
    disableSystemAlerts: false,
  });
  const [changeSaved, setChangeSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cardDetail, setCardDetailActive] = useState([]);
  const [error, setError] = useState(false);
  const [cardBlock, setCardBlock] = useState(true);
  const [loadingToggle, setLoadingToggle] = useState(false);
  const [travelMemos, setTravelMemos] = useState([]);
  const [places, setPlaces] = useState([]);
  const [travelMemoSelected, setTravelMemoSelected] = useState(null);
  const [cardsSearched, setCardsSearched] = useState([]);

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
      setUser({
        ...user,
        primaryAddress: json.data.emailAddress,
        secondaryAddress: json.data.secondaryEmailAddress,
        phone: json.data.phoneNumber,
        disableSystemAlerts: json.data.disableSystemAlerts,
      });
      setLoading(false);
      setError(false);
    } catch (er) {
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

      setCards(json.data);
      setLoading(false);
      setError(false);
    } catch (er) {
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

      setCardBlock(json.data.blocked);
      setLoading(false);
      setError(false);
    } catch (er) {
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

      if (res.status === 200) {
        setChangeSaved(true);
      }
      setTimeout(() => {
        setChangeSaved(false);
      }, 3000);

      // setCardBlock(json.data.blocked);
      setLoading(false);
      setError(false);
    } catch (er) {
      setLoading(false);
      setError(true);
    }
  };

  const setCardDetail = (res) => {
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

      if (json.message.includes("No Travel")) {
        setTravelMemos([]);
        setLoading(false);
        setError(false);
      } else {
        setTravelMemos(json.data.travelMemos);
        setLoading(false);
        setError(false);
      }
    } catch (er) {
      setLoading(false);
      setError(true);
    }
  };
  function SortArray(x, y) {
    return x.name.localeCompare(y.name);
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
          .map((e) => ({ name: e[1], code: e[0] }))
          .sort(SortArray)
      );

      setTravelMemos(json.data);
      setLoading(false);
      setError(false);
    } catch (er) {
      setLoading(false);
      setError(true);
    }
  };

  const createTravelMemo = async (
    destinations,
    endDate,
    startDate,
    memo,
    tripName,
    memoId = null
  ) => {
    const data = {
      tokenPan: cardDetail.tokenPan,
      destinations,
      endDate,
      startDate,
      memo,
      tripName,
      realTimeExclusion: true,
      memoId,
    };
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:8000/banking/hcuShazam.prg?cu=CRUISECU&op=${
          memoId ? "changeTravelMemo" : "createTravelMemo"
        }`,
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
      if (json.message === "Success") {
        setChangeSaved(true);
      }
      setTimeout(() => {
        setChangeSaved(false);
      }, 3000);
      setTravelMemos(json.data);
      setLoading(false);
      setError(false);
    } catch (er) {
      setLoading(false);
      setError(true);
    }
  };

  const removeTravelMemoById = async (memoId) => {
    const data = {
      tokenPan: cardDetail.tokenPan,
      memoId,
    };
    try {
      setLoading(true);
      const res = await fetch(
        "http://localhost:8000/banking/hcuShazam.prg?cu=CRUISECU&op=cancelTravelMemo",
        {
          method: "POST",
          mode: "cors",
          credentials: "include",
          redirect: "follow",
          referrerPolicy: "strict-origin",
          body: JSON.stringify(data),
        }
      );
      console.log(res);

      // const json = await res.json();

      setLoading(false);
      setError(false);
    } catch (er) {
      setLoading(false);
      setError(true);
    }
  };

  const searchCards = async (data) => {
    const dataInfo = {
      zipFirst5: data.zipCode,
      houseNumber: data.houseNumber,
      ssn: 222222222,
    };
    try {
      setError(false);
      setLoading(true);
      const res = await fetch(
        "http://localhost:8000/banking/hcuShazam.prg?cu=CRUISECU&op=searchCards",
        {
          method: "POST",
          mode: "cors",
          credentials: "include",
          redirect: "follow",
          referrerPolicy: "strict-origin",
          body: JSON.stringify(dataInfo),
        }
      );

      const json = await res.json();
      setCardsSearched(json.data.tokenPans);

      setError(false);
      setLoading(false);
    } catch (er) {
      setError(true);
      setLoading(false);
    }
  };

  const addUserCard = async (tokenPan) => {
    const data = {
      tokenPan,
    };
    try {
      setError(false);
      setLoading(true);
      const res = await fetch(
        "http://localhost:8000/banking/hcuShazam.prg?cu=CRUISECU&op=addUserCard",
        {
          method: "POST",
          mode: "cors",
          credentials: "include",
          redirect: "follow",
          referrerPolicy: "strict-origin",
          body: JSON.stringify(data),
        }
      );
      // if (res.status === 200) {
      //   setCardBlock(!cardStatus);
      //   }
      console.log(res);

      setError(false);
      setLoading(false);
    } catch (er) {
      setError(true);
      setLoading(false);
    }
  };

  const updateUserSettings = async (data) => {
    const dataInfo = {
      primaryEmailAddress: data.primaryEmailAddress,
      secondaryEmailAddress: data.secondaryEmailAddress,
      phoneNumber: data.phoneNumber,
      disableSystemAlerts: data.disableSystemAlerts,
    };
    try {
      setError(false);
      setLoading(true);
      const res = await fetch(
        "http://localhost:8000/banking/hcuShazam.prg?cu=CRUISECU&op=enrollEdit",
        {
          method: "POST",
          mode: "cors",
          credentials: "include",
          redirect: "follow",
          referrerPolicy: "strict-origin",
          body: JSON.stringify(dataInfo),
        }
      );
      const json = await res.json();
      if (json.message === "Patched") {
        setChangeSaved(true);
      }

      setTimeout(() => {
        setChangeSaved(false);
      }, 3000);

      setError(false);
      setLoading(false);
    } catch (er) {
      setError(true);
      setLoading(false);
    }
  };

  const enroll = async (data) => {
    const dataInfo = {
      primaryEmailAddress: data.primaryEmailAddress,
      secondaryEmailAddress: data.secondaryEmailAddress,
      phoneNumber: data.phoneNumber,
      disableSystemAlerts: data.disableSystemAlerts,
    };
    try {
      setError(false);
      setLoading(true);
      const res = await fetch("http://localhost:8000/banking/hcuShazam.prg?cu=CRUISECU&op=enroll", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        redirect: "follow",
        referrerPolicy: "strict-origin",
        body: JSON.stringify(dataInfo),
      });

      const json = await res.json();
      if (json.message === "Enrollment successful") {
        setChangeSaved(true);
      }

      setTimeout(() => {
        setChangeSaved(false);
      }, 3000);
      setError(false);
      setLoading(false);
    } catch (er) {
      setError(true);
      setLoading(false);
    }
  };

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
        cardsSearched,
        travelMemos,
        changeSaved,
        loadingToggle,
        travelMemoSelected,
        alertSettingsValues,
        enroll,
        loadCards,
        addUserCard,
        searchCards,
        setCardDetail,
        getDestinations,
        changeStatusCard,
        getAlertSettings,
        setAlertSettings,
        createTravelMemo,
        updateUserSettings,
        getCardTravelMemos,
        removeTravelMemoById,
        loadCardDetailStatus,
        setTravelMemoSelected,
      }}
    >
      {children}
    </CardsContext.Provider>
  );
};
