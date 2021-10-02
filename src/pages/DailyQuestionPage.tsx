import React, { FC, useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useHistory } from 'react-router';
import Layout from '../components/Layout';
import { dailyQuestions } from '../utils/dailyQuestionsMock';
import { Box, Button, Stack, Heading, Text, Container, VStack, Checkbox } from '@chakra-ui/react';

interface DailyQuestionPageProps {}

const DailyQuestionPage: FC<DailyQuestionPageProps> = () => {
  const [responses, setResponses] = useState<AnswerDailyQuestion[]>([]);
  const { push } = useHistory();

  const handleCheck = (answer: AnswerDailyQuestion) => {
    if (responses?.filter((r) => r.id === answer.id).length) {
      setResponses(responses.filter((r) => r.id !== answer.id));
    } else {
      setResponses([...responses, answer]);
    }
  };

  useEffect(() => {
    console.log('responses', responses);
  }, [responses]);

  const handleSendResponse = () => {
    const incorrectResponses = responses.filter((r) => !r.isCorrect);
    if (incorrectResponses.length) {
      toast('Respuesta incorrecta, volver a intentarlo mañana', {
        icon: '😔',
        style: {
          borderRadius: '10px',
          background: '#f2657a',
          color: '#fff',
        },
      });
      localStorage.setItem('DAILY_QUESTION_ANSWERED', 'incorrect');
    } else {
      toast('Respuesta Correcta, felicitaciones, sumaste 5.000 puntos', {
        icon: '😃',
        style: {
          borderRadius: '10px',
          background: '#4bb543',
          color: '#fff',
        },
      });
      localStorage.setItem('DAILY_QUESTION_ANSWERED', 'correct');
    }
    // setTimeout(() => {
    push('/');
    // }, 1000);
  };
  return (
    <Layout>
      <Container maxW="7xl">
        <VStack flexDirection="column" alignItems="center" justifyContent="center" spacing={10} position="relative">
          <Heading>Pregunta Diaria</Heading>
          {dailyQuestions.map((dailyQuestion) => (
            <Box key={dailyQuestion.question} border="2px solid transparent" borderColor="blue.one" borderRadius={10}>
              <Stack border="2px solid transparent" borderBottomColor="blue.one" padding={6}>
                <Text fontSize="25px" fontWeight="700">
                  {dailyQuestion.question}
                </Text>
              </Stack>
              <VStack padding={6} justifyContent="flex-start" alignItems="flex-start">
                {dailyQuestion.answers.map((answer) => (
                  <VStack key={answer.id} my="1rem!important">
                    <Checkbox colorScheme="blue" size="md" onChange={() => handleCheck(answer)}>
                      {answer.answer}
                    </Checkbox>
                  </VStack>
                ))}
              </VStack>
            </Box>
          ))}
          <Button
            mt={6}
            w={'8rem'}
            bg="brand.100"
            color={'white'}
            _hover={{
              boxShadow: 'xl',
              border: '1px solid white',
              bg: 'brand.900',
            }}
            position="absolute"
            right="0"
            bottom="-50px"
            disabled={!responses.length}
            onClick={() => handleSendResponse()}
          >
            Enviar
          </Button>
        </VStack>
      </Container>
      <Toaster />
    </Layout>
  );
};

export default DailyQuestionPage;
