import React, { FC, useState, useEffect, useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
// import { useHistory } from 'react-router';
import { useForm, useFieldArray } from 'react-hook-form';
import { AiOutlineClose } from 'react-icons/ai';
// import TimePicker from '@mui/lab/TimePicker';
// import TextField from '@mui/material/TextField';
import Layout from '../components/Layout';
// import { dailyQuestions } from '../utils/dailyQuestionsMock';
import { AuthContext } from '../context/Auth';
import {
  Box,
  Button,
  Stack,
  Text,
  Container,
  VStack,
  Input,
  useColorModeValue,
  IconButton,
  RadioGroup,
  FormControl,
  FormLabel,
  HStack,
  Select,
} from '@chakra-ui/react';
import Spinner from '../components/Spinner';
import './AdministrationPage.css';

interface AdministrationPageProps {}
const AdministrationPage: FC<AdministrationPageProps> = () => {
  const [questionText, setQuestionText] = useState<string>();
  const [points, setPoints] = useState<number>(0);
  const [schedule, setSchedule] = useState<Schedule>({ hourFrom: '', hourTo: '', minuteFrom: '', minuteTo: '' });
  const { loading, createDailyQuestion, getSchedule, updateSchedule } = useContext(AuthContext);
  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      newAnswer: [{ answer: '', isCorrect: false }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'newAnswer',
  });

  const onSubmit = async (data: any) => {
    if (points <= 0) {
      toast.error('Por favor indique una cantidad de puntos mayor a 0');
      return;
    } else if (questionText === '') {
      toast.error('Por favor indique una pregunta');
      return;
    } else if (!data || !data.newAnswer || data.newAnswer.length <= 0) {
      toast.error('Por favor indique al menos 1 respuesta');
      return;
    } else if (data.newAnswer.find((answer: AnswerDailyQuestion) => !answer.isCorrect)) {
      toast.error('Por favor seleccione por lo menos, una respuesta correcta');
      return;
    }
    const req: DailyQuestion = {
      question: questionText || '',
      points: points || 0,
      answers: data.newAnswer,
    };
    await createDailyQuestion(req);
    reset();
    setQuestionText('');
    setPoints(0);
    toast('Pregunta diaria creada correctamente', {
      icon: '😃',
      style: {
        borderRadius: '10px',
        background: '#4bb543',
        color: '#fff',
      },
    });
  };

  useEffect(() => {
    const getScheduleAsync = async () => {
      const response = await getSchedule();
      if (response && response.schedule) {
        setSchedule(response.schedule);
      }
    };

    getScheduleAsync();
    toast.dismiss();
    // eslint-disable-next-line
  }, []);

  const handleSchedule = async () => {
    const { hourFrom, hourTo, minuteFrom, minuteTo } = schedule;
    if (hourFrom === '' || hourTo === '' || minuteFrom === '' || minuteTo === '') {
      toast.error('Por favor indique la hora desde y hasta');
      return;
    }
    if (
      Number(hourFrom) > Number(hourTo) ||
      (Number(hourFrom) === Number(hourTo) && Number(minuteFrom) > Number(minuteTo)) ||
      (Number(hourFrom) === Number(hourTo) && Number(minuteFrom) === Number(minuteTo))
    ) {
      toast.error('Las horas indicadas no son váidas');
      return;
    }
    const req: Schedule = {
      hourFrom: hourFrom || '',
      hourTo: hourTo || '',
      minuteFrom: minuteFrom || '',
      minuteTo: minuteTo || '',
    };

    await updateSchedule(req);
    toast('Horario de uso de la Web cambiado con éxito!', {
      icon: '🕒',
      style: {
        borderRadius: '10px',
        background: '#4bb543',
        color: '#fff',
      },
    });
  };

  return (
    <Layout>
      <Container maxW="7xl">
        <VStack flexDirection="column" alignItems="center" justifyContent="center" spacing={10} position="relative">
          <Box id="first-section" w={'100%'} border="2px solid" borderColor="brand.100" p={4} rounded={'lg'} position={'relative'}>
            <Text fontWeight={'bold'}>Horario de uso</Text>
            <HStack id="time-container" justifyContent="space-around" mb={'4.5rem'}>
              <HStack>
                <Text mr={4}>Desde:</Text>
                <Select
                  id="hour-from"
                  placeholder={'Hora'}
                  value={schedule?.hourFrom ?? ''}
                  onChange={(e: any) =>
                    setSchedule({
                      ...schedule,
                      hourFrom: e.target.value,
                    })
                  }
                >
                  <option value="00">00</option>
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                  <option value="06">06</option>
                  <option value="07">07</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13 </option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                </Select>
                <Text>:</Text>
                <Select
                  id="minute-from"
                  placeholder={'Minuto'}
                  value={schedule?.minuteFrom ?? ''}
                  onChange={(e: any) =>
                    setSchedule({
                      ...schedule,
                      minuteFrom: e.target.value,
                    })
                  }
                >
                  <option value="00">00</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                  <option value="45">45</option>
                </Select>
              </HStack>
              <HStack>
                <Text mr={4}>Hasta:</Text>
                <Select
                  id="hour-to"
                  placeholder={'Hora'}
                  value={schedule?.hourTo ?? ''}
                  onChange={(e: any) =>
                    setSchedule({
                      ...schedule,
                      hourTo: e.target.value,
                    })
                  }
                >
                  <option value="00">00</option>
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                  <option value="06">06</option>
                  <option value="07">07</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13 </option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                </Select>
                <Text>:</Text>
                <Select
                  id="minute-to"
                  placeholder={'Minuto'}
                  value={schedule?.minuteTo ?? ''}
                  onChange={(e: any) =>
                    setSchedule({
                      ...schedule,
                      minuteTo: e.target.value,
                    })
                  }
                >
                  <option value="00">00</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                  <option value="45">45</option>
                </Select>
              </HStack>
              {/* <Input name="email" value={email} onChange={(e) => setEmail(e.target.value)} /> */}
              {/* <TimePicker label="Time" value={value} onChange={handleChange} renderInput={(params: any) => <TextField {...params} />} /> */}
            </HStack>
            <Button
              w={'10rem'}
              bg="brand.100"
              color={'white'}
              _hover={{
                boxShadow: 'xl',
                border: '1px solid white',
                bg: 'brand.900',
              }}
              position="absolute"
              right={'5px'}
              bottom={'5px'}
              onClick={handleSchedule}
            >
              Guardar
            </Button>
          </Box>
          <Box
            id="admin-form-container"
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={4}
            border="2px solid"
            borderColor="brand.100"
            width={'100%'}
            maxW={'1000px'}
            position="relative"
          >
            <Stack spacing={4}>
              <form
                id="administration-form"
                onSubmit={handleSubmit(onSubmit)}
                style={{ maxWidth: '700px', margin: '0 auto', minWidth: '450px', width: '100%' }}
              >
                <Text
                  fontSize={'18px'}
                  fontWeight={'500'}
                  color={'white'}
                  textAlign={'center'}
                  pb={'10px'}
                  mb={'30px'}
                  borderBottom={'1px solid #5985eb'}
                >
                  Crear pregunta diaria
                </Text>
                {/* <p>The following demo allow you to delete, append, prepend items</p>
                <p>{JSON.stringify(getValues())}</p> */}
                <ul>
                  <FormControl id="name" display="flex" alignItems="center" mb={5}>
                    <FormLabel mr={'27px'}>Pregunta:</FormLabel>
                    <Input
                      name="question"
                      value={questionText}
                      onChange={(e) => setQuestionText(e.target.value)}
                      bg={'white'}
                      color="black"
                      w={'full'}
                    />
                  </FormControl>
                  <RadioGroup defaultValue="2">
                    {fields.map((item, index) => {
                      return (
                        <li key={item.id}>
                          <FormControl id={`name-${item.id}`} display="flex" alignItems="center">
                            <FormLabel mb={0} display={'flex'}>
                              <Text> Respuesta</Text>
                              <Text ml={'3px'}> {index + 1}:</Text>
                            </FormLabel>
                            <Input
                              {...register(`newAnswer.${index}.answer` as const)}
                              defaultValue={`${item.answer}`}
                              bg={'white'}
                              color={'black'}
                              w={'full'}
                              minW={'20rem'}
                            />
                            {/* <Radio colorScheme="red" value={index + 1}>
                            Radio
                          </Radio> */}
                            <input
                              className="option__type"
                              type="radio"
                              {...register(`newAnswer.${index}.isCorrect`)}
                              name={`newAnswer.${index}.isCorrect`}
                              // onChange={() => handleIsCorrectChange(questionIndex, k)}
                              checked={item.isCorrect}
                              // value={item.isCorrect}
                              // disabled={isReadOnly}
                            />
                            <IconButton
                              w={'2rem'}
                              bg={'brand.100'}
                              _hover={{ bg: 'blue.500' }}
                              onClick={() => remove(index)}
                              variant="outline"
                              aria-label="open menu"
                              icon={<AiOutlineClose />}
                            />
                          </FormControl>
                        </li>
                      );
                    })}
                  </RadioGroup>
                  <FormControl id="name" display="flex" alignItems="center" justifyContent={'flex-start'} mb={5}>
                    <FormLabel mr={'45px'}>Puntos:</FormLabel>
                    <Input
                      name="points"
                      type="number"
                      value={points}
                      onChange={(e) => setPoints(Number(e.target.value))}
                      bg={'white'}
                      color="black"
                      w={'full'}
                      maxW={'10rem'}
                    />
                  </FormControl>
                </ul>
                <Button
                  mt={6}
                  w={'10rem'}
                  bg="brand.100"
                  color={'white'}
                  _hover={{
                    boxShadow: 'xl',
                    border: '1px solid white',
                    bg: 'brand.900',
                  }}
                  onClick={() => append({ answer: '', isCorrect: false })}
                >
                  Agregar respuesta
                </Button>

                <input type="submit" value={'Crear pregunta diaria'} className="create-daily-question-btn" />
              </form>
            </Stack>
          </Box>
        </VStack>
      </Container>
      <Toaster />
      {loading && <Spinner />}
    </Layout>
  );
};

export default AdministrationPage;
