import httpInstance from '@/src/api/http';

interface ExampleRequestDTO {
  username: string;
  password: string;
  age: number;
}

interface ExampleResponseDTO {
  username: string;
  userId: number;
}

async function signUpExampleUser() {
  const response = await httpInstance.post<ExampleRequestDTO, ExampleResponseDTO>('/sign-up', {
    username: 'test user',
    password: '#qwer1234',
    age: 20,
  });

  return response.data;
}
