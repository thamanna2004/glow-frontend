import { useMutation } from "@tanstack/react-query";
import { requestOtp, verifyOtp as verifyOtpApi, resetPassword, login } from "../api/authApi";

export const useRequestOtp = () =>
  useMutation((payload) => requestOtp(payload));

export const useVerifyOtp = () =>
  useMutation((payload) => verifyOtpApi(payload));

export const useResetPassword = () =>
  useMutation((payload) => resetPassword(payload));

export const useLogin = () => useMutation((payload) => login(payload));
