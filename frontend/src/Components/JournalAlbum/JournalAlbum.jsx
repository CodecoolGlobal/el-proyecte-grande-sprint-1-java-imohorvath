import "./JournalAlbum.css";
import { useEffect, useState } from "react";
import JournalAlbumItem from "../JournalAlbumItem";
import { Container, Grid, Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../ConfirmationDialog";
import { createClient } from "pexels";

const JournalAlbum = ({
  journalList,
  contributedJournals,
  refreshJournalList,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentJournal, setCurrentJournal] = useState("");
  const [imageURLs, setImageURLs] = useState([]);
  const [loading, setLoading] = useState(true);

  //TODO default cover image without re-rendering
  // const defaultCoverImage = 'https://images.pexels.com/photos/669986/pexels-photo-669986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  const navigate = useNavigate();

  const handleRedirection = (id) => {
    navigate(`/${id}`);
  };

  const handleDeleteClicked = (journal) => {
    console.log("handleDeleteClicked activated");
    setCurrentJournal(journal);
    console.log(journal);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    console.log("handleDialogClose activated");
    setCurrentJournal("");
    console.log(currentJournal);
    setDialogOpen(false);
  };

  const handleDeleteConfirmed = () => {
    console.log("handleDeleteConfirmed activated");
    console.log(currentJournal);
    deleteJournal(currentJournal.id);
    setCurrentJournal("");
    setDialogOpen(false);
    console.log(currentJournal);
  };

  const deleteJournal = (journalId) => {
    console.log(journalId);
    fetch(`/api/v1/journals/${journalId}`, {
      method: "DELETE",
    })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          throw new Error("Network response was not ok.");
        }
        refreshJournalList(journalId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getPexelImage = (query, id) => {
    const client = createClient(
      "ObPMaZKwS1wvcaQJAHUkbW9dryeMn2WgxOyIJCGH7NwMo0tRFpgcZgvx"
    );

    return client.photos
      .search({ query, per_page: 1 })
      .then((photo) => {
        setImageURLs((prevImageURLs) => [
          ...prevImageURLs,
          { journalId: id, url: photo.photos[0].src.landscape },
        ]);
      })
      .catch((error) =>
        console.log(`An error occurred at fetching from Pexel`)
      );
  };

  useEffect(() => {
    async function getImages() {
      const journalImagePromises = journalList.map((journal) => {
        return getPexelImage(journal.title, journal.id);
      });
      const contributedImagePromises = contributedJournals.map((journal) => {
        return getPexelImage(journal.title, journal.id);
      });

      await Promise.all(journalImagePromises);
      await Promise.all(contributedImagePromises);
      setLoading(false);
    }

    setLoading(true);
    getImages();
  }, [journalList, contributedJournals]);

  if (loading) {
    return (
      <>
        <p>Hello Loading</p>
      </>
    );
  }

  return (
    <>
      <Container sx={{ py: 3 }} maxWidth="md">
        <Typography
          component="h4"
          variant="h4"
          align="left"
          color="text.primary"
          gutterBottom
        >
          Your Journals
        </Typography>
        <Grid container spacing={4}>
          {journalList.map((journal) => (
            <JournalAlbumItem
              key={journal.id}
              journal={journal}
              imageURLs={imageURLs}
              onOpen={handleRedirection}
              onDelete={handleDeleteClicked}
              isOwnJournal={true}
            />
          ))}
        </Grid>
        {dialogOpen && (
          <ConfirmationDialog
            open={dialogOpen}
            onClose={handleDialogClose}
            itemTitle={currentJournal.title}
            onSubmit={handleDeleteConfirmed}
          />
        )}
      </Container>

      <Container sx={{ py: 8 }} maxWidth="md">
        <Typography
          component="h4"
          variant="h4"
          align="left"
          color="text.primary"
          gutterBottom
        >
          Contributed Journals
        </Typography>
        <Grid container spacing={4}>
          {contributedJournals.map((journal) => (
            <JournalAlbumItem
              key={journal.id}
              journal={journal}
              imageURLs={imageURLs}
              onOpen={handleRedirection}
              onDelete={handleDeleteClicked}
              isOwnJournal={false}
            />
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default JournalAlbum;
