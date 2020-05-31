import newtApi from "./newtApi";
import { useQuery, useMutation, queryCache } from "react-query";
import displayErrorAlert from "../components/shared/displayErrorAlert";

// API calls
const fetchChallenges = async () => {
  const { data } = await newtApi.get("/challenges");
  return data;
};
const fetchIndividualChallenge = async (queryKey, challengeId) => {
  const { data } = await newtApi.get(`/challenges/${challengeId}`);
  return data;
};
const createChallenge = async (data) => {
  try {
    await newtApi.post("/challenges/create", data);
  } catch (error) {
    displayErrorAlert(
      "There was an error while creating your Reading Challenge"
    );
  }
};
const updateChallenge = async ({ challengeId, data }) => {
  return await newtApi.put(`/challenges/${challengeId}/update`, data);
};
const addContentToChallenge = async (contentId) => {
  return await newtApi.put("/challenges/add-content", { contentId });
};
const deleteChallenge = async (challengeId) => {
  return await newtApi.delete(`/challenges/${challengeId}`);
};

// React-query bindings
function useFetchChallenges() {
  return useQuery("challenges", fetchChallenges);
}
function useFetchIndividualChallenge(challengeId) {
  return useQuery(["challenge", challengeId], fetchIndividualChallenge);
}
function useCreateChallenge() {
  return useMutation(createChallenge, {
    onSettled: () => queryCache.refetchQueries("challenges"),
  });
}
function useUpdateChallenge() {
  return useMutation(updateChallenge, {
    onError: (error) => console.log(error),
    onSettled: () => queryCache.refetchQueries("challenge"),
  });
}
function useAddContentToChallenge() {
  return useMutation(addContentToChallenge, {
    onError: () => console.log(error),
  });
}
function useDeleteChallenge() {
  return useMutation(deleteChallenge, {
    onError: (error) => console.log(error),
    onSettled: () => queryCache.refetchQueries("challenges"),
  });
}

export {
  useFetchChallenges,
  useFetchIndividualChallenge,
  useCreateChallenge,
  useUpdateChallenge,
  useAddContentToChallenge,
  useDeleteChallenge,
};
