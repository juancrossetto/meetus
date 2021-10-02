export const dailyQuestions: DailyQuestion[] = [
  {
    question: '¿Que debo hacer si un compañero de trabajo me pide que ingrese una factura de hoy, pero con fecha de la semana pasada?',
    answers: [
      {
        id: 1,
        answer: 'Ingreso la factura, porque si lo pidió, debe tener sus motivos.',
        isCorrect: false,
      },
      {
        id: 2,
        answer: 'Aviso de forma inmediata a mi supervisor directo.',
        isCorrect: false,
      },
      {
        id: 3,
        answer: 'Ingreso la factura, pero advirtiendole que es un incumplimiento de las políticas de la empresa.',
        isCorrect: true,
      },
      {
        id: 4,
        answer: 'Me niego a ingresar la factura, y olvido que alguna vez mi compañero me pidió eso.',
        isCorrect: false,
      },
    ],
  },
];
