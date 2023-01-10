import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";

function RoutineList() {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    fetch("/routines")
      .then((r) => r.json())
      .then(setRoutines);
  }, []);

  return (
    <Wrapper>
      {routines.length > 0 ? (
        routines.map((routine) => (
          <Routines key={routine.id}>
            <Box>
              <h2>{routine.title}</h2>
              <p>
                <em>Time to Complete: {routine.minutes_to_complete} minutes</em>
                &nbsp;·&nbsp;
                <cite>By {routine.user.username}</cite>
              </p>
              <ReactMarkdown>{routine.instructions}</ReactMarkdown>
            </Box>
          </Routines>
        ))
      ) : (
        <>
          <h2>No Routines Found</h2>
          <Button as={Link} to="/new">
            Make a New Routine
          </Button>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const Recipe = styled.article`
  margin-bottom: 24px;
`;

export default RoutineList;
