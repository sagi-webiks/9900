import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { featureToJson, jsonToFeature } from "@/utills";
import type { Feature } from "ol";
import type { Geometry } from "ol/geom";
import type { ITodo } from "@/types";

const API_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export const useGetTodos = () =>
  useQuery<Feature<Geometry>[]>({
    queryKey: ["todos"],
    queryFn: async () => {
      const { data } = await apiClient.get("/");

      const features = data
        .map((todo: ITodo) => jsonToFeature(todo))
        .filter((feature): feature is Feature<Geometry> => feature !== null && feature !== undefined);

      return features;
    },
  });

export const useGetTodoById = (id?: string) =>
  useQuery<Feature<Geometry> | null>({
    queryKey: ["todo", id],
    queryFn: async () => {
      const { data } = await apiClient.get(`/${id}`);
      return jsonToFeature(data);
    },
    enabled: id != null,
  });

export const useCreateTodo = (onSuccess: () => void, onError?: (error: unknown) => void) => {
  const queryClient = useQueryClient();

  return useMutation<Feature<Geometry>, unknown, Feature<Geometry>>({
    mutationFn: async (newTodo) => {
      const backendTodo = featureToJson(newTodo);
      const { data } = await apiClient.post("/", backendTodo);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      onSuccess();
    },
    onError,
  });
};

export const useUpdateTodo = (onSuccess: () => void, onError?: (error: unknown) => void) => {
  const queryClient = useQueryClient();

  return useMutation<Feature<Geometry>, unknown, { id: string; updatedTodo: Feature<Geometry> }>({
    mutationFn: async ({ id, updatedTodo }) => {
      const backendUpdatedTodo = featureToJson(updatedTodo);
      console.log(backendUpdatedTodo);
      const { data } = await apiClient.put(`/${id}`, backendUpdatedTodo);
      return data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      queryClient.invalidateQueries({ queryKey: ["todo", id] });
      onSuccess();
    },
    onError,
  });
};

export const useDeleteTodo = (onSuccess: () => void, onError?: (error: unknown) => void) => {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, string>({
    mutationFn: async (id) => {
      await apiClient.delete(`/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      onSuccess();
    },
    onError,
  });
};
