import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../lib/base";

export interface ResumeFields {
  name: string | null;
  email: string | null;
  phone: string | null;
}

interface ResumeState {
  resumeData: ResumeFields | null;
  file: File | null;
  
  // UI states
  isLoading: boolean;
  error: string | null;
  isEditing: boolean;
  
  // Actions
  setFile: (file: File | null) => void;
  parseResume: () => Promise<void>;
  updateResumeField: (field: keyof ResumeFields, value: string) => void;
  reset: () => void;
  setEditing: (editing: boolean) => void;
}

export const useResumeStore = create(
  persist<ResumeState>(
    (set, get) => ({
      resumeData: null,
      file: null,
      isLoading: false,
      error: null,
      isEditing: false,

      setFile: (file) => {
        set({ file, error: null });
      },

      updateResumeField: (field, value) => {
        const currentData = get().resumeData;
        if (currentData) {
          if (field === 'phone') {
            const digitsOnly = value.replace(/\D/g, '');
            const truncated = digitsOnly.slice(0, 10);
            set({
              resumeData: {
                ...currentData,
                [field]: truncated || null
              }
            });
            return;
          }
          
          set({
            resumeData: {
              ...currentData,
              [field]: value || null
            }
          });
        }
      },

      setEditing: (editing) => {
        set({ isEditing: editing });
      },

      parseResume: async () => {
        const file = get().file;
        
        if (!file) {
          set({ error: "Please select a file first" });
          return;
        }

        const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!validTypes.includes(file.type)) {
          set({ error: "Please upload a PDF or DOCX file" });
          return;
        }

        try {
          set({ isLoading: true, error: null });
          
          const formData = new FormData();
          formData.append("file", file);

          const { data } = await api.post<ResumeFields>("/resume/parse", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          set({ 
            resumeData: data,
            isLoading: false,
            error: null 
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : "Failed to parse resume",
            isLoading: false,
            resumeData: null
          });
        }
      },

      reset: () => {
        set({
          resumeData: null,
          file: null,
          isLoading: false,
          error: null,
          isEditing: false,
        });
      },
    }),
    {
      name: 'resume-storage', 
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          return str ? JSON.parse(str) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
      partialize: (state) => {
        const { resumeData } = state;
        return {
          resumeData,
          file: null,
          isLoading: false,
          error: null,
          isEditing: false,
          setFile: state.setFile,
          parseResume: state.parseResume,
          updateResumeField: state.updateResumeField,
          reset: state.reset,
          setEditing: state.setEditing,
        };
      },
    }
  )
);
