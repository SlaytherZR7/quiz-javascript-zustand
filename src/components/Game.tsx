import { IconButton, Stack } from '@mui/material';
import { useQuestionsStore } from '../store/questions';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { Question } from './Question';
import { Footer } from './Footer';

export const Game = () => {
  const questions = useQuestionsStore((state) => state.questions);
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion);
  const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion);
  const goPrevQuestion = useQuestionsStore((state) => state.goPrevQuestion);

  const questionInfo = questions[currentQuestion];

  return (
    <>
      <Stack
        direction="column"
        gap={2}
        alignItems="center"
        justifyContent="center"
      >
        <div
          style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}
        >
          <IconButton onClick={goPrevQuestion} disabled={currentQuestion === 0}>
            <ArrowBackIosNew />
          </IconButton>
          {currentQuestion + 1} / {questions.length}
          <IconButton
            onClick={goNextQuestion}
            disabled={currentQuestion >= questions.length - 1}
          >
            <ArrowForwardIos />
          </IconButton>
        </div>
        <Question info={questionInfo} />
        <Footer />
      </Stack>
    </>
  );
};
