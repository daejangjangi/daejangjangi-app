import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {MemberApi} from '@/src/api/member';
import type {AuthCredentials, JoinForm, UpdateForm} from '@/src/api/types/member.types';

export const memberKeys = {
  all: ['member'] as const,
  info: () => [...memberKeys.all, 'info'] as const,
  email: (email: string) => [...memberKeys.all, 'email', email] as const,
  nickname: (nickname: string) => [...memberKeys.all, 'nickname', nickname] as const,
};

export function useCheckNickname(nickname: string) {
  return useQuery({
    queryKey: memberKeys.nickname(nickname),
    queryFn: () => MemberApi.checkNicknameDuplicated(nickname),
    enabled: nickname.length > 0,
  });
}

export function useCheckEmail(email: string) {
  return useQuery({
    queryKey: memberKeys.email(email),
    queryFn: () => MemberApi.checkEmailDuplicated(email),
    enabled: email.length > 0,
  });
}

export function useMemberInfo() {
  return useQuery({
    queryKey: memberKeys.info(),
    queryFn: () => MemberApi.getMemberInfo(),
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: (credentials: AuthCredentials) => MemberApi.login(credentials),
  });
}

export function useJoin() {
  return useMutation({
    mutationFn: (joinForm: JoinForm) => MemberApi.join(joinForm),
  });
}

export function useUpdateMemberInfo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updateForm: UpdateForm) => MemberApi.updateMemberInfo(updateForm),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: memberKeys.info()});
    },
  });
}
