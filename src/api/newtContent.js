import newtApi from "./newtApi";
import { useQuery } from "react-query";

// API calls
const fetchNewtContent = async () => {
  const { data } = await newtApi.get("/newt-content");
  return data;
};

// React-query bindings
export function useFetchNewtContent() {
  return useQuery("newt-content", fetchNewtContent);
}
