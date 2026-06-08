export const CATS = ['전체', '연인', '친구', '가족', '직장·학교', '기타']

export const DANGER = [
  { label: '안전', color: 'var(--status-positive)', icon: 'check', note: '긴장도 낮음. 평소 톤으로 가볍게 받아도 괜찮아요.' },
  { label: '주의', color: 'var(--status-cautionary)', icon: 'warn', note: '신호를 놓치면 서운함이 쌓일 수 있어요. 한 번 더 살펴보세요.' },
  { label: '위험', color: 'var(--status-negative)', icon: 'warn', note: '지금 대응이 중요해요. 그냥 넘어가면 갈등으로 번질 수 있어요.' },
]

export const SAMPLES = [
  {
    id: 's1', category: '연인', phrase: '괜찮아~',
    meaning: '전혀 안 괜찮음. 물어봐 주길 기다리는 중.',
    temp: 65, danger: 1,
    tips: ['한 번 더 "정말 괜찮아?" 하고 물어보세요.', '공감 먼저, 해결책은 나중에.'],
  },
  {
    id: 's2', category: '연인', phrase: '아니야 됐어',
    meaning: '됐다고 했지만 사실 많이 속상함. 먼저 다가와 주길 바람.',
    temp: 78, danger: 2,
    tips: ['바로 사과하고 어떤 점이 속상했는지 물어보세요.', '해명보다 공감이 먼저예요.'],
  },
  {
    id: 's3', category: '친구', phrase: '알아서 해',
    meaning: '사실 의견을 물어봐 주길 원함. 무관심하게 느껴질 수 있어요.',
    temp: 40, danger: 1,
    tips: ['"네 생각엔 어때?" 하고 의견을 끌어내 보세요.'],
  },
  {
    id: 's4', category: '연인', phrase: '뭐 먹고 싶어?',
    meaning: '딱히 메뉴 선택권을 주는 게 아니라, 이미 먹고 싶은 게 있을 수 있어요.',
    temp: 20, danger: 0,
    tips: ['후보 두 개를 먼저 제시해 보세요.', '"네가 먹고 싶은 거 먹자"도 좋은 답이에요.'],
  },
  {
    id: 's5', category: '직장·학교', phrase: '바쁘면 됐어',
    meaning: '상처받았고, 혼자 해결하겠다는 뜻. 먼저 연락해 주길 바라는 중.',
    temp: 72, danger: 2,
    tips: ['"일 마치고 바로 연락할게" 약속하고 꼭 지키세요.'],
  },
  {
    id: 's6', category: '친구', phrase: '그냥 해봤어',
    meaning: '사실 큰 의미가 담겨 있거나, 반응을 테스트하는 중일 수 있어요.',
    temp: 30, danger: 0,
    tips: ['왜 그 말을 했는지 가볍게 물어봐도 좋아요.'],
  },
  {
    id: 's7', category: '가족', phrase: '네가 알아서 해',
    meaning: '지쳐서 결정을 넘기는 것일 수 있어요. 배려가 필요한 시점.',
    temp: 50, danger: 1,
    tips: ['구체적인 두 가지 선택지를 제안해 드리세요.'],
  },
  {
    id: 's8', category: '연인', phrase: '화 안 났어',
    meaning: '화가 많이 났음. 기다리고 있으니 먼저 풀어주길 바람.',
    temp: 80, danger: 2,
    tips: ['"화났을 것 같은데, 내가 뭘 잘못했어?" 하고 솔직하게 물어보세요.'],
  },
  {
    id: 's9', category: '친구', phrase: '그날 시간 되면',
    meaning: '오고 싶은데 거절당할까봐 확실하게 말 못 하는 것. 초대해 주길 기다리는 중.',
    temp: 25, danger: 0,
    tips: ['"그날 같이 가자!" 하고 먼저 확실하게 불러주세요.'],
  },
]
