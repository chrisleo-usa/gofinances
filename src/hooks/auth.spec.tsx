import fetchMock from 'jest-fetch-mock';
import { mocked } from 'jest-mock';
import { renderHook, act } from '@testing-library/react-hooks'
import { AuthProvider, useAuth } from './auth'
import { startAsync } from 'expo-auth-session';

fetchMock.enableMocks();
jest.mock('expo-auth-session')
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn()
}))

describe('Auth Hook', () => {

  it('should be able to sign in with Google acount existing', async () => {
    const googleMocked = mocked(startAsync as any);

    // mock da função de startAsync, pois precisamos do token
    googleMocked.mockReturnValueOnce({
      type: 'success',
      params: {
        access_token: 'any_token',
      }
    });

    // Agora que temos um token, mockamos a requisição http dos dados do usuário
    fetchMock.mockResponseOnce(JSON.stringify({
      id: 'any_id',
      email: 'john.doe@email.com',
      name: 'John Doe',
      photo: 'any_photo.png'
    }));
    
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    })

    act(async () => await result.current.signInWithGoogle())

    await waitForNextUpdate();

    expect(result.current.user.email).toBe('john.doe@email.com');
  })

  it('user should not connect if cancel authentication with Google', async () => {
    const googleMocked = mocked(startAsync as any);

    googleMocked.mockReturnValueOnce({
      type: 'cancel',
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    })

    act(async () => await result.current.signInWithGoogle())

    expect(result.current.user).not.toHaveProperty('id');
  })

})
