import "./Main.css";
import JournalAlbum from "../../Components/JournalAlbum";
import JournalAlbumIntro from "../../Components/JournalAlbumIntro/JournalAlbumIntro";
import JournalCreate from "../../Components//JournalCreate/JournalCreate";

import { Container } from "@mui/material";
import { useState, useEffect } from "react";

const Main = () => {
  const [showJournalCreate, setShowJournalCreate] = useState(false);
  const [journalList, setJournalList] = useState([]);
  const [contributedJounals, setContributedJounals] = useState([]);

  useEffect(() => {
    fetchJournals(localStorage.getItem("id"));
    fetchContributedJournals(localStorage.getItem("id"));
  }, []);

  const fetchJournals = (userId) => {
    fetch(`/api/v1/users/${userId}/journals`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setJournalList(result);
        //  setLoading(false);
      })
      .catch((error) =>
        console.log(`An error occurred at fetching from /api/v1/users/${userId}/journals:${error}`)
      );
  };

  const fetchContributedJournals = (userId) => {
    fetch(`/api/v1/journals/contributors/${userId}`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setContributedJounals(result);
        //  setLoading(false);
      })
      .catch((error) =>
        console.log(`An error occurred at fetching from /api/v1/journals/contributors/${userId}:${error}`)
      );
  };


  const handleShowJournalCreate = () => {
    setShowJournalCreate(true);
  };

  const handleCloseJournalCreate = () => {
    setShowJournalCreate(false);
  };

  const handleSubmit = (newJournal, userId) => {
    fetch(`/api/v1/users/${userId}/journals/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify(newJournal),
    })
      .then((response) => response.json())
      .then((journal) => {
        console.log(journal);
         setJournalList([...journalList, journal]);
      })
      .catch((error) => {
        console.log(error);
      });
    setShowJournalCreate(false);
  };

  const refreshJournalListAfterDelete = (journalId) => {
    setJournalList((journalList) => {
      return journalList.filter((journal) => journal.id !== journalId);
    });
  };

  return (
    <>
      <JournalAlbumIntro onShowCreate={handleShowJournalCreate} />
      <Container maxWidth="md">
        {showJournalCreate && (
          <JournalCreate
            onCancel={handleCloseJournalCreate}
            onSubmit={handleSubmit}
            userId={parseInt(localStorage.getItem("id"))}
          />
        )}
      </Container>
      <JournalAlbum
        journalList={journalList}
        contributedJournals={contributedJounals}
        refreshJournalList={refreshJournalListAfterDelete}
      />
    </>
  );
};

export default Main;
