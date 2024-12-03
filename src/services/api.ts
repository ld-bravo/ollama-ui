// import axios, { AxiosResponse } from "axios";
import axios from "axios";
import { OllamaRequest } from "../interfaces/OllamaRequest";
import { OllamaResponse } from "../interfaces/OllamaResponse";

const api = axios.create({
  baseURL: "http://localhost:11434/api",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
});

export const getLocalModels = async (): Promise<any> => {
  try {
    const response = await api.get("/tags");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error message: ', error.message);
      throw new Error(error.message);
    } else {
      console.error('Unexpected error: ', error);
      throw new Error('An unexpected error occurred');
    }
  }
};

export const getRunningModels = async (): Promise<any> => {
  try {
    const response = await api.get("/ps");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error message: ', error.message);
      throw new Error(error.message);
    } else {
      console.error('Unexpected error: ', error);
      throw new Error('An unexpected error occurred');
    }
  }
};

export const generateCompletion = async (prompt: string, model: string): Promise<any> => {
  try {
    const response = await api.post("/generate", {
      model: model,
      prompt: prompt,
      stream: false,
      // options: {
      //   temperature: 0.7,
      //   top_p: 0.9,
      //   top_k: 40,
      //   num_predict: 128
      // }
    });
    return response.data.response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error message: ', error.message);
      throw new Error(error.message);
    } else {
      console.error('Unexpected error: ', error);
      throw new Error('An unexpected error occurred');
    }
  }
};

// export const generateChatCompletion = async (prompt: string, model: string): Promise<any> => {
//   try {
//     const response = await api.post("/generate", {
//       model: model,
//       prompt: prompt,
//       stream: false,
//       // options: {
//       //   temperature: 0.7,
//       //   top_p: 0.9,
//       //   top_k: 40,
//       //   num_predict: 128
//       // }
//     });
//     return response.data.response;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('Error message: ', error.message);
//       throw new Error(error.message);
//     } else {
//       console.error('Unexpected error: ', error);
//       throw new Error('An unexpected error occurred');
//     }
//   }
// };

export const generateChatCompletion = async (message: string, model: string): Promise<OllamaResponse> => {
  const requestData: OllamaRequest = {
    model,
    messages: [{ role: 'user', content: message }],
    stream: false
  };

  try {
    const response = await api.post<OllamaResponse>("/chat", requestData,
      // {
      // headers: {
      //   'Content-Type': 'application/json',
      //   Authorization: `Bearer ${ollamaApiKey}`,
      // },
      // }
    );

    // Retornamos la respuesta del modelo
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error en la llamada a Ollama:', error.response?.data || error.message);
    } else {
      console.error('Error desconocido:', error);
    }
    throw new Error('La llamada a Ollama falló');
  }
};
